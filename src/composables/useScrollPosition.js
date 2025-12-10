/**
 * Composable for managing scroll position restoration
 * Used across multiple components to restore scroll position after navigation
 */

export function useScrollPosition() {
  const getStorageKey = (routeName) => {
    if (typeof routeName === "string" && routeName.length) {
      return `scrollY:${routeName}`;
    }
    return "scrollY";
  };

  /**
   * Save current scroll position to sessionStorage
   */
  const saveScrollPosition = (routeName, clear = true) => {
    const scrollY = window.scrollY || window.pageYOffset;
    const storageKey = getStorageKey(routeName);
    if (clear) {
      // clear all sessionStorage keys except for paragraphId
      const paragraphId = sessionStorage.getItem("paragraphId");
      sessionStorage.clear();
      if (paragraphId !== null) {
        sessionStorage.setItem("paragraphId", paragraphId);
      }
    }
    sessionStorage.setItem(storageKey, String(scrollY));
  };

  /**
   * Restore scroll position from sessionStorage
   * @param {boolean} remove - Whether to remove the stored position after restoring
   */
  const restoreScrollPosition = (clear = true) => {
    const pathName = window.location.pathname;
    const storageKey = getStorageKey(pathName);
    const scrollY = sessionStorage.getItem(storageKey);
    if (scrollY) {
      window.scrollTo(0, Number(scrollY));
      if (clear) {
        // clear all sessionStorage so as not to remember previous scroll positions
        sessionStorage.clear();
      }
    }
  };

  /**
   * Scroll to top of page smoothly
   */
  const scrollToTop = (smooth = true) => {
    window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "instant" });
  };

  /**
   * Scroll to a specific paragraph by ID
   * @param {string|number} paragraphId - The ID of the paragraph to scroll to
   */
  const scrollToParagraph = (paragraphId) => {
    if (!paragraphId) {
      const storedId = sessionStorage.getItem("paragraphId");
      if (storedId) {
        paragraphId = storedId;
        sessionStorage.removeItem("paragraphId");
      } else {
        return;
      }
    }

    const paragraph = document.getElementById(String(paragraphId));
    if (paragraph) {
      const top = paragraph.getBoundingClientRect().top;
      window.scrollTo({ top: top + window.scrollY, behavior: "instant" });
    }
  };

  /**
   * Save paragraph ID to sessionStorage for later scrolling
   * @param {string|number} paragraphId - The ID to save
   */
  const saveParagraphId = (paragraphId) => {
    sessionStorage.setItem("paragraphId", String(paragraphId));
  };

  return {
    saveScrollPosition,
    restoreScrollPosition,
    scrollToTop,
    scrollToParagraph,
    saveParagraphId,
  };
}
