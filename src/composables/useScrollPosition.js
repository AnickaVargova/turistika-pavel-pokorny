/**
 * Composable for managing scroll position restoration
 * Used across multiple components to restore scroll position after navigation
 */

export function useScrollPosition() {
  /**
   * Save current scroll position to sessionStorage
   */
  const saveScrollPosition = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    sessionStorage.setItem("scrollY", String(scrollY));
  };

  /**
   * Restore scroll position from sessionStorage
   * @param {boolean} remove - Whether to remove the stored position after restoring
   */
  const restoreScrollPosition = (remove = true) => {
    const scrollY = sessionStorage.getItem("scrollY");
    if (scrollY) {
      window.scrollTo(0, Number(scrollY));
      if (remove) {
        sessionStorage.removeItem("scrollY");
      }
    }
  };

  /**
   * Scroll to top of page smoothly
   */
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      window.scrollTo({ top: top + window.scrollY, behavior: "smooth" });
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

