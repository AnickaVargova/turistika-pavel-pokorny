<template>
  <div id="detailClanku">
    <router-link
      v-bind:to="
        `/${detailClanku.kategorie}/${this.$route.params.podkategorie}`
      "
    >
      <div class="pomnicekKategorie" id="zpetNaClanky">
        Zpět na články
      </div>
    </router-link>
    <h1>{{ detailClanku.nadpis }}</h1>
    <h3>{{ detailClanku.datum }}</h3>

    <div id="textClanku">
      <router-link
        v-bind:to="
          `/fotodetail/${detailClanku.podkategorie}/${detailClanku.fotkaUvod.fotka}`
        "
      >
        <figure id="fotoUvod">
          <img
            v-bind:src="require(`./../assets/${detailClanku.fotkaUvod.fotka}`)" v-bind:alt="detailClanku.jmeno"
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
        <router-link
          v-bind:to="
            `/fotodetail/${detailClanku.podkategorie}/${obrazek.fotka}`
          "
        >
          <figure>
            <img v-bind:src="require(`./../assets/${obrazek.fotka}`)" v-bind:alt="obrazek.popisek" />
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
    grid-template-rows: 30px 30px 30px auto repeat(6, 400px);
    gap: 20px;
  }

  @media (max-width: 600px) {
    #detailClanku p {
      font-size: 15px;
    }
  }

  #zpetNaClanky {
    width: 50%;
    min-width: 80px;
    padding: 10px;
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
    min-width: 150px;
    float: left;
    margin-right: 30px;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 0;
  }

  #textClanku {
    grid-column: 1 / span 3;
    grid-row: 3/5;
    margin-bottom: 20px;
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
    flex-basis: 33.33%;
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

  @media (max-width: 600px) {
    #galerieClanek {
      flex-direction: column;
    }
  }
</style>
