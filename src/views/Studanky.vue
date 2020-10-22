<template>
  <div id="studanky">
    <div id="pozadi1">
      <img src="./../assets/studanka.jpg" alt="voda" />
    </div>

    <div id="transbox1"></div>

    <h1 v-bind:class="{ responsive: menuUkazat || oknoUkazat }">Studánky</h1>
    <p
      id="studankyText"
      v-bind:class="{ responsive: menuUkazat || oknoUkazat }"
    >
      Tady bude uvodni text. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Dignissimos suscipit fuga natus, delectus autem voluptates?
      Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendis
      officiis, veritatis dolor ipsum impedit laudantium! Nihil?
    </p>

    <div class="pomnickyNavigace">
      <router-link to="/">
        <div class="pomnicekKategorie" id="domu">Domů</div>
      </router-link>

      <div
        v-for="kategorie in kategorieStudanky"
        v-bind:key="kategorie.id"
        v-on:click="handleClick(kategorie.id)"
      >
        <router-link v-bind:to="`/studanky/${kategorie.id}`">
          <div
            v-bind:class="{
              pomnicekKategorie: true,
              active: vybraneId == kategorie.id,
              responsive: menuUkazat && !oknoUkazat,
              pomnicekMenu: true,
            }"
          >
            {{ kategorie.id + ". " + kategorie.nazev }}
          </div>
        </router-link>
      </div>
    </div>

    <a href="javascript:void(0);" class="icon" v-on:click="toggleMenu">
      <i class="fa fa-bars"></i>
    </a>

    <div class="kontejner" v-if="oknoUkazat">
      <div id="oknoPomnicky" v-if="clankyPodKategorie">
        <OknoPomnicky v-bind:clanky="clankyPodKategorie" />
      </div>
    </div>
  </div>
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  import OknoPomnicky from "./../components/OknoPomnicky.vue";
  export default {
    components: {
      OknoPomnicky: OknoPomnicky,
    },

    data() {
      return {
        clanky: vsechnyClanky.data,
        clankyPodKategorie: null,
        vybraneId: undefined,
        kategorieStudanky: [
          { id: 1, nazev: "Brno město" },
          { id: 2, nazev: "Brno venkov" },
          { id: 3, nazev: "Blansko" },
          { id: 4, nazev: "Vyškov" },
          { id: 5, nazev: "Břeclav" },
          { id: 6, nazev: "Znojmo" },
          { id: 7, nazev: "Třebíč" },
          { id: 8, nazev: "Žďár nad Sázavou" },
        ],
        menuUkazat: false,
        oknoUkazat: false,
      };
    },

    methods: {
      handleClick(id) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "studanky" && clanek.podkategorie == id
        );

        this.vybraneId = id;
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
          clanek.kategorie === "studanky" &&
          clanek.podkategorie == this.$route.params.kategorie
      );
      this.vybraneId = this.$route.params.kategorie;
      if (this.clankyPodKategorie.length === 0) {
        this.clankyPodKategorie = null;
        this.oknoUkazat = false;
      }
      else {
      this.oknoUkazat=true;
      }
    },
  };
</script>

<style>
  #studanky {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #studanky h1 {
    grid-row: 1/3;
    grid-column: 3/5;
    justify-self: center;
    align-self: center;
    font-size: 40px;
  }

  #studankyText {
      grid-row: 2/3;
      grid-column: 2/7;
      margin: 40px;
      font-size: 20px;
    }

  @media screen and (max-width: 600px) {
    #studanky h1 {
      grid-row: 3/4;
      grid-column: 1/5;
    }

     #studankyText {
      grid-row: 4/6;
      grid-column: 1/7;
    }
  }

  @media (max-width: 600px) {
    #studanky .pomnicekKategorie.pomnicekMenu {
      display: none;
    }

    #studanky .pomnicekKategorie.responsive {
    display: flex;
  }
  }
  

  #studanky .kontejner {
    grid-column: 2/7;
    grid-row: 1/20;
  }

  #oknoPomnicky {
    background-color: white;
    margin: 30px;
    padding: 30px;
    border-radius: 10px;
    font-size: 20px;
  }

  @media (max-width: 600px) {
    #studanky .kontejner {
      grid-column: 1/7;
      grid-row: 2/20;
      width: 100vw;
      font-size: 15px;
      margin: 0;
      margin-top: 20px;
      padding: 0;
    }

    #studanky #oknoPomnicky {
      margin: 0;
      padding: 0;
      border-radius: 0;
      font-size: 15px;
    }
  }
</style>
