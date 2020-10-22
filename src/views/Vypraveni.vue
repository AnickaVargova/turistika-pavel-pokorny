<template>
  <div>
    <div id="pomnicky">
      <div id="pozadi1">
        <img src="./../assets/history.jpg" alt="historické fotografie" />
      </div>

      <div id="transbox1"></div>

      <h1>Vyprávění</h1>
      <p id="textVypraveni">
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
          v-for="kategorie in kategorieVypraveni"
          v-bind:key="kategorie.id"
          v-on:click="handleClick(kategorie.rok)"
        >
          <router-link v-bind:to="`/vypraveni/${kategorie.rok}`">
            <div
              class="cestyKategorie"
              v-bind:class="{ active: kategorie.rok == vybranyRok }"
            >
              {{ kategorie.rok }}
            </div>
          </router-link>
        </div>
      </div>

      <div id="kontejner">
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
        kategorieVypraveni: [
          { id: 1, rok: 2020 },
          { id: 2, rok: 2019 },
          { id: 3, rok: 2018 },
          { id: 4, rok: 2017 },
          { id: 5, rok: 2016 },
          { id: 6, rok: 2015 },
          { id: 7, rok: 2014 },
          { id: 8, rok: 2013 },
        ],
      };
    },

    methods: {
      handleClick(rok) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "vypraveni" && clanek.datum.slice(-4) == rok
        );

        this.vybranyRok=rok;
        if (this.clankyPodKategorie.length === 0) {
          this.clankyPodKategorie = null;
        }
        
      },
    },

    created() {
      this.clankyPodKategorie = this.clanky.filter(
        (clanek) =>
          clanek.kategorie === "vypraveni" &&
          clanek.datum.slice(-4) == this.$route.params.rok
      );
      this.vybranyRok = this.$route.params.rok;
     if(this.clankyPodKategorie.length===0){
       this.clankyPodKategorie=null;
     }
    },
  };
</script>

<style>
  #pomnicky {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  h1 {
    grid-row: 1/3;
    grid-column: 3/5;
    justify-self: center;
    align-self: center;
    font-size: 40px;
  }

  #textVypraveni {
    grid-row: 2/3;
    grid-column: 2/7;
    margin: 40px;
    font-size: 20p;
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

  #kontejner {
    grid-column: 2/7;
    grid-row: 4/20;
  }

  /* #oknoPomnicky {
    background-color: white;
    margin: 30px;
    padding: 30px;
    border-radius: 10px;
    font-size: 20px;
  } */
</style>
