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

<script>
import Loader from "./Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { removeDuplicates } from "../utils/removeDuplicates";
import { apiUrl } from "../utils/url";
import { cachedFetch } from "../utils/apiCache";

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

export default {
  components: { Loader },
  props: {
    stranka: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      seznam: [],
      loading: true,
      error: null,
    };
  },

  computed: {
    backgroundColor() {
      switch (this.stranka) {
        case "krize":
          return BACKGROUND_COLORS.krize;
        case "studanky":
          return BACKGROUND_COLORS.studanky;
        default:
          return BACKGROUND_COLORS.default;
      }
    },

    cssVars() {
      const { length } = this.seznam;
      return {
        "--columnHeightIpad":
          Math.ceil(length / COLUMNS.ipad) * ITEM_HEIGHT + "px",
        "--columnHeightSmallD":
          Math.ceil(length / COLUMNS.smallDesktop) * ITEM_HEIGHT + "px",
        "--columnHeightBigD":
          Math.ceil(length / COLUMNS.bigDesktop) * ITEM_HEIGHT + "px",
      };
    },
  },

  async created() {
    await this.fetchArticles();
  },

  methods: {
    getArticleLink(clanek) {
      return `${this.stranka}/${clanek.podkategorie}/${clanek.id}`;
    },

    filterArticles(data) {
      const showTestItems = displayTestItems();
      return data.filter((item) => !item.temp && (showTestItems || !item.test));
    },

    sortArticles(articles) {
      return [...articles].sort((a, b) => {
        return a.jmeno.trim().localeCompare(b.jmeno.trim(), "cs", {
          sensitivity: "accent",
        });
      });
    },

    async fetchArticles() {
      try {
        this.loading = true;
        this.error = null;

        const response = await cachedFetch(`${apiUrl}/${this.stranka}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();
        const filtered = this.filterArticles(data.names);
        const sorted = this.sortArticles(filtered);
        this.seznam = removeDuplicates(sorted);
      } catch (error) {
        console.error("Error fetching articles:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
.abecedniSeznam {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: var(--columnHeightBigD);
  max-width: 75vw;
  gap: 8px;
}

.kontejnerJmeno {
  flex-basis: auto;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  margin: 0;
  background: var(--bg-primary);
  width: 25%;
  color: var(--primary-color);
  font-weight: 500;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
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
    width: 32%;
  }
}

@media (max-width: 850px) {
  .abecedniSeznam {
    max-height: var(--columnHeightIpad);
  }

  .kontejnerJmeno {
    width: 50%;
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
