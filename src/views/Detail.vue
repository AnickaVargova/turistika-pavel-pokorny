<template>
  <div
    id="detailClanku"
    v-bind:style="{
      backgroundColor: 'beige',
      backgroundImage: 'none',
      padding: '2%',
    }"
  >
    <div id="detailOkno">
      <router-link v-bind:to="`/${detailClanku.kategorie}`">
        <div class="pomnicekKategorie" id="zpetNaClanky">
          Zpět na články
        </div>
      </router-link>
      <h1>{{ detailClanku.nazev }}</h1>
      <h3>{{ detailClanku.datum }}</h3>

      <div id="textClanku">
        <div
          v-for="(odstavec, index) in detailClanku.text"
          v-bind:key="index"
          class="odstavec"
        >
          <router-link
            v-if="odstavec.foto"
            v-bind:to="
              `/fotodetail/${detailClanku.podkategorie}/${odstavec.foto}`
            "
          >
            <figure
              id="fotoText"
              v-bind:class="{
                vpravo: odstavec.umisteniFoto === 'vpravo',
                vlevo: odstavec.umisteniFoto === 'vlevo',
                nahore: index === 0,
              }"
            >
              <img
                v-bind:src="require(`./../assets/${odstavec.foto}`)"
                v-bind:alt="detailClanku.nazev"
              />
              <figcaption>{{ odstavec.popisek }}</figcaption>
            </figure>
          </router-link>
          <p>
            {{ odstavec.textOdstavce }}
          </p>
        </div>
        <h3 v-if="detailClanku.dodatekNadpis">
          {{ detailClanku.dodatekNadpis }}
        </h3>
        <p v-if="detailClanku.dodatekText">
          {{ detailClanku.dodatekText }}
        </p>
        <p
          v-if="
            detailClanku.vnitrniOdkazy &&
              detailClanku.vnitrniOdkazy[0].odkazKde === 'dodatekText'
          "
        >
          <Klikaci
            v-on:kliknuti="vyfiltrujPomnicek"
            v-bind:clanek="detailClanku"
          />
        </p>
      </div>

      <!-- pri klikacim odkazu uvnitr textu: zeptat se kazdeho odstavce, zda je klikaci pomoci v-if, pokud je, zavola se misto nej komponenta klikaci, do niz se nacpou parametry toho odstavce-->

      <!-- <div id="galerieClanek">
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
              <img
                v-bind:src="require(`./../assets/${obrazek.fotka}`)"
                v-bind:alt="obrazek.popisek"
              />
              <figcaption>{{ obrazek.popisek }}</figcaption>
            </figure>
          </router-link>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
  import Clanky from "@/components/clanky.js";
  import Klikaci from "./../components/Klikaci.vue";
  export default {
    props: ["vybraneClanky"],
    components: { Klikaci: Klikaci },
    data() {
      return {
        clanky: Clanky.data,

        rok: undefined,
        detailClanku: undefined,
      };
    },

    methods: {
      vyfiltrujPomnicek(id) {
        this.$emit("kliknuti", id);
      },
    },

    created() {
      for (let clanek of this.clanky) {
        if (clanek.id == this.$route.params.id) {
          this.detailClanku = clanek;
        }
      }
    },
  };
</script>

<style>
  #detailClanku {
    background-color: beige;
    padding: 2%;
  }

  #detailOkno {
    margin: auto;
    /* margin-top: 20px; */
    border: 2px solid grey;
    border-radius: 10px;
    padding: 2% 5%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* gap: 20px; */
    max-width: 800px;
    background-color: white;
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
  }

  #zpetNaClanky {
    width: 50%;
    min-width: 80px;
    padding: 10px;
    height: auto;
    background-color: #459ae6;
  }

  #zpetNaClanky:hover {
    color: #13131d;
    background-color: #9aacab;
  }

  #detailClanku h1 {
    grid-column: 1 / 4;
    margin-top: 50px;
  }

  #detailClanku h3 {
    grid-column: 1 / 4;
  }

  #fotoText {
    height: 200px;
    max-width: 40%;
    min-width: 150px;
  }

  .vpravo {
    float: right;
    margin-right: 0;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 30px;
  }

  .vlevo {
    float: left;
    margin-right: 30px;
    margin-bottom: 30px;
    margin-top: 16px;
    margin-left: 0;
  }

  .nahore {
    margin-top: 0;
  }

  #textClanku {
    grid-column: 1 / span 3;
    margin-bottom: 20px;
    text-align: justify;
    line-height: 1.5;
  }

  #fotoText img {
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
    border: 2px solid grey;
    border-radius: 5px;
  }

  #detailClanku img:hover,
  #detailClanku img:active {
    border: 2px solid black;
  }

  #galerieClanek {
    grid-column: 1 / span3;
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 600px) {
    #galerieClanek {
      flex-direction: column;
    }
  }
</style>
