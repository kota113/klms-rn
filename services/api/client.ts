import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants for AsyncStorage keys
const STORAGE_KEYS = {
  ACCESS_TOKEN: 'klms_access_token',
};

/**
 * Base API client for interacting with the Canvas LMS API
 */
class ApiClient {
  private client: AxiosInstance;
  private baseURL: string = 'https://lms.keio.jp/api/v1';
  private isRefreshing: boolean = false;
  private failedQueue: any[] = [];

  // Event listeners for token changes
  private tokenChangeListeners: Array<(hasToken: boolean) => void> = [];

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Add request interceptor to add the token to each request
    this.client.interceptors.request.use(
      async (config) => {
        const token = await this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If we're already refreshing, add this request to the queue
            return new Promise((resolve, reject) => {
              AsyncStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
              this.notifyTokenChangeListeners(false);
              this.failedQueue.push({resolve, reject, originalRequest});
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            // Refresh the token
            const newToken = await this.refreshToken();

            // Process the queue with the new token
            this.processQueue(null, newToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return this.client(originalRequest);
          } catch (refreshError) {
            // If refresh fails, process the queue with the error
            this.processQueue(refreshError, null);
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
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
   * Store the access token in AsyncStorage
   * @param token - The token to store
   */
  public async setToken(token: string): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      this.notifyTokenChangeListeners(true);
    } catch (error) {
      console.error('Error setting token:', error);
    }
  }

  /**
   * Check if a token exists in storage
   * @returns Promise<boolean> - True if token exists, false otherwise
   */
  public async hasToken(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }

  /**
   * Register a listener for token changes
   * @param listener - Function to call when token status changes
   */
  public addTokenChangeListener(listener: (hasToken: boolean) => void): void {
    this.tokenChangeListeners.push(listener);
  }

  /**
   * Remove a token change listener
   * @param listener - The listener to remove
   */
  public removeTokenChangeListener(listener: (hasToken: boolean) => void): void {
    this.tokenChangeListeners = this.tokenChangeListeners.filter(l => l !== listener);
  }

  /**
   * Get the access token from AsyncStorage
   * @returns Promise with the token string or null if not found
   */
  private async getToken(): Promise<string | null> {
    try {
      // First try to get from AsyncStorage
      const token = await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);

      // If token exists in AsyncStorage, return it
      if (token) {
        return token;
      }
      return null;
    } catch (error) {
      console.error('Error getting token:', error);
      return null;
    }
  }

  /**
   * Notify all listeners of a token change
   * @param hasToken - Whether a token exists
   */
  private notifyTokenChangeListeners(hasToken: boolean): void {
    this.tokenChangeListeners.forEach(listener => listener(hasToken));
  }

  /**
   * Refresh the access token
   * @returns Promise with the new token
   */
  private async refreshToken(): Promise<string> {
    try {
      const currentToken = await this.getToken();

      if (!currentToken) {
        throw new Error('No token available to refresh');
      }

      // Call the refresh endpoint
      const response = await axios.post(
        `${this.baseURL}/jwts/refresh`,
        {jwt: currentToken},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const newToken = response.data.token;

      // Store the new token
      await this.setToken(newToken);

      return newToken;
    } catch (error) {
      console.error('Error refreshing token:', error);
      throw error;
    }
  }

  /**
   * Process the queue of failed requests
   * @param error - The error that occurred during token refresh
   * @param token - The new token
   */
  private processQueue(error: any, token: string | null): void {
    this.failedQueue.forEach(request => {
      if (error) {
        request.reject(error);
      } else if (token) {
        request.originalRequest.headers.Authorization = `Bearer ${token}`;
        request.resolve(this.client(request.originalRequest));
      }
    });

    // Clear the queue
    this.failedQueue = [];
  }
}

// Export a singleton instance of the API client
export const apiClient = new ApiClient();
