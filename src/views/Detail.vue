<template>
  <div id="detailClanku" :style="detailClankuStyle">
    <Loader v-if="loading" />
    <div v-else id="detailOkno">
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
      <div id="tlacitkoNahoruDetail" class="commonButton" @click="goToTop">
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

<script>
import Klikaci from "./../components/Klikaci.vue";
import Loader from "../components/Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl } from "../utils/url";
import SmallZalozka from "../components/SmallZalozka.vue";
import { cachedFetch } from "../utils/apiCache";

const VYPRAVENI_ROUTES = ["DetailVypraveni", "NoveVypraveni"];
const CESTY_ROUTES = ["DetailCesty", "NovaCesta"];

export default {
  components: { Klikaci, Loader, SmallZalozka },
  data() {
    return {
      detailClanku: undefined,
      loading: true,
      error: null,
      apiUrl,
      innerWidth: window.innerWidth,
    };
  },

  computed: {
    routeName() {
      return this.$route.name;
    },

    showNewButton() {
      return (
        this.routeName === "NoveVypraveni" || this.routeName === "NovaCesta"
      );
    },

    showGallery() {
      return (
        this.detailClanku?.galerie && this.detailClanku.kategorie !== "cesty"
      );
    },
  },

  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    goToParagraph() {
      const paragraphId = sessionStorage.getItem("paragraphId");
      if (!paragraphId) return;

      const paragraph = document.getElementById(String(paragraphId));
      if (paragraph) {
        const top = paragraph.getBoundingClientRect().top;
        window.scrollTo({ top: top + window.scrollY, behavior: "smooth" });
      }
      sessionStorage.removeItem("paragraphId");
    },

    restoreScrollPosition() {
      const scrollY = sessionStorage.getItem("scrollY");
      if (scrollY) {
        window.scrollTo(0, Number(scrollY));
        sessionStorage.removeItem("scrollY");
      }
    },

    getCestyPhotoLink(odstavec) {
      if (this.innerWidth < 600) {
        return `/fotodetail/${this.detailClanku.kategorie}/${
          this.detailClanku.id
        }/${odstavec.foto.trim()}`;
      }
      return "";
    },

    shouldShowCestyPhoto(odstavec) {
      return odstavec.foto && !odstavec.textOdstavce && !odstavec.vnitrniOdkazy;
    },

    filterTestItems(data) {
      const showTestItems = displayTestItems();
      return !data.temp && (showTestItems || !data.test);
    },

    async fetchArticle(url) {
      try {
        const response = await cachedFetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        const data = await response.json();
        if (this.filterTestItems(data)) {
          this.detailClanku = data;
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },

  async created() {
    let url;

    if (VYPRAVENI_ROUTES.includes(this.routeName)) {
      url = `${apiUrl}/vypraveni/1/${this.$route.params.id}`;
    } else if (CESTY_ROUTES.includes(this.routeName)) {
      url = `${apiUrl}/cesty/1/${this.$route.params.id}`;
    } else {
      this.loading = false;
      return;
    }

    await this.fetchArticle(url);

    if (VYPRAVENI_ROUTES.includes(this.routeName)) {
      this.restoreScrollPosition();
      // Small delay to ensure DOM is ready
      this.$nextTick(() => {
        if (sessionStorage.getItem("paragraphId")) {
          this.goToParagraph();
        }
      });
    } else if (CESTY_ROUTES.includes(this.routeName)) {
      this.$nextTick(() => {
        this.goToParagraph();
      });
    }
  },
};
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

#tlacitkoNahoruDetail {
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
  border: none;
  justify-self: flex-end;
  align-self: start;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
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
  border: none;
  justify-self: flex-end;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

#tlacitkoDomuDetail:hover,
#tlacitkoNahoruDetail:hover {
  box-shadow: var(--shadow-lg);
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

  #tlacitkoNahoruDetail {
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
  border: none;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

.zpetNaClanky:hover {
  box-shadow: var(--shadow-lg);
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
