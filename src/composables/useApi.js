/**
 * Composable for API interactions
 * Wraps the apiCache utility and provides a consistent interface for API calls
 */

import { ref } from "vue";
import { cachedFetch } from "../utils/apiCache";
import { apiUrl } from "../utils/url";

export function useApi() {
  const loading = ref(false);
  const error = ref(null);

  /**
   * Perform a GET request to the API
   * @param {string} endpoint - The API endpoint (relative to apiUrl)
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - The response data
   */
  const get = async (endpoint, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const url = endpoint.startsWith("http") ? endpoint : `${apiUrl}${endpoint}`;
      
      const response = await cachedFetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      error.value = err.message;
      console.error(`API Error (${endpoint}):`, err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Perform a POST request to the API
   * @param {string} endpoint - The API endpoint (relative to apiUrl)
   * @param {Object} body - The request body
   * @param {Object} options - Additional fetch options
   * @returns {Promise<any>} - The response data
   */
  const post = async (endpoint, body = {}, options = {}) => {
    loading.value = true;
    error.value = null;

    try {
      const url = endpoint.startsWith("http") ? endpoint : `${apiUrl}${endpoint}`;
      
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        body: JSON.stringify(body),
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      error.value = err.message;
      console.error(`API Error (${endpoint}):`, err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  /**
   * Clear the error state
   */
  const clearError = () => {
    error.value = null;
  };

  return {
    loading,
    error,
    get,
    post,
    clearError,
    apiUrl, // Export apiUrl for convenience
  };
}

