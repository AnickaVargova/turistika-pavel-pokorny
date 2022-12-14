<template>
  <div>
    <Loader v-if="this.loading" />
    <div id="fotodetail" v-if="!this.loading">
      <figure
        v-bind:class="{ setHeight: !isEdgeChromium, setWidth: isEdgeChromium }"
      >
        <img
          v-bind:src="
            this.$route.params.kategorie === 'onas'
              ? require(`./../assets/${this.$route.params.filename}`)
              : `${apiUrl}/photos/${this.$route.params.filename}`
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
      apiUrl
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
              this.vybranaFotka = {
                popisek: data.text.find(
                  (odstavec) => odstavec.foto && odstavec.foto.trim() === this.$route.params.filename
                ).popisek,
              };
            } else {
              this.vybranaFotka = data.galerie.find(
                (item) => item.fotka.trim() === this.$route.params.filename
              );
            }
          })
          .then(() => (this.loading = false));
      }
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
  display: flex;
  justify-content: center;
}

#fotodetail figure {
  /* height: 80vh; */
  margin-top: 30px;
  position: relative;
  border: 2px solid grey;
  border-radius: 5px;
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
  }
}
</style>
