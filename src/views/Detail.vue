<template>
  <div id="detailClanku">
    <router-link v-bind:to="`/${detailClanku.kategorie}/${this.$route.params.rok}`">
      <div class="pomnicekKategorie" id="zpetNaClanky">
        Zpět na články
      </div>
    </router-link>
    <h1>{{ detailClanku.nadpis }}</h1>
    <h3>{{ detailClanku.datum }}</h3>

    <!-- <div class="mapouter"><iframe width="300" height="180" id="gmap_canvas" src="https://maps.google.com/maps?q=Javorova%2012%2C%20Brno&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://www.whatismyip-address.com/nordvpn-coupon/"></a></div> -->

    <div id="textClanku">
      <router-link v-bind:to="`/fotodetail/${detailClanku.id}/${detailClanku.fotkaUvod.fotka}`">
        <figure id="fotoUvod">
          <img
            v-bind:src="require(`./../assets/${detailClanku.fotkaUvod.fotka}`)"
          />
          <figcaption>{{ detailClanku.fotkaUvod.popisek }}</figcaption>
        </figure>
      </router-link>
      <p v-for="(odstavec, index) in detailClanku.text" v-bind:key="index">
        {{ odstavec }}
      </p>
    </div>

    <div id="galerieClanek">
      <div
        class="obrazek"
        v-for="(obrazek, index) in detailClanku.galerie"
        v-bind:key="index"
      >
        <router-link v-bind:to="`/fotodetail/${detailClanku.id}/${obrazek.fotka}`">
          <figure>
            <img v-bind:src="require(`./../assets/${obrazek.fotka}`)" />
            <figcaption>{{ obrazek.popisek }}</figcaption>
          </figure>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import Clanky from "@/components/clanky.js";
  export default {
    props: ["vybraneClanky"],
    data() {
      return {
        clanky: Clanky.data,
        clanek: undefined,
        rok: undefined,
      };
    },

    computed: {
      detailClanku() {
        for (let clanek of this.clanky) {
          if (clanek.id == this.$route.params.id) {
            this.clanek = clanek;
            return clanek;
          }
         
        }
      },
    },

  
  };
</script>

<style>
  #detailClanku {
    margin: 3%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 30px 30px 30px auto 400px 400px;
    gap: 20px;
  }

  #zpetNaClanky {
    width: 50%;
   
  }

  #detailClanku h1 {
    grid-column: 2 / 3;
  }

  #detailClanku h3 {
    grid-column: 1 / span 3;
  }

  #fotoUvod {
    height: 200px;
    width: 30%;
    float: left;
    margin-right: 30px;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 0;
  }

  #textClanku {
    grid-column: 1 / span 3;
    grid-row: 4 / span 1;
    margin-bottom: 20px;
  }

  @media (max-width: 700px) {
    #fotoUvod {
      height: 30%;
      width: 100%;
      float: none;
    }
  }

  #fotoUvod img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  figcaption {
    font-style: italic;
    font-size: 15px;
    text-decoration: none;
    color: black;
  }

  a {
    text-decoration: none;
  }

  .obrazek {
    flex-basis: 33.33%
  }

  .obrazek figure {
    width: 90%;
    height: 80%;
    object-fit: cover;
    margin-left: 0;
  }

  
  #detailClanku img {
    border: 2px solid white;
    border-radius: 5px;
  }

  #detailClanku img:hover,
  #detailClanku img:active {
    border: 2px solid black;
  }

  #galerieClanek {
    grid-column: 1 / span3;
    display: flex;
    justify-content: start;
   
  }

  
</style>
