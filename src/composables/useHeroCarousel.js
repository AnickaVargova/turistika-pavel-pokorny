import { ref, onMounted, onUnmounted } from "vue";

/**
 * Composable for managing hero carousel/slider functionality
 * @param {Array} slides - Array of slide objects
 * @param {number} autoplayDelay - Delay between slides in milliseconds
 */
export function useHeroCarousel(slides, autoplayDelay = 5000) {
  const currentSlide = ref(0);
  const isAutoplay = ref(true);
  let autoplayTimer = null;

  const goToSlide = (index) => {
    currentSlide.value = index;
    resetAutoplay();
  };

  const nextSlide = () => {
    currentSlide.value = (currentSlide.value + 1) % slides.length;
  };

  const prevSlide = () => {
    currentSlide.value =
      currentSlide.value === 0 ? slides.length - 1 : currentSlide.value - 1;
  };

  const startAutoplay = () => {
    if (isAutoplay.value && slides.length > 1) {
      autoplayTimer = setInterval(nextSlide, autoplayDelay);
    }
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const resetAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  const toggleAutoplay = () => {
    isAutoplay.value = !isAutoplay.value;
    if (isAutoplay.value) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
  };

  onMounted(() => {
    startAutoplay();
  });

  onUnmounted(() => {
    stopAutoplay();
  });

  return {
    currentSlide,
    goToSlide,
    nextSlide,
    prevSlide,
    isAutoplay,
    toggleAutoplay,
  };
}

