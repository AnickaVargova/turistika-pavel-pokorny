<template>
  <div id="fotodetail">
    <figure>
      <img
        v-bind:src="require(`./../assets/${vybranaFotka.fotka}`)"
        v-bind:alt="vybranaFotka.popisek"
      />
      <figcaption>({{ vybranaFotka.datum }})</figcaption>

      <!-- <router-link
        v-if="vybranaKategorie === 'cesty' || vybranaKategorie === 'vypraveni'"
        v-bind:to="`/detail/${this.$route.params.podkategorie}/${vybranyIndex}`"
        ><button class="pomnicekKategorie">Zpět</button></router-link
      > -->
      <!-- <router-link
        v-if="
          vybranaKategorie === 'pomnicky' || vybranaKategorie === 'studanky'
        "
        v-bind:to="`/${vybranaKategorie}/${this.$route.params.podkategorie}`"
        ><button class="pomnicekKategorie">Zpět</button></router-link
      > -->

      <a @click="$router.go(-1)"
        ><button class="pomnicekKategorie">Zpět</button></a
      >

      <!-- <router-link v-if="vybranaKategorie === 'krize'" to="/smirciKrize"
        ><button class="pomnicekKategorie">Zpět</button></router-link
      > -->
    </figure>
  </div>
</template>

<script>
  import Detail from "./Detail.vue";
  import Clanky from "@/components/clanky.js";
  export default {
    data() {
      return {
        vybranaFotka: "",
        vybranyIndex: undefined,
        vybranaKategorie: undefined,
        clanky: Clanky.data,
      };
    },

    methods: {
      detailFotky() {
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
    justify-content: right;
    padding-left: 0;
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
