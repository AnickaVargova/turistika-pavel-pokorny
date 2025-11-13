<template>
  <div>
    <Loader v-if="loading" />

    <div v-if="showContent" id="oknoPomnicky">
      <div
        v-for="clanek in mojeClanky"
        :key="clanek.id"
        :class="{ ramecek: idMapaUkazat !== clanek.id }"
      >
        <h2 style="text-align: center">
          {{ getArticleTitle(clanek) }}
        </h2>

        <table>
          <tr>
            <td>{{ getDruhLabel(clanek) }}</td>
            <td>{{ clanek.druh }}</td>
          </tr>

          <tr>
            <td>Okres:</td>
            <td>{{ clanek.okres }}</td>
          </tr>
          <tr>
            <td>Obec:</td>
            <td>{{ clanek.obec }}</td>
          </tr>

          <tr v-if="clanek.kategorie === 'krize'">
            <td>Číslo v evidenci:</td>
            <td>{{ clanek.cisloEvid }}</td>
          </tr>
          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>Jméno:</td>
            <td>
              <strong>{{ getCleanJmeno(clanek.jmeno) }}</strong>
            </td>
          </tr>

          <tr>
            <td>Kde se nachází?</td>
            <td>
              <span v-html="clanek.popisCesty"></span>
              <Klikaci
                v-if="hasInternalLink(clanek, 'popisCesty')"
                :clanek="clanek"
                kdeJsem="popisCesty"
              />
            </td>
          </tr>

          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>{{ getKdyVzniklLabel(clanek) }}</td>
            <td v-html="clanek.kdyVznikl" />
          </tr>

          <tr>
            <td>Popis:</td>
            <td>
              <span v-html="clanek.popis" />
              <Klikaci
                v-if="hasInternalLink(clanek, 'popis')"
                :clanek="clanek"
                kdeJsem="popis"
              />
            </td>
          </tr>

          <tr>
            <td>Nápis:</td>
            <td>
              <span v-html="clanek.napis" />
              <Klikaci
                v-if="hasInternalLink(clanek, 'napis')"
                :clanek="clanek"
                kdeJsem="napis"
              />
            </td>
          </tr>

          <tr v-if="clanek.kategorie === 'studanky'">
            <td>Využitelnost:</td>
            <td>
              <span v-html="clanek.vyuzitelnost" />
              <Klikaci
                v-if="hasInternalLink(clanek, 'vyuzitelnost')"
                :clanek="clanek"
                kdeJsem="vyuzitelnost"
              />
            </td>
          </tr>

          <tr v-if="clanek.kategorie === 'krize'">
            <td>Pověst:</td>
            <td>
              <span v-html="clanek.povest" />
              <Klikaci
                v-if="hasInternalLink(clanek, 'povest')"
                :clanek="clanek"
                kdeJsem="povest"
              />
            </td>
          </tr>

          <tr>
            <td>Poznámka:</td>
            <td>
              <span v-html="clanek.pozn" />
              <Klikaci
                v-if="hasInternalLink(clanek, 'pozn')"
                :clanek="clanek"
                kdeJsem="pozn"
              />
            </td>
          </tr>

          <tr>
            <td>Galerie:</td>
            <div
              v-if="clanek.galerie"
              id="fotogalerie"
              :class="{ galerieEdge: isEdgeChromium }"
            >
              <div
                v-for="(obrazek, index) in clanek.galerie"
                :key="index"
                class="jednaFotka"
                :class="{ jednaFotkaEdge: isEdgeChromium }"
              >
                <router-link
                  :to="`/fotodetail/${clanek.kategorie}/${
                    clanek.id
                  }/${obrazek.fotka.trim()}`"
                >
                  <img
                    :src="`${apiUrl}/photos/small/${obrazek.fotka.trim()}`"
                    :srcset="`${apiUrl}/photos/small/${obrazek.fotka.trim()} 300w, ${apiUrl}/photos/medium/${obrazek.fotka.trim()} 600w`"
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    alt="Fotodetail"
                    :class="{ imgEdge: isEdgeChromium }"
                    loading="lazy"
                  />
                </router-link>
              </div>
            </div>
          </tr>

          <tr>
            <td>Odkazy:</td>
            <td v-if="clanek.odkazy">
              <p
                v-for="(odkaz, index) in clanek.odkazy"
                :key="index"
                class="odkaz"
              >
                <span v-if="odkaz.adresa">
                  <a :href="odkaz.adresa" target="_blank">{{ odkaz.nazev }}</a>
                </span>
                <span v-else>{{ odkaz.nazev }}</span>
              </p>
            </td>
          </tr>
          <tr>
            <td>Naposled editováno:</td>
            <td>{{ clanek.naposledObnoveno }}</td>
          </tr>
          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>
              <button
                v-if="clanek.odkazMapa && idMapaUkazat !== clanek.id"
                class="commonButton"
                :style="mapButtonStyle"
                @click="ukazMapu(clanek.id)"
              >
                Ukázat na mapě
              </button>
            </td>
          </tr>
        </table>

        <div v-if="idMapaUkazat === clanek.id" id="mapaPomnicky">
          <div style="width: 100%; height: 100%">
            <iframe
              style="border: none"
              :src="clanek.odkazMapa.trim()"
              width="400"
              height="280"
              frameborder="0"
            ></iframe>

            <button class="commonButton" @click="schovejMapu">
              Schovat mapu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Klikaci from "./Klikaci.vue";
import Loader from "./Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl } from "../utils/url";
import { cachedFetch } from "../utils/apiCache";

// Route name constants
const DETAIL_ROUTES = [
  "DetailPomnicku",
  "NovyPomnicek",
  "DetailKrize",
  "NovyKriz",
  "DetailStudanky",
  "NovaStudanka",
];

const LONG_CATEGORY_ROUTES = [
  "PomnickyKategorieLong",
  "SmirciKrizeKategorieLong",
  "StudankyKategorieLong",
];

export default {
  props: {
    kategoriePomnicky: {
      type: Array,
      default: () => [],
    },
    zalozky: {
      type: Boolean,
      default: true,
    },
    stranka: {
      type: String,
      required: true,
    },
  },
  components: { Klikaci, Loader },
  data() {
    return {
      idMapaUkazat: undefined,
      mojeClanky: [],
      isEdgeChromium: false,
      loading: true,
      error: null,
      apiUrl,
    };
  },

  computed: {
    routeName() {
      return this.$route.name;
    },

    showContent() {
      return (
        !this.loading &&
        this.mojeClanky.length &&
        (DETAIL_ROUTES.includes(this.routeName) ||
          this.routeName === "NovePridane" ||
          !this.zalozky)
      );
    },

    mapButtonStyle() {
      return {
        padding: "2%",
        height: "40px",
        paddingLeft: "10%",
      };
    },
  },

  methods: {
    getCleanJmeno(jmeno) {
      if (!jmeno) return "";
      const index = jmeno.indexOf("<");
      return index < 0 ? jmeno : jmeno.slice(0, index);
    },

    getArticleTitle(clanek) {
      const title = clanek.nazev || this.getCleanJmeno(clanek.jmeno);
      const suffix =
        clanek.kategorie === "krize" && this.routeName === "NovePridane"
          ? "  (smírčí kříž)"
          : "";
      return title + suffix;
    },

    getDruhLabel(clanek) {
      return clanek.kategorie === "pomnicky" ? "Druh:" : "Umístění:";
    },

    getKdyVzniklLabel(clanek) {
      return clanek.kategorie === "pomnicky" ? "Kdy vznikl?" : "Kdy vznikla?";
    },

    hasInternalLink(clanek, location) {
      return (
        clanek.vnitrniOdkazy &&
        clanek.vnitrniOdkazy.length > 0 &&
        clanek.vnitrniOdkazy.some(
          (odkaz) => odkaz.odkazKde?.trim() === location
        )
      );
    },

    ukazMapu(id) {
      this.idMapaUkazat = id;
    },

    schovejMapu() {
      this.idMapaUkazat = undefined;
    },

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

    detectEdgeChromium() {
      const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      return isChrome && navigator.userAgent.indexOf("Edg") !== -1;
    },

    async fetchArticles() {
      try {
        this.loading = true;
        this.error = null;

        let url;
        let isSingleItem = false;

        if (DETAIL_ROUTES.includes(this.routeName)) {
          url = `${this.apiUrl}/${this.stranka}/${this.$route.params.kategorie}/${this.$route.params.id}`;
          isSingleItem = true;
        } else if (LONG_CATEGORY_ROUTES.includes(this.routeName)) {
          url = `${this.apiUrl}/${this.stranka}/${this.$route.params.kategorie}`;
        } else if (this.routeName === "NovePridaneLong") {
          url = `${this.apiUrl}/novePridane/long`;
        } else {
          return; // No fetch needed for other routes
        }

        const response = await cachedFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();

        if (isSingleItem) {
          const showTestItems = displayTestItems();
          if (!data.temp && (showTestItems || !data.test)) {
            this.mojeClanky = [data];
          }
        } else {
          let filtered = this.filterTestItems(data);
          if (this.routeName === "NovePridaneLong") {
            filtered = filtered.filter(
              (item) =>
                item.kategorie !== "vypraveni" && item.kategorie !== "cesty"
            );
          }
          this.mojeClanky = filtered;
        }

        // Restore scroll position for routes that need it
        if (
          DETAIL_ROUTES.includes(this.routeName) ||
          LONG_CATEGORY_ROUTES.includes(this.routeName) ||
          this.routeName === "NovePridaneLong"
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

  async created() {
    this.isEdgeChromium = this.detectEdgeChromium();
    await this.fetchArticles();
  },
};
</script>

<style>
#pomnicky h2 {
  text-align: start;
  color: var(--primary-color);
  font-weight: 550;
  font-size: 24px;
  margin-bottom: 20px;
  letter-spacing: -0.5px;
}

#oknoPomnicky button {
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  border: none;
  transition: var(--transition);
}

#oknoPomnicky button:hover {
  box-shadow: var(--shadow-lg);
}

table {
  padding: 20px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

tr {
  height: auto;
  min-height: 40px;
}

td:nth-child(odd) {
  font-weight: 600;
  vertical-align: top;
  width: 15%;
  color: var(--text-primary);
  padding: 12px 16px 12px 0;
}

td:nth-child(2) {
  text-align: justify;
  padding: 12px 16px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.odkaz {
  margin-bottom: 8px !important;
  margin-top: 0 !important;
}

.odkaz a {
  color: var(--link-color) !important;
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  border-bottom: 1px solid transparent;
}

.odkaz a:hover,
.odkaz a:active {
  color: var(--link-hover) !important;
  border-bottom-color: var(--link-hover);
}

#fotogalerie {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 12px;
}

.galerieEdge {
  flex-wrap: wrap;
}

.jednaFotka {
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  height: 150px;
  margin: 0;
  overflow: hidden;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.jednaFotkaEdge {
  width: min-content;
}

.smallPhoto {
  height: 150px;
}

.imgEdge {
  object-fit: cover;
  width: unset;
  height: 100%;
}

.jednaFotka:hover {
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.ramecek {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin: auto;
  margin-top: 16px;
  max-width: 70vw;
  background: var(--bg-primary);
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.ramecek:hover {
  box-shadow: var(--shadow-lg);
}

#mapaPomnicky {
  width: 100%;
  height: 80vh;
  margin: auto;
}

#mapaPomnicky iframe {
  height: 90%;
  width: 100%;
  margin-bottom: 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: var(--transition);
  box-shadow: var(--shadow-md);
}

#mapaPomnicky iframe:hover {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-lg);
}

#mapaPomnicky .commonButton {
  padding-left: 2%;
  margin-bottom: 20px;
  min-width: 0;
}

td .commonButton {
  margin-top: 20px;
  margin-bottom: 20px;
  padding-left: 14px;
  width: 100%;
  height: 100%;
}

@media (max-width: 600px) {
  #oknoPomnicky .ramecek {
    border: none;
    border-bottom: 1px solid grey;
    border-radius: 0;
    margin: 0;
    width: 100vw;
  }

  #oknoPomnicky .ramecek:last-child {
    border-bottom: none;
  }

  #mapaPomnicky {
    width: 100vw;
    height: 90vh;
  }

  #mapaPomnicky iframe {
    border: none;
    border-radius: 0;
  }

  #mapaPomnicky iframe:hover {
    border: none;
  }

  .jednaFotka {
    height: 100px;
  }

  .ramecek {
    max-width: unset;
  }
}
</style>
