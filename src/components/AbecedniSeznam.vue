<template>
  <div>
    <Loader v-if="loading" />
    <div class="abecedniSeznam">
      <router-link
        v-for="clanek in seznam"
        :key="clanek.id"
        :to="getArticleLink(clanek)"
        class="kontejnerJmeno"
        :style="{ backgroundColor: backgroundColor }"
        v-html="clanek.jmeno"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Loader from "./Loader.vue";
import { useArticles } from "../composables/useArticles";
import { removeDuplicates } from "../utils/removeDuplicates";

const BACKGROUND_COLORS = {
  krize: "#e9f4f5",
  studanky: "#ebf1f0",
  default: "#e7e0d0",
};

const props = defineProps({
  stranka: {
    type: String,
    required: true,
  },
});

const { fetchNames, sortAlphabetically, loading, error } = useArticles();
const seznam = ref([]);

const backgroundColor = computed(() => {
  switch (props.stranka) {
    case "krize":
      return BACKGROUND_COLORS.krize;
    case "studanky":
      return BACKGROUND_COLORS.studanky;
    default:
      return BACKGROUND_COLORS.default;
  }
});

const getArticleLink = (clanek) => {
  return `${props.stranka}/${clanek.podkategorie}/${clanek.id}`;
};

const fetchData = async () => {
  const data = await fetchNames(props.stranka);
  const sorted = sortAlphabetically(data);
  seznam.value = removeDuplicates(sorted);
};

onMounted(async () => {
  await fetchData();
});
</script>

<style>
.abecedniSeznam {
  column-count: 4;
  column-gap: 12px;
  width: 100%;
  box-sizing: border-box;
}

.kontejnerJmeno {
  display: block;
  margin-bottom: 8px;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  background: var(--bg-primary);
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  box-sizing: border-box;
  overflow-wrap: break-word;
  word-wrap: break-word;
  overflow: hidden;
}

.kontejnerJmeno:hover {
  color: var(--primary-color);
  background: var(--bg-accent);
  border-color: var(--primary-color);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

@media (max-width: 1200px) {
  .abecedniSeznam {
    column-count: 3;
  }
}

@media (max-width: 850px) {
  .abecedniSeznam {
    column-count: 2;
  }
}

@media (max-width: 700px) {
  .abecedniSeznam {
    column-count: 1;
  }
}
</style>
