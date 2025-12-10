<template>
  <div>
    <Loader v-if="loading" />

    <div v-if="!loading && mojeClanky.length" id="oknoPomnicky">
      <div v-for="clanek in mojeClanky" :key="clanek.id">
        <Zalozka :mujClanek="clanek" :stranka="stranka" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import Zalozka from "./Zalozka.vue";
import Loader from "./Loader.vue";
import { useArticles } from "../composables/useArticles";
import { useScrollPosition } from "../composables/useScrollPosition";
import { CATEGORY_ROUTES } from "../router/constants";

const props = defineProps({
  stranka: {
    type: String,
    required: true,
  },
  zalozky: {
    type: Boolean,
    default: true,
  },
});

const route = useRoute();
const { articles: mojeClanky, loading, error, fetchArticles } = useArticles();
const { restoreScrollPosition } = useScrollPosition();

const routeName = computed(() => route.name);

const fetchData = async () => {
  let endpoint;
  let additionalFilter = null;

  if (routeName.value === "NovePridane") {
    endpoint = "/novePridane/long";
  } else if (routeName.value === "NovePridaneLong") {
    endpoint = "/novePridane/long";
    additionalFilter = (item) =>
      item.kategorie === "vypraveni" || item.kategorie === "cesty";
  } else if (CATEGORY_ROUTES.includes(routeName.value)) {
    endpoint = `/${props.stranka}/${route.params.kategorie}`;
  } else {
    endpoint = `/${props.stranka}/1`;
  }

  await fetchArticles(endpoint, { additionalFilter });

  // Restore scroll position for routes that need it
  if (
    routeName.value === "NovePridane" ||
    CATEGORY_ROUTES.includes(routeName.value) ||
    routeName.value !== "NovePridaneLong"
  ) {
    restoreScrollPosition();
  }
};

onMounted(async () => {
  await fetchData();
});
</script>

<style>
.clanek {
  display: grid;
  grid-template-columns: 75% 25%;
  border: 1px solid var(--border-color);
  margin: auto;
  margin-bottom: 16px;
  border-radius: var(--border-radius);
  padding: 20px;
  max-width: 70vw;
  color: var(--text-secondary);
  background: var(--bg-primary);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
  width: 100%;
}

.clanek h2 {
  grid-row: 1/2;
  grid-column: 1/2;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-weight: 550;
  font-size: 24px;
  letter-spacing: -0.5px;
}

.clanek h4 {
  grid-row: 2/3;
  grid-column: 1/2;
  margin: 8px 0;
  color: var(--text-accent);
  font-weight: 600;
  font-size: 16px;
}

.clanek h3 {
  grid-row: 3/4;
  grid-column: 1/2;
  justify-items: center;
  align-items: center;
  margin: 8px 0;
  display: flex;
  color: var(--text-secondary);
  font-weight: 500;
}

.clanekFoto {
  grid-row: 1/4;
  grid-column: 2/3;
  width: 100%;
  height: 148px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.clanekFoto img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

@media (max-width: 600px) {
  .clanek {
    grid-template-rows: auto;
    grid-template-columns: 3fr 1fr;
    max-width: unset;
    max-height: unset;
    width: 90%;
    margin: 2px;
    padding: 10px;
    box-shadow: var(--shadow-md);
  }
}

.clanek:hover {
  border-color: var(--primary-color);
  color: var(--text-primary);
  background-color: var(--bg-hover);
  box-shadow: var(--shadow-md);
}

.clanek:hover .clanekFoto img {
  transform: scale(1.05);
}
</style>
