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
          <tbody>
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
                clanek.kategorie === 'pomnicky' ||
                clanek.kategorie === 'studanky'
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
                clanek.kategorie === 'pomnicky' ||
                clanek.kategorie === 'studanky'
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
                    <a :href="odkaz.adresa" target="_blank">{{
                      odkaz.nazev
                    }}</a>
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
                clanek.kategorie === 'pomnicky' ||
                clanek.kategorie === 'studanky'
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
          </tbody>
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

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute } from "vue-router";
import Klikaci from "./Klikaci.vue";
import Loader from "./Loader.vue";
import { useArticles } from "../composables/useArticles";
import { useScrollPosition } from "../composables/useScrollPosition";
import { DETAIL_ROUTES, LONG_CATEGORY_ROUTES } from "../router/constants";
import { apiUrl } from "../utils/url";

const props = defineProps({
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
});

const route = useRoute();
const { articles, article, loading, error, fetchArticles, filterSingleItem } =
  useArticles();
const { restoreScrollPosition, scrollToTop } = useScrollPosition();

const idMapaUkazat = ref(undefined);
const isEdgeChromium = ref(false);

const routeName = computed(() => route.name);

// Combine single article and articles array into one array for display
const mojeClanky = computed(() => {
  if (article.value) {
    return [article.value];
  }
  return articles.value || [];
});

const showContent = computed(() => {
  return (
    !loading.value &&
    mojeClanky.value.length &&
    (DETAIL_ROUTES.includes(routeName.value) ||
      LONG_CATEGORY_ROUTES.includes(routeName.value) ||
      routeName.value === "NovePridane" ||
      routeName.value === "NovePridaneLong" ||
      !props.zalozky)
  );
});

const mapButtonStyle = computed(() => ({
  padding: "2%",
  height: "40px",
  paddingLeft: "10%",
}));

const getCleanJmeno = (jmeno) => {
  if (!jmeno) return "";
  const index = jmeno.indexOf("<");
  return index < 0 ? jmeno : jmeno.slice(0, index);
};

const getArticleTitle = (clanek) => {
  const title = clanek.nazev || getCleanJmeno(clanek.jmeno);
  const suffix =
    clanek.kategorie === "krize" && routeName.value === "NovePridane"
      ? "  (smírčí kříž)"
      : "";
  return title + suffix;
};

const getDruhLabel = (clanek) => {
  return clanek.kategorie === "pomnicky" ? "Druh:" : "Umístění:";
};

const getKdyVzniklLabel = (clanek) => {
  return clanek.kategorie === "pomnicky" ? "Kdy vznikl?" : "Kdy vznikla?";
};

const hasInternalLink = (clanek, location) => {
  return (
    clanek.vnitrniOdkazy &&
    clanek.vnitrniOdkazy.length > 0 &&
    clanek.vnitrniOdkazy.some((odkaz) => odkaz.odkazKde?.trim() === location)
  );
};

const ukazMapu = (id) => {
  idMapaUkazat.value = id;
};

const schovejMapu = () => {
  idMapaUkazat.value = undefined;
};

const detectEdgeChromium = () => {
  const isChrome =
    !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
  return isChrome && navigator.userAgent.indexOf("Edg") !== -1;
};

const fetchData = async () => {
  let endpoint;
  let isSingleItem = false;

  if (DETAIL_ROUTES.includes(routeName.value)) {
    endpoint = `/${props.stranka}/${route.params.kategorie}/${route.params.id}`;
    isSingleItem = true;
  } else if (LONG_CATEGORY_ROUTES.includes(routeName.value)) {
    endpoint = `/${props.stranka}/${route.params.kategorie}`;
  } else if (routeName.value === "NovePridaneLong") {
    endpoint = "/novePridane/long";
  } else {
    return; // No fetch needed for other routes
  }

  const additionalFilter =
    routeName.value === "NovePridaneLong"
      ? (item) => item.kategorie !== "vypraveni" && item.kategorie !== "cesty"
      : null;

  await fetchArticles(endpoint, { isSingleItem, additionalFilter });

  // Restore scroll position for routes that need it
};

onMounted(async () => {
  isEdgeChromium.value = detectEdgeChromium();
  await fetchData();
  if (
    LONG_CATEGORY_ROUTES.includes(routeName.value) ||
    routeName.value === "NovePridaneLong" ||
    routeName.value === "NovePridane"
  ) {
    restoreScrollPosition();
  }

  if (DETAIL_ROUTES.includes(routeName.value)) {
    scrollToTop(false);
  }
});

// Watch for route changes to refetch data
watch(
  () => route.params,
  async () => {
    await fetchData();
  },
  { deep: true }
);
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
  padding: 10px;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

tr {
  height: auto;
  min-height: 30px;
}

td:nth-child(odd) {
  font-weight: 600;
  vertical-align: top;
  width: 15%;
  color: var(--text-secondary);
  padding: 0 12px 0 0;
}

td:nth-child(2) {
  text-align: justify;
  padding: 0 12px;
  color: var(--text-secondary);
  line-height: 1.4;
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
  border: 2px solid var(--primary-color);
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
  border-color: var(--secondary-color);
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
