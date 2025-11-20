<template>
  <Transition name="menu">
    <div v-if="isOpen" class="mobile-menu">
      <div class="mobile-menu-overlay" @click="close"></div>

      <nav class="mobile-menu-content" role="navigation" aria-label="Mobile navigation">
        <button class="close-button" @click="close" aria-label="Close menu">
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
            <span v-if="link.count !== undefined" class="link-count">{{ link.count }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  links: {
    type: Array,
    required: true,
  },
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
  overflow-y: auto;
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
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #4c6793;
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
  font-family: "Raleway", sans-serif;
}

.mobile-menu-link:hover {
  color: #4c6793;
}

.link-count {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
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

