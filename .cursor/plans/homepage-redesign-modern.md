# Modern Homepage Redesign Plan

## Inspired by Travel Website Design

## 🎯 Design Goals

Transform the current text-heavy, sidebar-navigation homepage into a modern, hero-driven design with:

- **Full-screen hero section** with dramatic background image
- **Centered content** with bold typography
- **Minimal, clean navigation** in header
- **Call-to-action button** prominently displayed
- **Visual journey indicators** (route path with pins)
- **Modern glassmorphism effects**

---

## 📊 Current vs. Target Design

### Current Design

- ✗ Left sidebar navigation (takes 1/5 of screen)
- ✗ Long descriptive text in center
- ✗ Background image with heavy white overlay
- ✗ Traditional grid layout
- ✗ Footer at bottom

### Target Design (from image)

- ✓ Top horizontal navigation bar
- ✓ Full-screen hero with minimal overlay
- ✓ Large centered headline "DISCOVER YOUR DESTINATION"
- ✓ Decorative route path with location pins
- ✓ Single CTA button "Explore"
- ✓ Minimal text overlay
- ✓ Carousel/slider indicators at bottom

---

## 🏗️ Implementation Plan

### Phase 1: Layout Structure (2-3 hours)

#### 1.1 Create New Hero Component

**File:** `src/components/HeroSection.vue`

```vue
<template>
  <section class="hero-section">
    <!-- Background Image Layer -->
    <div class="hero-background">
      <picture>
        <source srcset="@/assets/hero-background.webp" type="image/webp" />
        <img src="@/assets/hero-background.jpg" alt="Mountain landscape" />
      </picture>
    </div>

    <!-- Overlay Layer (subtle gradient) -->
    <div class="hero-overlay"></div>

    <!-- Content Layer -->
    <div class="hero-content">
      <!-- Logo/Brand -->
      <div class="hero-brand">
        <span class="brand-text"
          >Travel<span class="brand-accent">more</span></span
        >
      </div>

      <!-- Main Navigation -->
      <nav class="hero-nav">
        <router-link to="/">Home</router-link>
        <router-link to="/explore">Explore</router-link>
        <router-link to="/videos">Videos</router-link>
        <router-link to="/tours">Tours</router-link>
      </nav>

      <!-- Hamburger Menu (mobile) -->
      <button class="menu-toggle" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Hero Text -->
      <div class="hero-text">
        <h1 class="hero-title">
          DISCOVER<br />
          YOUR DESTINATION
        </h1>
        <p class="hero-subtitle">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
        </p>
        <button class="cta-button" @click="explore">Explore</button>
      </div>

      <!-- Decorative Route Path -->
      <svg class="route-path" viewBox="0 0 400 300">
        <path
          d="M 200,50 Q 250,100 220,150 Q 190,200 240,250"
          stroke="white"
          stroke-width="2"
          fill="none"
          stroke-dasharray="5,5"
        />
        <circle cx="200" cy="50" r="8" fill="#ef4444" />
        <circle cx="240" cy="250" r="8" fill="#ef4444" />
      </svg>

      <!-- Carousel Indicators -->
      <div class="carousel-indicators">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>

      <!-- Bottom Info Cards -->
      <div class="info-cards">
        <div class="info-card">
          <i class="fas fa-play-circle"></i>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
        </div>
        <div class="info-card">
          <i class="fas fa-play-circle"></i>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit</p>
        </div>
      </div>
    </div>
  </section>
</template>
```

#### 1.2 Update Home.vue Structure

**File:** `src/views/Home.vue`

Replace current grid layout with:

```vue
<template>
  <div class="home-modern">
    <HeroSection :slides="heroSlides" @explore="handleExplore" />

    <!-- Optional: Categories section below hero -->
    <CategoriesSection
      v-if="showCategories"
      :categories="categories"
      :counts="counts"
      :loading="loading"
    />
  </div>
</template>
```

---

### Phase 2: Styling & Visual Design (3-4 hours)

#### 2.1 Hero Section Styles

**File:** `src/components/HeroSection.vue` (style section)

```css
<style scoped>
.hero-section {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
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
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.3) 100%
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
  grid-template-columns: 80px 1fr 80px;
  grid-template-rows: 80px 1fr 120px;
  padding: 20px;
}

/* Brand/Logo */
.hero-brand {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  align-items: center;
  padding-left: 40px;
}

.brand-text {
  font-size: 28px;
  font-weight: 700;
  color: white;
  font-family: 'Raleway', sans-serif;
  letter-spacing: -0.5px;
}

.brand-accent {
  color: #ef4444;
}

/* Navigation */
.hero-nav {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
}

.hero-nav a {
  color: white;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  font-family: 'Raleway', sans-serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  position: relative;
}

.hero-nav a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: white;
  transition: width 0.3s ease;
}

.hero-nav a:hover::after,
.hero-nav a.router-link-active::after {
  width: 100%;
}

/* Menu Toggle (Mobile) */
.menu-toggle {
  grid-column: 3 / 4;
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
}

.menu-toggle span {
  width: 100%;
  height: 2px;
  background: white;
  transition: all 0.3s ease;
}

/* Hero Text */
.hero-text {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.hero-title {
  font-size: clamp(48px, 8vw, 96px);
  font-weight: 900;
  color: white;
  line-height: 1.1;
  letter-spacing: -2px;
  margin: 0 0 20px 0;
  text-transform: uppercase;
  font-family: 'Raleway', sans-serif;
  text-shadow: 2px 4px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 40px 0;
  max-width: 600px;
  line-height: 1.6;
  font-weight: 300;
}

/* CTA Button */
.cta-button {
  padding: 16px 60px;
  font-size: 18px;
  font-weight: 600;
  color: white;
  background: transparent;
  border: 2px solid white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: 'Raleway', sans-serif;
}

.cta-button:hover {
  background: white;
  color: #1e293b;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.3);
}

/* Route Path SVG */
.route-path {
  position: absolute;
  top: 50%;
  right: 15%;
  width: 200px;
  height: 300px;
  transform: translateY(-50%);
  opacity: 0.8;
  pointer-events: none;
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

.carousel-indicators button.active {
  background: white;
  width: 80px;
}

/* Info Cards */
.info-cards {
  grid-column: 1 / 2;
  grid-row: 3 / 4;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 40px;
  align-self: end;
  padding-bottom: 20px;
}

.info-card {
  display: flex;
  align-items: center;
  gap: 15px;
  color: white;
  max-width: 300px;
}

.info-card i {
  font-size: 32px;
  color: white;
  opacity: 0.8;
}

.info-card p {
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
  opacity: 0.9;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .route-path {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .hero-title {
    font-size: 48px;
  }

  .info-cards {
    display: none;
  }

  .hero-content {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 1fr 80px;
  }

  .hero-brand {
    grid-column: 1 / 2;
  }

  .hero-text {
    grid-column: 1 / 3;
  }

  .carousel-indicators {
    grid-column: 1 / 3;
  }
}
</style>
```

---

### Phase 3: Interactive Features (2-3 hours)

#### 3.1 Carousel/Slider Functionality

**File:** `src/composables/useHeroCarousel.js`

```javascript
import { ref, onMounted, onUnmounted } from "vue";

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
    if (isAutoplay.value) {
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
  };
}
```

#### 3.2 Animated Route Path

**File:** `src/components/AnimatedRoutePath.vue`

```vue
<template>
  <svg class="route-path" viewBox="0 0 400 300">
    <!-- Animated dashed path -->
    <path
      ref="pathRef"
      :d="pathData"
      stroke="white"
      stroke-width="2"
      fill="none"
      stroke-dasharray="5,5"
      class="animated-path"
    />

    <!-- Start pin -->
    <g class="pin start-pin">
      <circle :cx="startPoint.x" :cy="startPoint.y" r="12" fill="#ef4444" />
      <path
        :d="`M ${startPoint.x} ${startPoint.y - 20} 
             L ${startPoint.x} ${startPoint.y - 5}`"
        stroke="white"
        stroke-width="2"
      />
    </g>

    <!-- End pin -->
    <g class="pin end-pin">
      <circle :cx="endPoint.x" :cy="endPoint.y" r="12" fill="#ef4444" />
      <path
        :d="`M ${endPoint.x} ${endPoint.y - 20} 
             L ${endPoint.x} ${endPoint.y - 5}`"
        stroke="white"
        stroke-width="2"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  startPoint: {
    type: Object,
    default: () => ({ x: 200, y: 50 }),
  },
  endPoint: {
    type: Object,
    default: () => ({ x: 240, y: 250 }),
  },
});

const pathData = computed(() => {
  const { x: x1, y: y1 } = props.startPoint;
  const { x: x2, y: y2 } = props.endPoint;

  // Create curved path
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  return `M ${x1},${y1} Q ${midX + 50},${midY} ${midX},${midY + 50} Q ${
    midX - 30
  },${midY + 100} ${x2},${y2}`;
});
</script>

<style scoped>
.animated-path {
  animation: dash 20s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -100;
  }
}

.pin {
  animation: bounce 2s ease-in-out infinite;
}

.end-pin {
  animation-delay: 1s;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
```

---

### Phase 4: Content Integration (1-2 hours)

#### 4.1 Hero Slides Data Structure

**File:** `src/data/heroSlides.js`

```javascript
export const heroSlides = [
  {
    id: 1,
    title: "OBJEVTE\nVAŠE DESTINACE",
    subtitle: "Prozkoumejte pomníčky, smírčí kříže a studánky v okolí Brna",
    image: "/assets/hero-pomnicky.jpg",
    cta: {
      text: "Prozkoumat",
      link: "/pomnicky",
    },
    routePath: {
      start: { x: 200, y: 50 },
      end: { x: 240, y: 250 },
    },
  },
  {
    id: 2,
    title: "HISTORICKÉ\nKŘÍŽE",
    subtitle: "Smírčí kříže a jejich fascinující příběhy",
    image: "/assets/hero-krize.jpg",
    cta: {
      text: "Zjistit více",
      link: "/krize",
    },
  },
  {
    id: 3,
    title: "PŘÍRODNÍ\nKRÁSY",
    subtitle: "Studánky a prameny v brněnském okolí",
    image: "/assets/hero-studanky.jpg",
    cta: {
      text: "Navštívit",
      link: "/studanky",
    },
  },
];
```

#### 4.2 Categories Section (Optional)

**File:** `src/components/CategoriesSection.vue`

```vue
<template>
  <section class="categories-section">
    <div class="container">
      <h2 class="section-title">Kategorie</h2>

      <div class="categories-grid">
        <router-link
          v-for="category in categories"
          :key="category.id"
          :to="category.link"
          class="category-card"
        >
          <div class="category-icon">
            <i :class="category.icon"></i>
          </div>
          <h3 class="category-title">{{ category.name }}</h3>
          <p class="category-count">{{ counts[category.key] }} objektů</p>
          <div class="category-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({
  categories: Array,
  counts: Object,
  loading: Object,
});

const categories = [
  {
    id: 1,
    name: "Pomníčky",
    key: "pomnicky",
    link: "/pomnicky",
    icon: "fas fa-monument",
  },
  {
    id: 2,
    name: "Smírčí kříže",
    key: "krize",
    link: "/krize",
    icon: "fas fa-cross",
  },
  {
    id: 3,
    name: "Studánky",
    key: "studanky",
    link: "/studanky",
    icon: "fas fa-tint",
  },
  {
    id: 4,
    name: "Vyprávění",
    key: "vypraveni",
    link: "/vypraveni",
    icon: "fas fa-book-open",
  },
  {
    id: 5,
    name: "Cesty",
    key: "cesty",
    link: "/cesty",
    icon: "fas fa-route",
  },
];
</script>

<style scoped>
.categories-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 48px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 60px;
  color: #1e293b;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.category-card {
  background: white;
  border-radius: 16px;
  padding: 40px 30px;
  text-decoration: none;
  color: #1e293b;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.category-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4c6793 0%, #6b8cc4 100%);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.category-card:hover::before {
  transform: scaleX(1);
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  background: linear-gradient(135deg, #4c6793 0%, #6b8cc4 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.category-icon i {
  font-size: 28px;
  color: white;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.category-count {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 20px 0;
}

.category-arrow {
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.category-card:hover .category-arrow {
  background: linear-gradient(135deg, #4c6793 0%, #6b8cc4 100%);
}

.category-card:hover .category-arrow i {
  color: white;
}

.category-arrow i {
  font-size: 16px;
  color: #4c6793;
  transition: color 0.3s ease;
}
</style>
```

---

### Phase 5: Mobile Responsiveness (1-2 hours)

#### 5.1 Mobile Menu Component

**File:** `src/components/MobileMenu.vue`

```vue
<template>
  <Transition name="menu">
    <div v-if="isOpen" class="mobile-menu">
      <div class="mobile-menu-overlay" @click="close"></div>

      <nav class="mobile-menu-content">
        <button class="close-button" @click="close">
          <i class="fas fa-times"></i>
        </button>

        <div class="mobile-menu-links">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            @click="close"
            class="mobile-menu-link"
          >
            {{ link.text }}
            <span v-if="link.count" class="link-count">{{ link.count }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  links: Array,
});

const emit = defineEmits(["close"]);

const close = () => {
  emit("close");
};
</script>

<style scoped>
.mobile-menu {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
}

.mobile-menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.mobile-menu-content {
  position: absolute;
  top: 0;
  right: 0;
  width: 80%;
  max-width: 400px;
  height: 100%;
  background: white;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  font-size: 24px;
  color: #1e293b;
  cursor: pointer;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.mobile-menu-link {
  font-size: 20px;
  font-weight: 600;
  color: #1e293b;
  text-decoration: none;
  padding: 15px 0;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;
}

.mobile-menu-link:hover {
  color: #4c6793;
}

.link-count {
  font-size: 14px;
  color: #64748b;
}

/* Transitions */
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}

.menu-enter-active .mobile-menu-content,
.menu-leave-active .mobile-menu-content {
  transition: transform 0.3s ease;
}

.menu-enter-from .mobile-menu-content,
.menu-leave-to .mobile-menu-content {
  transform: translateX(100%);
}
</style>
```

---

### Phase 6: Performance Optimization (1 hour)

#### 6.1 Image Optimization

- Convert hero images to WebP format
- Create multiple sizes (mobile, tablet, desktop)
- Implement lazy loading for below-fold content
- Add blur-up placeholder effect

#### 6.2 Animation Performance

- Use `will-change` CSS property for animated elements
- Implement `IntersectionObserver` for scroll animations
- Debounce carousel autoplay on user interaction

---

## 📝 Implementation Checklist

### Design & Layout

- [ ] Create HeroSection.vue component
- [ ] Implement full-screen hero layout
- [ ] Add horizontal navigation bar
- [ ] Create centered hero text with large typography
- [ ] Add glassmorphism overlay effect

### Interactive Elements

- [ ] Implement carousel/slider functionality
- [ ] Add animated route path with pins
- [ ] Add CTA button with hover effects
- [ ] Implement carousel indicators

### Content

- [ ] Prepare hero images (3-5 slides)
- [ ] Write compelling hero headlines
- [ ] Create slide data structure
- [ ] Integrate category counts
- [ ] Add optional categories section below hero

### Responsive Design

- [ ] Create mobile menu component
- [ ] Implement hamburger menu toggle
- [ ] Adjust typography for mobile
- [ ] Hide/show elements based on breakpoints
- [ ] Test on various screen sizes

### Performance

- [ ] Optimize hero images (WebP, multiple sizes)
- [ ] Implement lazy loading
- [ ] Add loading states
- [ ] Optimize animations
- [ ] Test Lighthouse scores

### Accessibility

- [ ] Add proper ARIA labels
- [ ] Ensure keyboard navigation works
- [ ] Test with screen readers
- [ ] Maintain color contrast ratios
- [ ] Add focus states to interactive elements

---

## 🎨 Design Tokens

```css
/* Colors */
--hero-overlay: rgba(0, 0, 0, 0.3);
--hero-text: #ffffff;
--accent-red: #ef4444;
--primary-blue: #4c6793;
--background-light: #f8fafc;

/* Typography */
--font-hero: "Raleway", sans-serif;
--hero-title-size: clamp(48px, 8vw, 96px);
--hero-subtitle-size: 18px;

/* Spacing */
--hero-padding: 20px;
--section-padding: 100px 20px;

/* Effects */
--glassmorphism: rgba(255, 255, 255, 0.1);
--blur: blur(10px);
--transition: all 0.3s ease;
```

---

## 🚀 Migration Strategy

### Option A: Complete Redesign (Recommended)

1. Create new `HomeModern.vue` component
2. Test thoroughly
3. Switch router to use new component
4. Keep old `Home.vue` as backup

### Option B: Gradual Migration

1. Add feature flag to toggle between designs
2. A/B test with users
3. Gradually roll out new design
4. Remove old design after validation

---

## 📊 Expected Outcomes

### User Experience

- ✓ **Immediate visual impact** with hero design
- ✓ **Clear call-to-action** drives engagement
- ✓ **Modern, professional** appearance
- ✓ **Better mobile experience** with optimized layout

### Performance

- ✓ **Faster perceived load time** with optimized images
- ✓ **Smooth animations** at 60fps
- ✓ **Reduced bounce rate** with engaging design

### Metrics to Track

- Time on homepage
- Click-through rate on CTA button
- Mobile vs. desktop engagement
- Page load time
- Lighthouse scores

---

## 🔧 Technical Requirements

### Dependencies

```json
{
  "dependencies": {
    "vue": "^3.4.21",
    "vue-router": "^4.3.0"
  }
}
```

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 10+)

### Assets Needed

- 3-5 high-quality hero images (1920x1080px minimum)
- WebP versions of all images
- Optional: Video background for hero

---

## 📚 Resources & References

- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [CSS Glassmorphism Generator](https://hype4.academy/tools/glassmorphism-generator)
- [Hero Section Best Practices](https://www.smashingmagazine.com/2021/06/designing-better-hero-sections/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)

---

## ⏱️ Estimated Timeline

- **Phase 1:** Layout Structure - 2-3 hours
- **Phase 2:** Styling & Design - 3-4 hours
- **Phase 3:** Interactive Features - 2-3 hours
- **Phase 4:** Content Integration - 1-2 hours
- **Phase 5:** Mobile Responsiveness - 1-2 hours
- **Phase 6:** Performance Optimization - 1 hour

**Total: 10-15 hours**

---

## 🎯 Success Criteria

- [ ] Hero section displays correctly on all devices
- [ ] Carousel auto-plays and responds to user interaction
- [ ] Navigation is intuitive and accessible
- [ ] Page loads in under 3 seconds
- [ ] Lighthouse score above 90
- [ ] No accessibility violations
- [ ] Smooth animations at 60fps
- [ ] Mobile menu works flawlessly
