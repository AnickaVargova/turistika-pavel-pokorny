/**
 * Composable for article/item fetching and filtering
 * Consolidates duplicate logic across OknoPomnicky, OknoClanky, Detail, etc.
 */

import { ref, computed } from "vue";
import { useApi } from "./useApi";
import { displayTestItems } from "../utils/displayTestItems";

export function useArticles() {
  const { get, loading, error } = useApi();
  const articles = ref([]);
  const article = ref(null);

  /**
   * Filter out test items based on environment
   * @param {Array} data - Array of articles to filter
   * @returns {Array} - Filtered articles
   */
  const filterTestItems = (data) => {
    const showTestItems = displayTestItems();
    return data.filter((item) => !item.temp && (showTestItems || !item.test));
  };

  /**
   * Filter a single item (for detail views)
   * @param {Object} data - Single article object
   * @returns {boolean} - Whether the item should be shown
   */
  const filterSingleItem = (data) => {
    const showTestItems = displayTestItems();
    return !data.temp && (showTestItems || !data.test);
  };

  /**
   * Fetch articles from an endpoint
   * @param {string} endpoint - The API endpoint
   * @param {Object} options - Additional options
   * @param {Function} options.additionalFilter - Additional filter function
   * @param {boolean} options.isSingle - Whether fetching a single item
   * @param {boolean} options.isSingleItem - Alias for isSingle (for backward compatibility)
   * @returns {Promise<Array|Object>} - The fetched articles or article
   */
  const fetchArticles = async (endpoint, options = {}) => {
    try {
      const data = await get(endpoint);
      
      // Support both isSingle and isSingleItem parameter names
      const isSingleItem = options.isSingle || options.isSingleItem;

      if (isSingleItem) {
        // Single item (detail view)
        if (filterSingleItem(data)) {
          article.value = data;
          return data;
        } else {
          article.value = null;
          return null;
        }
      } else {
        // Multiple items (list view)
        // Ensure data is an array before filtering
        const dataArray = Array.isArray(data) ? data : [];
        let filtered = filterTestItems(dataArray);

        // Apply additional filter if provided
        if (options.additionalFilter) {
          filtered = filtered.filter(options.additionalFilter);
        }

        articles.value = filtered;
        return filtered;
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      articles.value = [];
      article.value = null;
      throw err;
    }
  };

  /**
   * Fetch category counts
   * @param {string} category - The category name (pomnicky, krize, studanky)
   * @returns {Promise<Array>} - Category count data
   */
  const fetchCategoryCount = async (category) => {
    try {
      const data = await get(`/${category}/categoryCount`);
      return data;
    } catch (err) {
      console.error(`Error fetching category count for ${category}:`, err);
      return [];
    }
  };

  /**
   * Fetch names for alphabetical list
   * @param {string} category - The category name
   * @returns {Promise<Array>} - Array of names
   */
  const fetchNames = async (category) => {
    try {
      const data = await get(`/${category}`);
      const filtered = filterTestItems(data.names || data);
      return filtered;
    } catch (err) {
      console.error(`Error fetching names for ${category}:`, err);
      return [];
    }
  };

  /**
   * Sort articles alphabetically by name
   * @param {Array} items - Articles to sort
   * @param {string} field - Field to sort by (default: 'jmeno')
   * @returns {Array} - Sorted articles
   */
  const sortAlphabetically = (items, field = "jmeno") => {
    return [...items].sort((a, b) => {
      const aValue = a[field]?.trim() || "";
      const bValue = b[field]?.trim() || "";
      return aValue.localeCompare(bValue, "cs", { sensitivity: "accent" });
    });
  };

  return {
    articles,
    article,
    loading,
    error,
    get, // Export get function for direct API access
    fetchArticles,
    fetchCategoryCount,
    fetchNames,
    filterTestItems,
    filterSingleItem,
    sortAlphabetically,
  };
}

