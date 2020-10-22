<template>
  <div id="fotodetail">
    <figure>
      <img v-bind:src="require(`./../assets/${vybranaFotka.fotka}`)" />
      <figcaption>{{ vybranaFotka.popisek }}</figcaption>
      <!-- <router-link v-bind:to="`/detail/${vybranyIndex}`"
        ><button>Zpět na článek</button></router-link
      > -->
      <!-- nesmi se davat stejne fotky k ruznym clankum -->
      <router-link
        v-if="vybranaKategorie === 'cesty'"
        v-bind:to="`/detail/${vybranyRok}/${vybranyIndex}`"
        ><button class='pomnicekKategorie'>Zpět</button></router-link
      >
      <router-link
        v-if="vybranaKategorie === 'pomnicky'"
        v-bind:to="`/pomnicky/${this.$route.params.podkategorie}`"
        ><button class='pomnicekKategorie'>Zpět</button></router-link
      >
      <router-link
        v-if="vybranaKategorie === 'studanky'"
        v-bind:to="`/studanky/${this.$route.params.podkategorie}`"
        ><button class='pomnicekKategorie'>Zpět</button></router-link
      >
      <router-link v-if="vybranaKategorie === 'krize'" to="/smirciKrize"
        ><button class='pomnicekKategorie'>Zpět</button></router-link
      >
      <router-link
        v-if="vybranaKategorie === 'vypraveni'"
        v-bind:to="`/detail/${vybranyRok}/${vybranyIndex}`"
        ><button class='pomnicekKategorie'>Zpět</button></router-link
      >
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
        vybranyRok: undefined,
        vybranaKategorie: undefined,
        clanky: Clanky.data,
      };
    },

    methods: {
      detailFotky() {
        
        for (let clanek of this.clanky) {
            if(clanek.fotkaUvod){
              clanek.galerie.push(clanek.fotkaUvod);
            }
            for (let obrazek of clanek.galerie) {
              if (obrazek.fotka == this.$route.params.id) {
                
                this.vybranaFotka = obrazek;
                this.vybranyIndex = clanek.id;
                if(clanek.datum){
                this.vybranyRok = clanek.datum.slice(-4);
                }
                this.vybranaKategorie = clanek.kategorie;
                console.log(this.vybranaKategorie);
              }
            }
            if(clanek.fotkaUvod){
              clanek.galerie.pop();
            }
          }
        }
      },
    
    created() {
      this.detailFotky();
    },
  };
</script>

<style>
  #fotodetail figure {
    width: 80vw;
    height: 90vh;
    margin: auto;
    margin-top: 10px;
    position: relative;
    
  }

  #fotodetail img {
    border: 2px solid grey;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #fotodetail figcaption {
    font-size: 20px;
    margin-top: 10px;
  }

  #fotodetail button {
    /* font-weight: bold;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    color: black;
    padding: 10px;
    margin: 0;
    background-color: lightblue;
    text-transform: uppercase;
    border: 2px solid black; */
    position: absolute;
    bottom: -60px;
    right: 0;
    width: 100px;
   
  }

  #fotodetail button:active,
  #fotodetail button:hover {
    background-color: grey;
  }
</style>
