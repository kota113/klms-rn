import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import type CookieManagerModule from '@preeternal/react-native-cookie-manager';
import type {Cookie, Cookies} from '@preeternal/react-native-cookie-manager';
import type * as SecureStoreModule from 'expo-secure-store';

const STORAGE_KEYS = {
  SESSION_AUTHENTICATED: 'klms_session_authenticated',
  SESSION_COOKIES: 'klms_session_cookies',
  ACCESS_TOKEN: 'klms_access_token',
};

const CANVAS_BASE_URL = 'https://lms.keio.jp';
const CANVAS_SESSION_COOKIE_NAMES = ['_normandy_session', '_csrf_token', 'log_session_id'];

type StoredCanvasCookie = {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  expires?: string;
};

// Check if we're running in a Node.js environment
const isNodeEnvironment = typeof window === 'undefined';
const SecureStore: typeof SecureStoreModule | null = isNodeEnvironment
  ? null
  : require('expo-secure-store');
const CookieManager: typeof CookieManagerModule | null = isNodeEnvironment
  ? null
  : require('@preeternal/react-native-cookie-manager').default;

/**
 * Base API client for interacting with the Canvas LMS API
 */
class ApiClient {
  private client: AxiosInstance;
  private baseURL: string = `${CANVAS_BASE_URL}/api/v1`;

  // Event listeners for session changes
  private sessionChangeListeners: Array<(hasSession: boolean) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      withCredentials: true,
      headers: {
        Accept: 'application/json+canvas-string-ids, application/json',
        'Content-Type': 'application/json',
      }
    });

    // Canvas session auth is cookie-based. Login captures WebView cookies into SecureStore.
    this.client.interceptors.request.use(
      async (config) => {
        const cookieHeader = await this.getCookieHeader();
        if (cookieHeader) {
          config.headers.Cookie = cookieHeader;
        }

        const csrfToken = await this.getStoredCookieValue('_csrf_token');
        if (csrfToken && config.method && !['get', 'head', 'options'].includes(config.method.toLowerCase())) {
          config.headers['X-CSRF-Token'] = csrfToken;
          config.headers['X-Requested-With'] = 'XMLHttpRequest';
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      async (response) => {
        await this.captureSessionFromCookieJar(false);
        return response;
      },
      async (error) => {
        // If the error is 401, the Canvas session has expired — clear it and notify listeners
        if (error.response?.status === 401) {
          await this.clearSession();
          return Promise.reject(error);
        }

        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  /**
   * Make a GET request to the API
   * @param url - The endpoint URL
   * @param config - Optional axios request configuration
   * @returns Promise with the response data
   */
  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Make a POST request to the API
   * @param url - The endpoint URL
   * @param data - The data to send in the request body
   * @param config - Optional axios request configuration
   * @returns Promise with the response data
   */
  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Make a PUT request to the API
   * @param url - The endpoint URL
   * @param data - The data to send in the request body
   * @param config - Optional axios request configuration
   * @returns Promise with the response data
   */
  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Make a DELETE request to the API
   * @param url - The endpoint URL
   * @param config - Optional axios request configuration
   * @returns Promise with the response data
   */
  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Check that the shared Canvas cookie session can authenticate an API request.
   */
  public async verifySession(): Promise<boolean> {
    try {
      await this.get('/users/self/profile');
      return true;
    } catch (error) {
      console.error('Canvas session verification failed:', error);
      return false;
    }
  }

  /**
   * Copy Canvas cookies out of the native WebView cookie store into app-owned storage.
   */
  public async captureSessionFromCookieJar(notify = true): Promise<boolean> {
    if (!CookieManager || !SecureStore) {
      return false;
    }

    try {
      const cookies = await this.getCanvasCookiesFromNativeStore();
      const storedCookies = CANVAS_SESSION_COOKIE_NAMES
        .map((name) => cookies[name])
        .filter((cookie): cookie is NonNullable<typeof cookie> => Boolean(cookie?.value))
        .map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path,
          expires: cookie.expires,
        }));

      const hasCanvasSession = storedCookies.some((cookie) => cookie.name === '_normandy_session');
      if (!hasCanvasSession) {
        return false;
      }

      await SecureStore.setItemAsync(STORAGE_KEYS.SESSION_COOKIES, JSON.stringify(storedCookies));
      await SecureStore.setItemAsync(STORAGE_KEYS.SESSION_AUTHENTICATED, 'true');
      await SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      if (notify) {
        this.notifySessionChangeListeners(true);
      }
      return true;
    } catch (error) {
      console.error('Error capturing Canvas cookies:', error);
      return false;
    }
  }

  /**
   * Remove the stored session marker and notify listeners.
   */
  public async clearSession(): Promise<void> {
    try {
      await SecureStore?.deleteItemAsync(STORAGE_KEYS.SESSION_AUTHENTICATED);
      await SecureStore?.deleteItemAsync(STORAGE_KEYS.SESSION_COOKIES);
      await SecureStore?.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      this.notifySessionChangeListeners(false);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  }

  /**
   * Store a marker that the WebView established a Canvas cookie session.
   */
  public async setSessionAuthenticated(): Promise<void> {
    try {
      await SecureStore?.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
      const hasCookies = Boolean(await this.getCookieHeader());
      if (!hasCookies) {
        throw new Error('No Canvas session cookies are stored.');
      }
      await SecureStore?.setItemAsync(STORAGE_KEYS.SESSION_AUTHENTICATED, 'true');
      this.notifySessionChangeListeners(true);
    } catch (error) {
      console.error('Error setting session marker:', error);
      throw error;
    }
  }

  /**
   * Check if the app has a stored session marker.
   */
  public async hasSession(): Promise<boolean> {
    try {
      const sessionAuthenticated = await SecureStore?.getItemAsync(STORAGE_KEYS.SESSION_AUTHENTICATED);
      const hasCookies = Boolean(await this.getCookieHeader());
      return sessionAuthenticated === 'true' && hasCookies;
    } catch (error) {
      console.error('Error getting session marker:', error);
      return false;
    }
  }

  /**
   * Restore stored Canvas cookies to the native cookie jar before opening Canvas in a WebView.
   */
  public async prepareAuthenticatedWebView(url = CANVAS_BASE_URL): Promise<boolean> {
    if (!CookieManager) {
      return false;
    }

    const cookies = await this.getStoredCookies();
    if (!cookies.length) {
      return false;
    }

    try {
      for (const cookie of cookies) {
        const nativeCookie: Cookie = {
          name: cookie.name,
          value: cookie.value,
          domain: cookie.domain,
          path: cookie.path || '/',
          expires: cookie.expires,
        };

        await CookieManager.set(url, nativeCookie);
        await CookieManager.set(url, nativeCookie, true);
      }

      await CookieManager.flush().catch(() => undefined);
      return true;
    } catch (error) {
      console.error('Error preparing authenticated WebView:', error);
      return false;
    }
  }

  /**
   * Register a listener for session changes.
   * @param listener - Function to call when session status changes
   */
  public addSessionChangeListener(listener: (hasSession: boolean) => void): void {
    this.sessionChangeListeners.push(listener);
  }

  /**
   * Remove a session change listener.
   * @param listener - The listener to remove
   */
  public removeSessionChangeListener(listener: (hasSession: boolean) => void): void {
    this.sessionChangeListeners = this.sessionChangeListeners.filter(l => l !== listener);
  }

  public async clearToken(): Promise<void> {
    return this.clearSession();
  }

  public async setToken(_token: string): Promise<void> {
    return this.setSessionAuthenticated();
  }

  public async hasToken(): Promise<boolean> {
    return this.hasSession();
  }

  public addTokenChangeListener(listener: (hasToken: boolean) => void): void {
    this.addSessionChangeListener(listener);
  }

  public removeTokenChangeListener(listener: (hasToken: boolean) => void): void {
    this.removeSessionChangeListener(listener);
  }

  /**
   * Notify all listeners of a session change.
   * @param hasSession - Whether a session exists
   */
  private notifySessionChangeListeners(hasSession: boolean): void {
    this.sessionChangeListeners.forEach(listener => listener(hasSession));
  }

  private async getCanvasCookiesFromNativeStore(): Promise<Cookies> {
    if (!CookieManager) {
      return {};
    }

    const sharedCookies = await CookieManager.get(CANVAS_BASE_URL).catch(() => ({}));
    const webKitCookies = await CookieManager.get(CANVAS_BASE_URL, true).catch(() => ({}));
    return {...sharedCookies, ...webKitCookies};
  }

  private async getCookieHeader(): Promise<string | null> {
    const cookies = await this.getStoredCookies();
    if (!cookies.length) {
      return null;
    }

    return cookies
      .filter((cookie) => cookie.value)
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ');
  }

  private async getStoredCookieValue(name: string): Promise<string | null> {
    const cookies = await this.getStoredCookies();
    return cookies.find((cookie) => cookie.name === name)?.value || null;
  }

  private async getStoredCookies(): Promise<StoredCanvasCookie[]> {
    try {
      const serializedCookies = await SecureStore?.getItemAsync(STORAGE_KEYS.SESSION_COOKIES);
      if (!serializedCookies) {
        return [];
      }

      const parsed = JSON.parse(serializedCookies);
      if (!Array.isArray(parsed)) {
        return [];
      }

      return parsed.filter((cookie): cookie is StoredCanvasCookie => {
        return typeof cookie?.name === 'string' && typeof cookie?.value === 'string';
      });
    } catch (error) {
      console.error('Error getting stored Canvas cookies:', error);
      return [];
    }
  }

}

// Export a singleton instance of the API client
export const apiClient = new ApiClient();
