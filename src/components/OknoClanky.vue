<template>
  <div>
    <Loader v-if="loading" />

    <div v-if="!loading && mojeClanky.length" id="oknoPomnicky">
      <div
        v-for="(clanek, index) in mojeClanky"
        :key="index"
        class="kontejnerClanek"
      >
        <Zalozka :mujClanek="clanek" :stranka="stranka" />
      </div>
    </div>
  </div>
</template>

<script>
import Zalozka from "./Zalozka.vue";
import Loader from "./Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl } from "../utils/url";

// Route name constants
const CATEGORY_ROUTES = [
  "PomnickyKategorie",
  "SmirciKrizeKategorie",
  "StudankyKategorie",
];

export default {
  props: {
    stranka: {
      type: String,
      required: true,
    },
    zalozky: {
      type: Boolean,
      default: true,
    },
  },
  components: { Zalozka, Loader },
  data() {
    return {
      mojeClanky: [],
      loading: true,
      error: null,
    };
  },

  computed: {
    routeName() {
      return this.$route.name;
    },
  },

  async created() {
    await this.fetchArticles();
  },

  methods: {
    filterTestItems(data) {
      const showTestItems = displayTestItems();
      return data.filter((item) => showTestItems || !item.test);
    },

    restoreScrollPosition() {
      const scrollY = sessionStorage.getItem("scrollY");
      if (scrollY) {
        window.scrollTo(0, Number(scrollY));
        sessionStorage.removeItem("scrollY");
      }
    },

    async fetchArticles() {
      try {
        this.loading = true;
        this.error = null;

        let url;
        let additionalFilter = null;

        if (this.routeName === "NovePridane") {
          url = `${apiUrl}/novePridane/long`;
        } else if (this.routeName === "NovePridaneLong") {
          url = `${apiUrl}/novePridane/long`;
          additionalFilter = (item) =>
            item.kategorie === "vypraveni" || item.kategorie === "cesty";
        } else if (CATEGORY_ROUTES.includes(this.routeName)) {
          url = `${apiUrl}/${this.stranka}/${this.$route.params.kategorie}`;
        } else {
          url = `${apiUrl}/${this.stranka}/1`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();
        let filtered = this.filterTestItems(data);

        if (additionalFilter) {
          filtered = filtered.filter(additionalFilter);
        }

        this.mojeClanky = filtered;

        // Restore scroll position for routes that need it
        if (
          this.routeName === "NovePridane" ||
          CATEGORY_ROUTES.includes(this.routeName) ||
          this.routeName !== "NovePridaneLong"
        ) {
          this.restoreScrollPosition();
        }
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
:root {
  --primary-color: #2563eb;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-accent: #2563eb;
  --bg-primary: #ffffff;
  --bg-hover: #f8fafc;
  --border-color: #e2e8f0;
  --border-radius: 12px;
  --border-radius-sm: 8px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

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
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.clanek h2 {
  grid-row: 1/2;
  grid-column: 1/2;
  margin: 0 0 12px 0;
  color: var(--text-primary);
  font-weight: 700;
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
  .kontejnerClanek {
    border-bottom: 2px solid grey;
  }

  .kontejnerClanek:last-child {
    border-bottom: none;
  }

  .clanek {
    border: none;
    border-radius: 0;
    grid-template-rows: auto;
    grid-template-columns: 3fr 1fr;
    max-width: unset;
    max-height: unset;
    width: 90%;
  }
}

.clanek:hover {
  border-color: var(--primary-color);
  color: var(--text-primary);
  background-color: var(--bg-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.clanek:hover .clanekFoto img {
  transform: scale(1.05);
}
</style>
