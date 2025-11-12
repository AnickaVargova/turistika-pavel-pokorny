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
.clanek {
  display: grid;
  grid-template-columns: 75% 25%;
  border: 2px solid grey;
  margin: auto;
  margin-bottom: 5px;
  border-radius: 10px;
  padding: 10px;
  max-width: 70vw;
  color: rgb(87, 81, 81);
}

.clanek h2 {
  grid-row: 1/2;
  grid-column: 1/2;
  margin: 15px;
}

.clanek h4 {
  grid-row: 2/3;
  grid-column: 1/2;
  margin-left: 15px;
  margin-top: 5px;
  color: rgb(63, 58, 139);
}

.clanek h3 {
  grid-row: 3/4;
  grid-column: 1/2;
  justify-items: center;
  align-items: center;
  margin: 10px 5px 5px 5px;
  margin-left: 15px;
  display: flex;
}

.clanekFoto {
  grid-row: 1/4;
  grid-column: 2/3;
  width: 100%;
  height: 148px;
  border: 2px solid grey;
  border-radius: 5px;
}

.clanekFoto img {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
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
  border: 2px solid black;
  color: black;
  background-color: whitesmoke;
}
</style>
