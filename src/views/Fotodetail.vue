<template>
  <div id="fotodetail">
    <figure>
      <img
        v-bind:src="require(`./../assets/${vybranaFotka.fotka}`)"
        v-bind:alt="vybranaFotka.popisek"
      />
      <figcaption v-if="vybranaFotka.datum && !vybranaFotka.poznamka">
        ({{ vybranaFotka.datum }})
      </figcaption>
      <figcaption v-else-if="vybranaFotka.datum && vybranaFotka.poznamka">
        ({{ vybranaFotka.datum }})
        <p v-bind:style="{ fontStyle: 'normal' }">{{
          vybranaFotka.poznamka
        }}</p>
      </figcaption>
      <figcaption v-else-if="vybranaFotka.popisek">
        {{ vybranaFotka.popisek }}
      </figcaption>

      <a @click="$router.go(-1)"
        ><button class="pomnicekKategorie">Zpět</button></a
      >
    </figure>
  </div>
</template>

<script>
  import Detail from "./Detail.vue";

  import Clanky from "@/components/clanky.js";
  export default {
    props: ["popisek"],
    data() {
      return {
        vybranaFotka: {},
        vybranyIndex: undefined,
        vybranaKategorie: undefined,
        clanky: Clanky.data,
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
      };
    },

    methods: {
      detailFotky() {
        if (this.$route.params.podkategorie === "onas") {
          for (let item of this.fotoOnas) {
            if (item.fotka == this.$route.params.id) {
              this.vybranaFotka.fotka = item.fotka;
              this.vybranaFotka.popisek = item.popisek;
            }
          }
        } else {
          for (let clanek of this.clanky) {
            if (clanek.fotkaUvod) {
              clanek.galerie.push(clanek.fotkaUvod);
            }
            if (clanek.galerie) {
              for (let obrazek of clanek.galerie) {
                if (obrazek.fotka == this.$route.params.id) {
                  this.vybranaFotka = obrazek;
                  this.vybranyIndex = clanek.id;
                  this.vybranaKategorie = clanek.kategorie;
                }
              }
            }
            if (clanek.fotkaUvod) {
              clanek.galerie.pop();
            }
          }
        }
      },
    },

    created() {
      this.detailFotky();
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
    height: 80vh;
    margin-top: 30px;
    position: relative;
    border: 2px solid grey;
    border-radius: 5px;
  }

  #fotodetail img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #fotodetail figcaption {
    font-size: 15px;
    margin-top: 20px;
   
  }

  #fotodetail button {
    position: absolute;
    right: 0;
    bottom: -60px;
    width: 100px;
    justify-content: left;
    padding-left: 30px;
    padding-right: 30px;
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

    #fotodetail button {
      bottom: -100px;
    }
  }
</style>
