<template>
  <div>
    <Loader v-if="this.loading" />
    <div id="fotodetail" v-if="!this.loading">
        <div
          v-if="shouldDisplayArrows && currentIndex > 0"
          id="arrowLeft"
          v-on:click="slidePhoto('left')"
        />
      <figure
        v-bind:class="{ setHeight: !isEdgeChromium, setWidth: isEdgeChromium }"
      >
        <img
          v-bind:src="
            this.$route.params.kategorie === 'onas'
              ? require(`./../assets/${vybranaFotka.fotka}`)
              : `${apiUrl}/photos/${vybranaFotka.fotka.trim()}`
          "
          v-bind:alt="`${this.$route.params.filename}`"
        />
        <figcaption v-if="vybranaFotka.datum">
          ({{ vybranaFotka.datum }})
        </figcaption>
        <figcaption v-if="vybranaFotka.popisek">
          {{ vybranaFotka.popisek }}
        </figcaption>
      </figure>
      <a @click="$router.go(-1)"
        ><button class="pomnicekKategorie">Zpět</button></a
      >
        <div
          v-if="shouldDisplayArrows && galerie.length > currentIndex + 1"
          id="arrowRight"
          v-on:click="slidePhoto('right')"
        />
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import { apiUrl } from "../utils/url";

export default {
  components: { Loader },
  data() {
    return {
      loading: true,
      vybranaFotka: {},
      fotoOnas: [
        {
          fotka: "onas1.jpg",
          popisek: "Rumunsko, Trascau  (září 2016)",
        },
        {
          fotka: "onas2.jpg",
          popisek: "Polsko, Czarna Hancza  (červenec 2018)",
        },
      ],
      isEdgeChromium: false,
      apiUrl,
      galerie: [],
      currentIndex: null,
      shouldDisplayArrows: ["pomnicky", "krize", "studanky"].includes(
        this.$route.params.kategorie
      ),
    };
  },

  methods: {
    detailFotky() {
      if (this.$route.params.kategorie === "onas") {
        this.loading = false;
        this.vybranaFotka = this.fotoOnas.find(
          (item) => item.fotka === this.$route.params.filename
        );
      } else {
        // only id is relevant for backend, kategorie is here twice because of format required by backend, podkategorie is not in params
        fetch(
          `${apiUrl}/${this.$route.params.kategorie}/${this.$route.params.kategorie}/${this.$route.params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (this.$route.params.kategorie === "vypraveni") {
              const par = data.text.find(
                (odstavec) =>
                  odstavec.foto &&
                  odstavec.foto.trim() === this.$route.params.filename
              );
              this.vybranaFotka = {
                popisek: par.popisek,
                fotka: par.foto,
              };
            } else {
              this.galerie = data.galerie;
              this.currentIndex = data.galerie.findIndex(
                (item) => item.fotka.trim() === this.$route.params.filename
              );
              this.vybranaFotka = data.galerie[this.currentIndex];
            }
          })
          .then(() => (this.loading = false));
      }
    },
    slidePhoto(dir) {
      this.currentIndex =
        dir === "left" ? --this.currentIndex : ++this.currentIndex;
      this.vybranaFotka = this.galerie[this.currentIndex];
    },
  },

  created() {
    this.detailFotky();
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    this.isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;
  },
};
</script>

<style>
#fotodetail {
  padding: 30px;
  padding-bottom: 60px;
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
  justify-content: center;
  align-items: center;
  justify-items: center;
}

#fotodetail figure {
  margin-top: 30px;
  position: relative;
  border: 2px solid grey;
  border-radius: 5px;
  grid-column: 2/3;
}

#arrowRight {
  grid-column: 3/4;
  grid-row: 1/2;
}

#arrowRight::before {
  content: " ";
  border-right: 2px solid #000;
  border-top: 2px solid #000;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  cursor: pointer;
  display: block;
}

#arrowLeft {
  grid-column: 1/2;
  grid-row: 1/2;
}

#arrowLeft::before {
  content: " ";
  border-left: 2px solid #000;
  border-bottom: 2px solid #000;
  width: 20px;
  height: 20px;
  transform: rotate(45deg);
  cursor: pointer;
  display: block;
}

.setHeight {
  height: 80vh;
}

.setWidth {
  max-width: 70%;
}

#fotodetail img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

#fotodetail figcaption {
  font-size: 15px;
  margin-top: 1vh;
}

#fotodetail button {
  position: absolute;
  right: 30px;
  bottom: 3vh;
  width: 100px;
  justify-content: left;
  padding-left: 30px;
  padding-right: 30px;
  background-color: #459ae6;
}

#fotodetail .pomnicekKategorie {
  min-width: 0;
}
#fotodetail button:active,
#fotodetail button:hover {
  background-color: grey;
}

@media (max-width: 600px) {
  #fotodetail {
    padding-top: 100px;
  }

  #fotodetail figure {
    height: auto;
    margin: 0;
    border: none;
  }
}
</style>
