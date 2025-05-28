import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

/**
 * Base API client for interacting with the Canvas LMS API
 */
class ApiClient {
  private client: AxiosInstance;
  private baseURL: string = 'https://lms.keio.jp/api/v1';

  constructor() {
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_KLMS_ACCESS_TOKEN}`
      }
    });

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
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
}

// Export a singleton instance of the API client
export const apiClient = new ApiClient();
