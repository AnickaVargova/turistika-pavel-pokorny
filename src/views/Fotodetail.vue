<template>
  <div>
    <Loader v-if="loading" />
    <div v-if="!loading" id="fotodetail">
      <div v-if="currentIndex > 0" id="arrowLeft" @click="slidePhoto('left')" />
      <figure :class="{ setHeight: !isEdgeChromium, setWidth: isEdgeChromium }">
        <img :src="photoUrl" :alt="routeFilename" />
        <figcaption v-if="vybranaFotka.datum">
          ({{ vybranaFotka.datum }})
        </figcaption>
        <figcaption v-if="vybranaFotka.popisek">
          {{ vybranaFotka.popisek }}
        </figcaption>
      </figure>
      <a @click="$router.go(-1)">
        <button class="commonButton">Zpět</button>
      </a>
      <div v-if="hasNextPhoto" id="arrowRight" @click="slidePhoto('right')" />
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import { apiUrl } from "../utils/url";
import { cachedFetch } from "../utils/apiCache";

const FOTO_ONAS = [
  {
    fotka: "onas1.jpg",
    popisek: "Rumunsko, Trascau  (září 2016)",
  },
  {
    fotka: "onas2.jpg",
    popisek: "Polsko, Czarna Hancza  (červenec 2018)",
  },
];

export default {
  components: { Loader },
  data() {
    return {
      loading: true,
      error: null,
      vybranaFotka: {},
      isEdgeChromium: false,
      apiUrl,
      galerie: [],
      currentIndex: null,
    };
  },

  computed: {
    routeKategorie() {
      return this.$route.params.kategorie;
    },

    routeFilename() {
      return this.$route.params.filename;
    },

    routeId() {
      return this.$route.params.id;
    },

    routeName() {
      return this.$route.name;
    },

    isOnas() {
      return this.routeKategorie === "onas";
    },

    isFromText() {
      return (
        (this.routeKategorie === "vypraveni" ||
          this.routeKategorie === "cesty") &&
        this.routeName !== "FotodetailVypraveniGalerie"
      );
    },

    photoUrl() {
      if (this.isOnas) {
        return new URL(`../assets/${this.vybranaFotka.fotka}`, import.meta.url)
          .href;
      }
      return `${this.apiUrl}/photos/medium/${this.vybranaFotka.fotka?.trim()}`;
    },

    hasNextPhoto() {
      return this.galerie.length > this.currentIndex + 1;
    },
  },

  methods: {
    detectEdgeChromium() {
      const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);
      return isChrome && navigator.userAgent.indexOf("Edg") !== -1;
    },

    slidePhoto(dir) {
      if (dir === "left") {
        this.currentIndex--;
      } else {
        this.currentIndex++;
      }
      this.vybranaFotka = this.galerie[this.currentIndex];
    },

    async fetchPhotoFromText(data) {
      const par = data.text.find(
        (odstavec) =>
          odstavec.foto && odstavec.foto.trim() === this.routeFilename
      );
      if (par) {
        this.vybranaFotka = {
          popisek: par.popisek,
          fotka: par.foto,
        };
      }
    },

    async fetchPhotoFromGallery(data) {
      this.galerie = data.galerie;
      this.currentIndex = data.galerie.findIndex(
        (item) => item.fotka.trim() === this.routeFilename
      );
      if (this.currentIndex >= 0) {
        this.vybranaFotka = data.galerie[this.currentIndex];
      }
    },

    async detailFotky() {
      try {
        this.loading = true;
        this.error = null;

        if (this.isOnas) {
          this.vybranaFotka = FOTO_ONAS.find(
            (item) => item.fotka === this.routeFilename
          );
        } else {
          const url = `${this.apiUrl}/${this.routeKategorie}/${this.routeKategorie}/${this.routeId}`;
          const response = await cachedFetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Failed to fetch photo: ${response.statusText}`);
          }

          const data = await response.json();

          if (this.isFromText) {
            await this.fetchPhotoFromText(data);
          } else {
            await this.fetchPhotoFromGallery(data);
          }
        }
      } catch (error) {
        console.error("Error fetching photo:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },
  },

  async created() {
    this.isEdgeChromium = this.detectEdgeChromium();
    await this.detailFotky();
  },
};
</script>

<style>
#fotodetail {
  padding: 30px;
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  justify-items: center;
  background-color: rgb(230, 236, 243);
  height: 100vh;
}

#fotodetail figure {
  position: relative;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  grid-column: 2/3;
  box-shadow: var(--shadow-lg);
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

#fotodetail figure:hover {
  box-shadow: var(--shadow-lg);
}

#arrowRight {
  grid-column: 3/4;
  grid-row: 1/2;
  transition: var(--transition);
}

#arrowRight::before {
  content: " ";
  border-right: 3px solid var(--primary-color);
  border-top: 3px solid var(--primary-color);
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
  cursor: pointer;
  display: block;
  transition: var(--transition);
}

#arrowRight:hover::before {
  border-color: var(--primary-hover);
  transform: rotate(45deg) scale(1.2);
}

#arrowLeft {
  grid-column: 1/2;
  grid-row: 1/2;
  transition: var(--transition);
}

#arrowLeft::before {
  content: " ";
  border-left: 3px solid var(--primary-color);
  border-bottom: 3px solid var(--primary-color);
  width: 24px;
  height: 24px;
  transform: rotate(45deg);
  cursor: pointer;
  display: block;
  transition: var(--transition);
}

#arrowLeft:hover::before {
  border-color: var(--primary-hover);
  transform: rotate(45deg) scale(1.2);
}

.setHeight img {
  max-height: calc(100vh - 60px);
  height: auto;
}

.setWidth {
  max-width: 70%;
}

#fotodetail img {
  width: 100%;
  height: auto;
  object-fit: contain;
  flex-shrink: 0;
}

#fotodetail figcaption {
  font-size: 15px;
  padding: 12px 16px;
  color: var(--text-secondary);
  font-style: italic;
  background: var(--bg-primary);
  border-top: 1px solid var(--border-color);
  flex-shrink: 0;
  margin-top: 0;
}

#fotodetail button {
  position: fixed;
  right: 30px;
  bottom: 3vh;
  width: 100px;
  justify-content: left;
  padding-left: 30px;
  padding-right: 30px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  transition: var(--transition);
}

#fotodetail .commonButton {
  min-width: 0;
}

@media (max-width: 600px) {
  #fotodetail {
    padding: 10px;
    padding-top: 100px;
    grid-template-columns: 1fr 8fr 1fr;
  }

  #fotodetail figure {
    height: auto;
    margin: 0;
    border: none;
  }
}
</style>
