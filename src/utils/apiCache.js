/**
 * API Response Cache Utility
 * Caches API responses in memory with TTL (Time To Live)
 */

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

const cache = new Map();

/**
 * Get cached response if available and not expired
 * @param {string} url - The API URL
 * @returns {Object|null} - Cached data or null if not found/expired
 */
function getCached(url) {
  const cached = cache.get(url);
  if (!cached) {
    return null;
  }

  const now = Date.now();
  if (now - cached.timestamp > CACHE_TTL) {
    // Cache expired, remove it
    cache.delete(url);
    return null;
  }

  return cached.data;
}

/**
 * Store response in cache
 * @param {string} url - The API URL
 * @param {*} data - The response data to cache
 */
function setCached(url, data) {
  cache.set(url, {
    data,
    timestamp: Date.now(),
  });
}

/**
 * Clear all cached responses
 */
function clearCache() {
  cache.clear();
}

/**
 * Clear a specific cached URL
 * @param {string} url - The API URL to clear from cache
 */
function clearCachedUrl(url) {
  cache.delete(url);
}

/**
 * Cached fetch wrapper
 * Automatically caches GET requests and returns cached data if available
 * @param {string} url - The API URL
 * @param {Object} options - Fetch options (method, headers, etc.)
 * @returns {Promise<Response>} - Fetch response
 */
async function cachedFetch(url, options = {}) {
  // Only cache GET requests
  const isGetRequest = !options.method || options.method === "GET";

  if (isGetRequest) {
    const cached = getCached(url);
    if (cached !== null) {
      // Return cached data wrapped in a Response-like object
      return {
        ok: true,
        json: async () => cached,
        status: 200,
        statusText: "OK (cached)",
      };
    }
  }

  // Make the actual fetch request
  const response = await fetch(url, options);

  // Cache successful GET responses
  if (isGetRequest && response.ok) {
    try {
      const data = await response.clone().json(); // Clone to avoid consuming the response
      setCached(url, data);
    } catch (error) {
      // If response is not JSON, don't cache
      console.warn(`Failed to cache non-JSON response for ${url}:`, error);
    }
  }

  return response;
}

export { cachedFetch, clearCache, clearCachedUrl, getCached, setCached };

