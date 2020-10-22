<template>
  <div>
    <div id="cesty">
      <div id="pozadi1">
        <img src="./../assets/cesty.jpg" alt="hory" />
      </div>

      <div id="transbox1"></div>

      <h1>Cesty</h1>
      <p id="textCesty" v-bind:class="{ responsive: menuUkazat || oknoUkazat }">
        Tady bude uvodni text. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Dignissimos suscipit fuga natus, delectus autem
        voluptates? Consequuntur vitae minus quae dignissimos aspernatur, veniam
        perferendis officiis, veritatis dolor ipsum impedit laudantium! Nihil?
      </p>

      <div id="cestyNavigace">
        <router-link to="/">
          <div class="cestyKategorie" id="domu">Domů</div>
        </router-link>

        <div
          v-for="kategorie in kategorieCesty"
          v-bind:key="kategorie.id"
          v-on:click="handleClick(kategorie.rok)"
        >
          <router-link v-bind:to="`/cesty/${kategorie.rok}`">
            <div
              class="cestyKategorie cestyMenu"
              v-bind:class="{
                active: kategorie.rok == vybranyRok,
                responsive: menuUkazat && !oknoUkazat,
              }"
            >
              {{ kategorie.rok }}
            </div>
          </router-link>
        </div>
      </div>

      <a href="javascript:void(0);" class="icon" v-on:click="toggleMenu">
        <i class="fa fa-bars"></i>
      </a>

      <div class="kontejner" v-if="oknoUkazat">
        <div id="oknoPomnicky" v-if="clankyPodKategorie">
          <OknoClanky v-bind:clanky="clankyPodKategorie" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  import OknoClanky from "./../components/OknoClanky.vue";
  import Detail from "./Detail.vue";
  export default {
    components: {
      OknoClanky: OknoClanky,
      Detail: Detail,
    },

    data() {
      return {
        clanky: vsechnyClanky.data,
        clankyPodKategorie: null,
        vybranyRok: undefined,
        kategorieCesty: [
          { id: 1, rok: 2020 },
          { id: 2, rok: 2019 },
          { id: 3, rok: 2018 },
          { id: 4, rok: 2017 },
          { id: 5, rok: 2016 },
          { id: 6, rok: 2015 },
          { id: 7, rok: 2014 },
          { id: 8, rok: 2013 },
        ],
        menuUkazat: false,
        oknoUkazat: false,
      };
    },

    methods: {
      handleClick(rok) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "cesty" && clanek.datum.slice(-4) == rok
        );

        this.vybranyRok = rok;

        if (this.clankyPodKategorie.length === 0) {
          this.clankyPodKategorie = null;
        }

        this.oknoUkazat = true;
        this.menuUkazat = false;
      },

      toggleMenu() {
        this.menuUkazat = !this.menuUkazat;
        this.oknoUkazat = false;
      },
    },

    created() {
      this.clankyPodKategorie = this.clanky.filter(
        (clanek) =>
          clanek.kategorie === "cesty" &&
          clanek.datum.slice(-4) == this.$route.params.rok
      );
      this.vybranyRok = this.$route.params.rok;

      if (this.clankyPodKategorie.length === 0) {
        this.clankyPodKategorie = null;
        this.oknoUkazat = false;
      } else {
        this.oknoUkazat = true;
      }
    },
  };
</script>

<style>
  #cesty {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #cesty h1 {
    grid-row: 1/3;
    grid-column: 3/5;
    justify-self: center;
    align-self: center;
    font-size: 40px;
  }

  #textCesty {
    grid-row: 2/3;
    grid-column: 2/7;
    margin: 40px;
    font-size: 20p;
  }

  @media screen and (max-width: 600px) {
    #cesty h1 {
      grid-row: 2/3;
      grid-column: 1/7;
      padding-top: 30px;
      font-size: 30px;
      margin: 0;
      padding: 0;
    }

    #textCesty {
      grid-row: 3/6;
      grid-column: 1/7;
      margin-top: 20px;
    }
  }
  #cestyNavigace {
    grid-column: 1/2;
    grid-row: 1/9;
    margin: 23px;
    display: flex;
    flex-direction: column;
  }

  .cestyKategorie {
    flex-basis: 100px;
    border: 2px solid black;
    margin: 3px;
    height: 30px;
    font-weight: bold;
    color: black;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    padding: 2%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;
    background-color: #6bc5aa;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    #cesty .cestyKategorie.cestyMenu {
      display: none;
    }
  }

  #cesty .cestyKategorie.responsive {
    display: flex;
  }

  .cestyKategorie:hover {
    color: #13131d;
    background-color: #9aacab;
  }

  .active {
    background-color: #497e6e;
  }

  /* #domu {
    background-color: mediumturquoise;
    margin-bottom: 20px;
  }

  #domu a {
    background-color: mediumturquoise;
  } */

  #pozadi1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    height: 300vh;
  }
  #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    height: 300vh;
    background-color: rgba(220, 241, 229, 0.6);
    margin-right: 0;
  }

  #cesty .kontejner {
    grid-column: 2/7;
    grid-row: 3/20;
  }

   @media (max-width: 600px) {
    #cesty h1 {
      grid-row:2/3;
    }

   #cesty .kontejner {
      grid-column: 1/7;
      grid-row: 3/20;
      width: 100vw;
      font-size: 15px;
      margin: 0;
      margin-top: 20px;
      padding: 0;
    }

     #cesty #oknoPomnicky {
      margin: 0;
      padding: 0;
      border-radius: 0;
      font-size: 15px;
    }
   }
</style>
