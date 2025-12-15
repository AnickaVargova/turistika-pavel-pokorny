<template>
  <section class="hero-section">
    <!-- Background Image Layer with transition -->
    <Transition name="fade" mode="out-in">
      <div :key="currentSlide" class="hero-background">
        <picture>
          <img
            :src="getImageUrl(slides[currentSlide].image)"
            :alt="slides[currentSlide].title"
            loading="eager"
            fetchpriority="high"
          />
        </picture>
      </div>
    </Transition>

    <!-- Overlay Layer (subtle gradient) -->
    <div class="hero-overlay"></div>

    <!-- Content Layer -->
    <div class="hero-content">
      <!-- Logo + Sidebar Navigation -->
      <aside class="hero-sidebar">
        <div class="hero-brand">
          <router-link to="/" class="brand-link">
            <span class="brand-text">
              Turistika <span class="brand-accent">Pavel Pokorný</span>
            </span>
          </router-link>
        </div>

        <nav class="hero-nav" role="navigation" aria-label="Main navigation">
          <component
            v-for="link in heroNavLinks"
            :key="link.key"
            :is="link.to ? 'router-link' : 'a'"
            :class="getLinkClasses(link)"
            v-bind="getLinkBindings(link)"
          >
            <span class="hero-nav-text">{{ link.text }}</span>
            <span v-if="link.countKey" class="hero-nav-count">
              {{ loading[link.countKey] ? "..." : counts[link.countKey] }}
            </span>
          </component>
        </nav>
      </aside>

      <!-- Hamburger Menu (mobile) -->
      <button
        class="menu-toggle"
        @click="toggleMenu"
        aria-label="Toggle mobile menu"
        aria-expanded="mobileMenuOpen"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Hero Text -->
      <div class="hero-text">
        <Transition name="slide-up" mode="out-in">
          <div :key="currentSlide" class="hero-text-content">
            <h1
              class="hero-title"
              v-html="slides[currentSlide].title.replace('\n', '<br />')"
            ></h1>
            <p class="hero-subtitle">{{ slides[currentSlide].subtitle }}</p>
            <router-link :to="slides[currentSlide].cta.link" class="cta-button">
              {{ slides[currentSlide].cta.text }}
            </router-link>
          </div>
        </Transition>
      </div>

      <!-- Carousel Indicators -->
      <div v-if="slides.length > 1" class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :aria-label="`Go to slide ${index + 1}`"
          :aria-current="currentSlide === index ? 'true' : 'false'"
        ></button>
      </div>

      <button
        type="button"
        class="animation-toggle"
        @click="toggleAutoplay"
      >
        {{ isAutoplay ? "Zastavit animaci" : "Spustit animaci" }}
      </button>

    </div>

    <!-- Mobile Menu -->
    <MobileMenu
      :is-open="mobileMenuOpen"
      :links="mobileLinks"
      @close="toggleMenu"
    />
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import MobileMenu from "./MobileMenu.vue";
import { useHeroCarousel } from "../composables/useHeroCarousel";
import { useCategoryStats } from "../composables/useCategoryStats";
import { mapaUrl } from "../utils/url";

const props = defineProps({
  slides: {
    type: Array,
    required: true,
  },
});

// Carousel functionality
const { currentSlide, goToSlide, isAutoplay, toggleAutoplay } = useHeroCarousel(
  props.slides
);

// Mobile menu state
const mobileMenuOpen = ref(false);

// Category stats for navigation
const { counts, loading, fetchAllCounts } = useCategoryStats();

const heroNavLinks = [
  { key: "uvod", text: "Úvod", to: "/" },
  {
    key: "novepridane",
    text: "Naposled přidané",
    to: "/novepridane",
    countKey: "novePridane",
  },
  { key: "mapa", text: "Mapa", href: mapaUrl, target: "_self" },
  { key: "pomnicky", text: "Pomníčky", to: "/pomnicky", countKey: "pomnicky" },
  { key: "krize", text: "Smírčí kříže", to: "/krize", countKey: "krize" },
  { key: "studanky", text: "Studánky", to: "/studanky", countKey: "studanky" },
  { key: "cesty", text: "Cesty", to: "/cesty", countKey: "cesty" },
  {
    key: "vypraveni",
    text: "Vyprávění",
    to: "/vypraveni",
    countKey: "vypraveni",
  },
  { key: "onas", text: "O nás", to: "/onas" },
  { key: "odkazy", text: "Sympatické weby", to: "/odkazy" },
  {
    key: "rajce",
    text: "Moje rajče",
    href: "https://turistapavel.rajce.idnes.cz/",
    target: "_blank",
    external: true,
  },
];

// Mobile menu links (include counts/external links)
const mobileLinks = computed(() =>
  heroNavLinks.map((link) => ({
    ...link,
    count:
      link.countKey !== undefined
        ? loading[link.countKey]
          ? "..."
          : counts[link.countKey]
        : undefined,
  }))
);

const getLinkClasses = (link) => [
  "hero-nav-link",
  { "hero-nav-link--mapa": link.key === "mapa" },
];

const getLinkBindings = (link) => {
  if (link.to) {
    return { to: link.to };
  }

  return {
    href: link.href,
    target: link.target ?? (link.external ? "_blank" : "_self"),
    rel: link.external ? "noopener noreferrer" : undefined,
  };
};

const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

onMounted(() => {
  fetchAllCounts();
});

// Get image URL using Vite's dynamic import
const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
};
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}

/* Background Image */
.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* Subtle Overlay */
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 2;
}

/* Content Container */
.hero-content {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: minmax(260px, 320px) 1fr;
  grid-template-rows: auto 1fr 120px;
  padding: 40px 60px;
  max-width: 1920px;
  margin: 0 auto;
  column-gap: 40px;
  align-items: center;
  align-content: center;
}

.hero-sidebar {
  grid-column: 1 / 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  padding: 0;
}

/* Brand/Logo */
.hero-brand {
  display: flex;
  align-items: center;
  margin-bottom: 28px;
}

.brand-link {
  text-decoration: none;
}

.brand-text {
  font-size: 24px;
  font-weight: 700;
  color: white;
  font-family: "Raleway", sans-serif;
  letter-spacing: -0.5px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.brand-accent {
  color: #ef4444;
}

/* Navigation */
.hero-nav {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.hero-nav-link {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  font-family: "Raleway", sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
  text-transform: uppercase;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 4px 0;
  border-left: none;
  border-radius: 0;
  width: 100%;
}

.hero-nav-link::after {
  content: "";
  position: absolute;
  bottom: 6px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease;
}

.hero-nav-link:hover::after,
.hero-nav-link.router-link-active::after {
  width: 60%;
}

.hero-nav-link--mapa {
  color: #a5f3fc;
}

.hero-nav-link--mapa::after {
  background: currentColor;
}

.hero-nav-count {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0;
  padding: 2px 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.15);
  color: white;
}

/* Menu Toggle (Mobile) */
.menu-toggle {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 40px;
  height: 40px;
  background: transparent;
  border: 2px solid white;
  border-radius: 50%;
  cursor: pointer;
  padding: 8px;
  justify-self: end;
  margin-right: 20px;
  transition: all 0.3s ease;
}

.menu-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: scale(1.05);
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
  border-radius: 2px;
}

/* Hero Text */
.hero-text {
  grid-column: 2 / 3;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero-text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  font-size: clamp(40px, 7vw, 80px);
  font-weight: 900;
  color: white;
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  font-family: "Raleway", sans-serif;
  text-shadow: 3px 5px 10px rgba(0, 0, 0, 0.5);
}

.hero-subtitle {
  font-size: clamp(16px, 2vw, 20px);
  color: rgba(255, 255, 255, 0.95);
  margin: 0 0 40px 0;
  max-width: 700px;
  line-height: 1.6;
  font-weight: 400;
  text-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
}

/* CTA Button */
.cta-button {
  padding: 16px 50px;
  font-size: 16px;
  font-weight: 700;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-family: "Raleway", sans-serif;
  text-decoration: none;
  display: inline-block;
}

.cta-button:hover {
  background: white;
  color: #1e293b;
  transform: translateY(-3px);
  box-shadow: 0 15px 35px rgba(255, 255, 255, 0.4);
}

/* Animation Toggle */
.animation-toggle {
  position: absolute;
  left: 60px;
  bottom: 40px;
  z-index: 20;
  padding: 6px 16px;
  border: 1px solid white;
  background: rgba(0, 0, 0, 0.45);
  color: white;
  font-weight: 600;
  font-size: 11px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.animation-toggle:hover,
.animation-toggle:focus-visible {
  background: white;
  color: #111827;
  outline: none;
}

/* Carousel Indicators */
.carousel-indicators {
  grid-column: 2 / 3;
  grid-row: 3 / 4;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
}

.carousel-indicators button {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.carousel-indicators button:hover {
  background: rgba(255, 255, 255, 0.6);
}

.carousel-indicators button.active {
  background: white;
  width: 80px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active {
  transition: all 0.6s ease;
}

.slide-up-leave-active {
  transition: all 0.4s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Responsive Design */
@media (max-width: 1200px) {
  .hero-content {
    column-gap: 24px;
    padding: 20px 24px;
  }

  .hero-nav-link {
    font-size: 14px;
  }
}

@media (max-width: 900px) {
  .hero-content {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr 100px;
    row-gap: 20px;
    column-gap: 0;
    padding: 20px;
  }

  .hero-sidebar {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    width: 100%;
    padding: 0;
    background: transparent;
    box-shadow: none;
    backdrop-filter: none;
  }

  .hero-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    justify-self: end;
    align-self: center;
    margin-right: 0;
  }

  .hero-text {
    grid-column: 1 / 2;
    grid-row: 3 / 4;
  }

  .carousel-indicators {
    grid-column: 1 / 2;
    grid-row: 4 / 5;
  }

  .animation-toggle {
    left: 24px;
    bottom: 24px;
    padding: 6px 14px;
    font-size: 10px;
  }
}

@media (max-width: 600px) {
  .brand-text {
    font-size: 18px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 15px;
  }

  .cta-button {
    padding: 14px 40px;
    font-size: 14px;
  }

  .carousel-indicators button {
    width: 40px;
  }

  .carousel-indicators button.active {
    width: 60px;
  }

  .animation-toggle {
    left: 16px;
    bottom: 16px;
    padding: 5px 12px;
    font-size: 9px;
  }
}
</style>

