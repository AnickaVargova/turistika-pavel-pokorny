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
          <p v-if="!loading[category.key]" class="category-count">
            {{ counts[category.key] }} {{ category.countLabel }}
          </p>
          <div v-else class="category-count-loader">
            <div class="spinner"></div>
          </div>
          <div class="category-arrow">
            <i class="fas fa-arrow-right"></i>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from "vue";
import { useCategoryStats } from "../composables/useCategoryStats";

const { counts, loading, fetchAllCounts } = useCategoryStats();

const categories = [
  {
    id: 1,
    name: "Pomníčky",
    key: "pomnicky",
    link: "/pomnicky",
    icon: "fas fa-monument",
    countLabel: "objektů",
  },
  {
    id: 2,
    name: "Smírčí kříže",
    key: "krize",
    link: "/krize",
    icon: "fas fa-cross",
    countLabel: "objektů",
  },
  {
    id: 3,
    name: "Studánky",
    key: "studanky",
    link: "/studanky",
    icon: "fas fa-tint",
    countLabel: "objektů",
  },
  {
    id: 4,
    name: "Vyprávění",
    key: "vypraveni",
    link: "/vypraveni",
    icon: "fas fa-book-open",
    countLabel: "článků",
  },
  {
    id: 5,
    name: "Cesty",
    key: "cesty",
    link: "/cesty",
    icon: "fas fa-route",
    countLabel: "cest",
  },
  {
    id: 6,
    name: "Naposled přidané",
    key: "novePridane",
    link: "/novepridane",
    icon: "fas fa-clock",
    countLabel: "nových",
  },
];

onMounted(async () => {
  await fetchAllCounts();
});
</script>

<style scoped>
.categories-section {
  padding: 100px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  min-height: 50vh;
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
  font-family: "Raleway", sans-serif;
  letter-spacing: -1px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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
  display: flex;
  flex-direction: column;
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
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon {
  transform: scale(1.1) rotate(5deg);
}

.category-icon i {
  font-size: 28px;
  color: white;
}

.category-title {
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 10px 0;
  font-family: "Raleway", sans-serif;
}

.category-count {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 20px 0;
  font-weight: 500;
}

.category-count-loader {
  height: 20px;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid #e2e8f0;
  border-top-color: #4c6793;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
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
  transform: translateX(5px);
}

.category-card:hover .category-arrow i {
  color: white;
}

.category-arrow i {
  font-size: 16px;
  color: #4c6793;
  transition: color 0.3s ease;
}

/* Responsive Design */
@media (max-width: 900px) {
  .categories-section {
    padding: 60px 20px;
  }

  .section-title {
    font-size: 36px;
    margin-bottom: 40px;
  }

  .categories-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
}

@media (max-width: 600px) {
  .categories-section {
    padding: 40px 15px;
  }

  .section-title {
    font-size: 28px;
  }

  .categories-grid {
    grid-template-columns: 1fr;
  }

  .category-card {
    padding: 30px 25px;
  }
}
</style>

