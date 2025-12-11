<template>
  <div id="detailClanku">
    <Loader v-if="loading" />
    <div v-else-if="detailClanku" id="detailOkno">
      <router-link to="/" id="tlacitkoDomuDetail" class="commonButton">
        Úvodní strana
      </router-link>
      <span v-if="showNewButton" @click="$router.go(-1)">
        <div class="commonButton zpetNaClanky">Nové</div>
      </span>
      <router-link v-else-if="routeName === 'SmirciKrizeVypraveni'" to="/krize">
        <div class="commonButton zpetNaClanky">Zpět na smírčí kříže</div>
      </router-link>
      <router-link v-else-if="routeName === 'DetailVypraveni'" to="/vypraveni">
        <div class="commonButton zpetNaClanky">Zpět na články</div>
      </router-link>
      <router-link v-else-if="routeName === 'DetailCesty'" to="/cesty">
        <div class="commonButton zpetNaClanky">Zpět na články</div>
      </router-link>
      <span v-else @click="$router.go(-1)">
        <div class="commonButton zpetNaClanky">Zpět na články</div>
      </span>
      <div class="commonButton tlacitkoNahoruDetail" @click="goToTop">
        Nahoru
      </div>
      <h1>{{ detailClanku.nazev }}</h1>
      <div class="smallZalozkaTop">
        <div
          v-for="zalozka in detailClanku.zalozky"
          :key="zalozka.paragraphId"
          @click="goToParagraph"
        >
          <SmallZalozka v-if="zalozka.text.length" :zalozka="zalozka" />
        </div>
      </div>
      <h3>{{ detailClanku.datum }}</h3>

      <div id="textClanku">
        <div
          v-for="(odstavec, index) in detailClanku.text"
          :key="index"
          class="odstavec"
          :id="String(odstavec.id)"
        >
          <router-link
            v-if="odstavec.foto && detailClanku.kategorie === 'vypraveni'"
            :to="`/fotodetail/${detailClanku.kategorie}/${
              detailClanku.id
            }/${odstavec.foto.trim()}`"
          >
            <figure
              id="fotoText"
              :class="{
                vpravo: odstavec.umisteniFoto.trim() === 'vpravo',
                vlevo: odstavec.umisteniFoto.trim() === 'vlevo',
                nahore: index === 0,
              }"
            >
              <img
                :src="`${apiUrl}/photos/small/${odstavec.foto.trim()}`"
                :alt="detailClanku.nazev"
                loading="lazy"
              />
            </figure>
          </router-link>
          <p>
            <span v-html="odstavec.textOdstavce" />
            <span v-if="odstavec.vnitrniOdkazy">
              <Klikaci :clanek="odstavec" kdeJsem="odstavec" />
            </span>
          </p>

          <router-link
            v-if="detailClanku.kategorie === 'cesty' && odstavec.foto"
            :to="getCestyPhotoLink(odstavec)"
          >
            <figure
              v-if="shouldShowCestyPhoto(odstavec)"
              :class="{
                figCesty: true,
                naVysku: odstavec.naVysku,
              }"
              :style="{ textAlign: 'center' }"
            >
              <img
                :src="`${apiUrl}/photos/medium/${odstavec.foto.trim()}`"
                :alt="detailClanku.nazev"
                class="fotoCesty"
                loading="lazy"
              />
              <figcaption>{{ odstavec.popisek }}</figcaption>
            </figure>
          </router-link>
          <div id="mapa">
            <iframe
              v-if="odstavec.odkazMapa"
              :src="odstavec.odkazMapa.trim()"
              frameborder="0"
            ></iframe>
          </div>
        </div>
      </div>

      <div v-if="showGallery" id="galerieClanek">
        <div
          v-for="(obrazek, index) in detailClanku.galerie"
          :key="index"
          class="obrazek"
        >
          <router-link
            :to="`/fotodetail/${detailClanku.kategorie}/galerie/${
              detailClanku.id
            }/${obrazek.fotka.trim()}`"
          >
            <figure>
              <img
                :src="`${apiUrl}/photos/small/${obrazek.fotka.trim()}`"
                :srcset="`${apiUrl}/photos/small/${obrazek.fotka.trim()} 300w, ${apiUrl}/photos/medium/${obrazek.fotka.trim()} 600w`"
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                :alt="obrazek.popisek"
                loading="lazy"
              />
            </figure>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import Klikaci from "./../components/Klikaci.vue";
import Loader from "../components/Loader.vue";
import SmallZalozka from "../components/SmallZalozka.vue";
import { useArticles } from "../composables/useArticles";
import { useScrollPosition } from "../composables/useScrollPosition";
import { VYPRAVENI_ROUTES, CESTY_ROUTES } from "../router/constants";
import { apiUrl } from "../utils/url";

const route = useRoute();
const { article: detailClanku, loading, error, fetchArticles } = useArticles();
const { scrollToParagraph, scrollToTop } = useScrollPosition();

const innerWidth = ref(window.innerWidth);

const routeName = computed(() => route.name);

const showNewButton = computed(() => {
  return routeName.value === "NoveVypraveni" || routeName.value === "NovaCesta";
});

const showGallery = computed(() => {
  return (
    detailClanku.value?.galerie && detailClanku.value.kategorie !== "cesty"
  );
});

const goToTop = () => {
  scrollToTop();
};

const goToParagraph = () => {
  scrollToParagraph();
};

const getCestyPhotoLink = (odstavec) => {
  if (innerWidth.value < 600) {
    return `/fotodetail/${detailClanku.value.kategorie}/${
      detailClanku.value.id
    }/${odstavec.foto.trim()}`;
  }
  return "";
};

const shouldShowCestyPhoto = (odstavec) => {
  return odstavec.foto && !odstavec.textOdstavce && !odstavec.vnitrniOdkazy;
};

onMounted(async () => {
  let endpoint;

  if (VYPRAVENI_ROUTES.includes(routeName.value)) {
    endpoint = `/vypraveni/1/${route.params.id}`;
  } else if (CESTY_ROUTES.includes(routeName.value)) {
    endpoint = `/cesty/1/${route.params.id}`;
  } else {
    loading.value = false;
    return;
  }

  await fetchArticles(endpoint, { isSingleItem: true });

  if (
    VYPRAVENI_ROUTES.includes(routeName.value) ||
    CESTY_ROUTES.includes(routeName.value)
  ) {
    // Small delay to ensure DOM is ready
    await nextTick();
    if (sessionStorage.getItem("paragraphId")) {
      goToParagraph();
    } else {
      scrollToTop(false);
    }
  }
});
</script>

<style>
iframe {
  width: 100%;
  height: 700px;
  border: none;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-md);
}

@media (max-width: 600px) {
  iframe {
    height: 400px;
  }
}

#detailClanku {
  background: linear-gradient(135deg, #b9cbe5 0%, #809dcf 100%);
  background-image: none;
  padding: 2%;
  min-height: 100vh;
}

#detailClanku .commonButton {
  margin: 4px;
  height: 38px;
  font-weight: 600;
  color: var(--button-text-color);
  border-radius: var(--border-radius-sm);
  display: flex;
  justify-content: flex-start;
  padding: 8px 14px;
  align-items: center;
  text-transform: uppercase;
  font-size: 13px;
  letter-spacing: 0.5px;
  max-width: 170px;
  font-family: "Raleway", sans-serif;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  transition: var(--transition);
  cursor: pointer;
  min-width: unset;
}

#detailClanku .commonButton:hover {
  color: var(--button-text-hover);
  background: linear-gradient(135deg, #4c5e96f2 0%, #3355a6 100%);
}

#detailOkno {
  margin: auto;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 2% 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  max-width: 800px;
  background-color: var(--bg-primary);
  box-shadow: var(--shadow-lg);
}

.tlacitkoNahoruDetail {
  grid-row: 1/2;
  grid-column: 3/4;
  position: sticky;
  top: 0;
  margin-top: 3px;
  right: 0;
  min-width: unset;
  max-width: unset;
  width: 116px;
  padding: 0 14px;
  height: 38px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  justify-self: flex-end;
  align-self: start;
  transition: var(--transition);
  z-index: 100;
}

#tlacitkoDomuDetail {
  grid-column: 3/4;
  grid-row: 2/3;
  min-width: unset;
  max-width: unset;
  width: 116px !important;
  padding: 0 14px;
  height: 38px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  justify-self: flex-end;
  transition: var(--transition);
}

.smallZalozkaTop {
  display: flex;
  flex-wrap: wrap;
  grid-row: 4;
  grid-column: 1/5;
  padding: 15px 0;
}

@media (max-width: 600px) {
  #detailOkno {
    border: none;
  }

  #detailClanku {
    padding: 0;
  }

  #detailOkno p {
    font-size: 15px;
  }

  .tlacitkoNahoruDetail {
    width: 60px !important;
  }

  #tlacitkoDomuDetail {
    width: 60px !important;
  }
}

.zpetNaClanky {
  width: 50%;
  min-width: 80px;
  padding: 10px 14px;
  height: auto;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  transition: var(--transition);
}

#detailClanku h1 {
  grid-column: 1 / 4;
  margin-top: 40px;
  color: var(--text-primary);
  font-weight: 500;
  font-size: 35px;
  letter-spacing: -0.5px;
}

#detailClanku h3 {
  grid-column: 1 / 4;
  color: var(--text-secondary);
  font-weight: 500;
}

#fotoText {
  height: 200px;
  width: min-content;
}

@media (max-width: 600px) {
  .zpetNaClanky {
    width: 60px;
    min-width: 110px;
  }
}

.vpravo {
  float: right;
  margin-right: 0;
  margin-bottom: 20px;
  margin-top: 16px;
  margin-left: 30px;
}

.vlevo {
  float: left;
  margin-right: 30px;
  margin-bottom: 20px;
  margin-top: 16px;
  margin-left: 0;
}

@media (max-width: 600px) {
  .vlevo {
    float: none;
    margin: auto;
  }

  .vpravo {
    float: none;
    margin: auto;
  }
}

.nahore {
  margin-top: 0;
}

#textClanku {
  grid-column: 1 / span 3;
  margin-bottom: 20px;
  text-align: justify;
  line-height: 1.7;
  color: var(--text-secondary);
}

#textClanku p {
  margin-bottom: 16px;
}

.figCesty {
  margin: auto;
  margin-bottom: 10px;
}

.figCesty img {
  width: 100% !important;
  object-fit: cover;
}

.naVysku {
  width: 50%;
  margin: 10px auto;
}

#fotoText img {
  width: unset;
  height: 100%;
  object-fit: cover;
}

figcaption {
  font-style: italic;
  font-size: 14px;
  text-decoration: none;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-top: 8px;
}

@media (max-width: 600px) {
  figcaption {
    font-size: 12px;
  }
}

a {
  text-decoration: none;
}

.obrazek {
  flex-basis: 25%;
}

.obrazek figure {
  height: 200px;
  width: min-content;
  object-fit: cover;
  margin-left: 0;
  margin-bottom: 60px;
  transition: var(--transition);
}

.obrazek figure:hover {
  transform: translateY(-4px);
}

#detailClanku img {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  width: unset;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

#detailClanku img:hover,
#detailClanku img:active {
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
  transform: scale(1.02);
}

.fotoCesty:hover {
  border-color: var(--primary-color) !important;
  box-shadow: var(--shadow-md) !important;
}

#galerieClanek {
  grid-column: 1 / span3;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

#detailClanku #mapa {
  text-align: center;
}

@media (max-width: 400px) {
  #galerieClanek {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  #obrazek {
    flex-basis: unset;
  }

  .fotoCesty {
    max-width: 90vw;
    margin: auto;
  }

  #fotoText {
    max-width: 90vw;
  }

  .naVysku,
  .naSirku {
    max-width: 90vw;
  }

  .naVysku {
    margin: 0 auto !important;
  }
}
</style>
