/**
 * Composable for fetching category statistics (counts)
 * Used on the Home page to display counts for each category
 */

import { ref, reactive } from "vue";
import { useArticles } from "./useArticles";

const CATEGORIES = ["pomnicky", "krize", "studanky", "vypraveni", "cesty"];

export function useCategoryStats() {
  const { fetchNames, get } = useArticles();
  
  const counts = reactive({
    pomnicky: 0,
    krize: 0,
    studanky: 0,
    vypraveni: 0,
    cesty: 0,
    novePridane: 0,
  });

  const loading = reactive({
    pomnicky: true,
    krize: true,
    studanky: true,
    vypraveni: true,
    cesty: true,
    novePridane: true,
  });

  const errors = reactive({});

  /**
   * Fetch count for a specific category
   * @param {string} category - The category name
   */
  const fetchCategoryCount = async (category) => {
    try {
      loading[category] = true;
      const data = await fetchNames(category);
      counts[category] = data.length;
    } catch (error) {
      console.error(`Error fetching ${category}:`, error);
      errors[category] = error.message;
      counts[category] = 0;
    } finally {
      loading[category] = false;
    }
  };

  /**
   * Fetch count for "nove pridane" (newly added items)
   */
  const fetchNovePridaneCount = async () => {
    try {
      loading.novePridane = true;
      const data = await get("/novePridane");
      counts.novePridane = data.filter((item) => !item.test).length;
    } catch (error) {
      console.error("Error fetching novePridane:", error);
      errors.novePridane = error.message;
      counts.novePridane = 0;
    } finally {
      loading.novePridane = false;
    }
  };

  /**
   * Fetch all category counts
   */
  const fetchAllCounts = async () => {
    // Use Promise.allSettled to prevent one failure from blocking others
    const results = await Promise.allSettled([
      ...CATEGORIES.map((category) => fetchCategoryCount(category)),
      fetchNovePridaneCount(),
    ]);

    // Log any failures for debugging
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const categoryName =
          index < CATEGORIES.length ? CATEGORIES[index] : "novePridane";
        console.warn(`Failed to fetch ${categoryName}:`, result.reason);
      }
    });
  };

  return {
    counts,
    loading,
    errors,
    fetchCategoryCount,
    fetchNovePridaneCount,
    fetchAllCounts,
  };
}

