<template>
  <div>
    <Loader v-if="loading" />
    <div class="abecedniSeznam" :style="cssVars">
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

// Constants
const ITEM_HEIGHT = 35;
const BACKGROUND_COLORS = {
  krize: "#e9f4f5",
  studanky: "#ebf1f0",
  default: "#e7e0d0",
};

const COLUMNS = {
  ipad: 2,
  smallDesktop: 3,
  bigDesktop: 4,
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

const cssVars = computed(() => {
  const { length } = seznam.value;
  return {
    "--columnHeightIpad":
      Math.ceil(length / COLUMNS.ipad) * ITEM_HEIGHT + "px",
    "--columnHeightSmallD":
      Math.ceil(length / COLUMNS.smallDesktop) * ITEM_HEIGHT + "px",
    "--columnHeightBigD":
      Math.ceil(length / COLUMNS.bigDesktop) * ITEM_HEIGHT + "px",
  };
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
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: var(--columnHeightBigD);
  max-width: 100%;
  width: 100%;
  gap: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.kontejnerJmeno {
  flex-basis: auto;
  flex-shrink: 1;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  margin: 0;
  background: var(--bg-primary);
  width: calc(25% - 6px);
  min-width: 0;
  max-width: calc(25% - 6px);
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
    max-height: var(--columnHeightSmallD);
  }

  .kontejnerJmeno {
    width: calc(33.333% - 5.33px);
    max-width: calc(33.333% - 5.33px);
  }
}

@media (max-width: 850px) {
  .abecedniSeznam {
    max-height: var(--columnHeightIpad);
  }

  .kontejnerJmeno {
    width: calc(50% - 4px);
    max-width: calc(50% - 4px);
  }
}

@media (max-width: 700px) {
  .abecedniSeznam {
    grid-row: 4/5;
    grid-column: 1/7;
    align-items: center;
    flex-wrap: nowrap;
    max-width: 100vw;
    max-height: unset;
  }

  .kontejnerJmeno {
    max-width: unset;
    width: 100%;
  }
}
</style>
