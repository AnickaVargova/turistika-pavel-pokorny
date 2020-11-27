<template>
  <div id="pomnicky">
    <div id="pozadi1">
      <img
        v-bind:src="require(`./../assets/${params.background}`)"
        v-bind:alt="`${params.backgroundDescription}`"
      />
    </div>
    <div id="transbox1"></div>
    <h1>{{ params.nadpis }}</h1>

    <AbecedniSeznam
      v-if="params.stranka === 'pomnicky' && seznamUkazat"
      v-bind:clanky="clanky"
      v-bind:stranka="params.stranka"
      id="abecedniSeznam"
    />

    <p
      v-bind:class="{
        pomnickyText: true,
        responsive: menuUkazat || seznamUkazat,
        large: params.stranka === 'vypraveni' || params.stranka === 'cesty',
      }"
    >
      {{ params.uvodniText }}
    </p>

    <div class="pomnickyNavigace">
      <router-link
        to="/"
        v-bind:class="{
          domu: true,
          pomnicekKategorie: true,
          kategorieTextCenter:
            params.stranka === 'cesty' || params.stranka === 'vypraveni',
        }"
      >
        Domů
      </router-link>
      <router-link  v-bind:to="`/${params.stranka}`"
        
          class="pomnicekKategorie domu"
          id="seznam"
          
          v-if="params.stranka === 'pomnicky'"
        ><div  v-on:click="toggleSeznam">
          Abecední seznam
        </div>
      </router-link>
      <div
        class="pomnicekKategorie ukazMenu"
        v-on:click="toggleMenu"
        v-if="params.stranka === 'pomnicky' || params.stranka === 'smircikrize'"
      >
        Řazení podle skupin
      </div>

      <div
        v-if="
          (params.stranka === 'pomnicky' || params.stranka === 'smircikrize') &&
            innerWidth >= 600
        "
      >
        <div
          v-for="kategorie in params.kategoriePomnicky"
          v-bind:key="kategorie.id"
          v-on:click="handleClick(kategorie)"
        >
          <router-link v-bind:to="`/${params.stranka}/${kategorie.id}`">
            <div
              v-bind:class="{
                pomnicekKategorie: true,
                kategorieTextCenter:
                  params.stranka === 'cesty' || params.stranka === 'vypraveni',
                active: kategorie.id == vybraneId,
                responsive: menuUkazat && !oknoUkazat,
                pomnicekMenu: true,
              }"
            >
              {{ kategorie.nazev }}
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- kategorie menu, neni potomkem navigace - jen pro mobil -->
    <div
      v-if="
        (params.stranka === 'pomnicky' || params.stranka === 'smircikrize') &&
          innerWidth < 600 &&
          menuColumn
      "
      id="kategorieMobil"
    >
      <div
        v-for="kategorie in params.kategoriePomnicky"
        v-bind:key="kategorie.id"
        v-on:click="handleClick(kategorie)"
      >
        <router-link v-bind:to="`/${params.stranka}/${kategorie.id}`">
          <div
            v-bind:class="{
              pomnicekKategorie: true,
              kategorieTextCenter:
                params.stranka === 'cesty' || params.stranka === 'vypraveni',
              active: kategorie.id == vybraneId,
              responsive: menuUkazat && !oknoUkazat,
              pomnicekMenu: true,
            }"
          >
            {{ kategorie.nazev }}
          </div>
        </router-link>
      </div>
    </div>

       <div
      class="kontejner"
      v-if="oknoUkazat && clankyPodKategorie"
      v-bind:class="{
        large: params.stranka === 'vypraveni' || params.stranka === 'cesty',
      }"
    >
      <div v-if="clankyPodKategorie">
        <OknoPomnicky
          v-if="
            params.stranka === 'pomnicky' ||
              params.stranka === 'studanky' ||
              params.stranka === 'smircikrize'
          "
          v-bind:clanky="clankyPodKategorie"
          v-on:kliknuti="vyfiltrujPomnicek"
        />

        <OknoClanky
          v-if="params.stranka === 'cesty' || params.stranka === 'vypraveni'"
          v-bind:clanky="clankyPodKategorie"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  import OknoPomnicky from "./../components/OknoPomnicky.vue";
  import OknoClanky from "./../components/OknoClanky.vue";
  import AbecedniSeznam from "./../components/AbecedniSeznam.vue";
  export default {
    props: ["params"],
    components: {
      OknoPomnicky: OknoPomnicky,
      OknoClanky: OknoClanky,
      AbecedniSeznam: AbecedniSeznam,
    },

    data() {
      return {
        clanky: vsechnyClanky.data,
        clankyPodKategorie: null,
        vybraneId: undefined,
        menuUkazat: false,
        oknoUkazat: false,
        seznamUkazat: false,
        innerWidth: window.innerWidth,
        menuColumn: false,
      };
    },

    methods: {
      vyfiltrujPomnicek(id) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === this.params.stranka && clanek.id === id
        );
      },

      handleClick(kategorie) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === this.params.stranka &&
            clanek.podkategorie == this.$route.params.kategorie
        );
        this.vybraneId = kategorie.id;
        if (this.clankyPodKategorie.length === 0) {
          this.clankyPodKategorie = null;
        }
        this.seradClanky();

        this.oknoUkazat = true;
        this.menuUkazat = false;
        this.seznamUkazat = false;
      },

      seradClanky() {
        for (let clanek of this.clankyPodKategorie) {
          if (!clanek.jmeno) {
            clanek.jmeno = clanek.nazev;
          }
        }

        this.clankyPodKategorie = this.clankyPodKategorie.sort((a, b) => {
          return a.jmeno.localeCompare(b.jmeno, "cs", {
            sensitivity: "accent",
          });
        });
      },

      toggleMenu() {
        if (this.innerWidth > 600) {
          this.menuUkazat = !this.menuUkazat;
          this.oknoUkazat = false;
        } else {
          this.oknoUkazat = false;
          this.menuUkazat = !this.menuUkazat;
          this.seznamUkazat = false;
          this.menuColumn = true;
        }
       
      },

      toggleSeznam() {
        
        if (this.innerWidth > 600) {
          this.oknoUkazat = false;
          this.seznamUkazat = !this.seznamUkazat;
        } else {
          this.oknoUkazat = false;
          this.seznamUkazat = !this.seznamUkazat;
          this.menuUkazat = false;
        }
      },
    },

    created() {
     
      if (this.$route.params.id) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) => clanek.id == this.$route.params.id
        );
      } else if (this.$route.name === "Vypraveni") {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) => clanek.kategorie === "vypraveni"
        );
      } else {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === this.params.stranka &&
            clanek.podkategorie == this.$route.params.kategorie
        );
      }

      this.seradClanky();

      this.vybraneId = this.$route.params.kategorie;
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
  #pomnicky {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    min-height: 100vh;
  }

  .large {
    grid-column: 1/7 !important;
    margin: 30px;
  }

  #pomnicky h1 {
    grid-row: 1/2;
    grid-column: 1/7;
    justify-self: center;
    align-self: center;
    font-size: 40px;
  }

  .pomnickyText {
    grid-row: 2/3;
    grid-column: 2/7;
    margin: 30px;
    margin-bottom: 0;
    text-align: justify;
  }

  @media screen and (max-width: 600px) {
    #pomnicky {
      /* grid-template-rows: repeat(16, 60px); */
      grid-template-rows: auto;
    }
    #pomnicky h1 {
      grid-row: 2/3;
      grid-column: 1/7;
      padding-top: 30px;
      font-size: 30px;
      margin: 0;
      margin-top: 50px;
      padding: 0;
    }

    .pomnickyText {
      grid-row: 3/4;
      grid-column: 1/7;
      font-size: 15px;
      margin-bottom: 0;
      margin-left: 20px;
      margin-right: 20px;
    }
  }

  .pomnickyNavigace {
    grid-column: 1/2;
    grid-row: 1/17;
    margin: 23px;
    display: flex;
    flex-direction: column;
  }

  p.responsive {
    display: none;
  }

  .pomnicekKategorie {
    border: 2px solid black;
    margin: 3px;
    height: 40px;
    font-weight: bold;
    color: black;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    padding: 2%;
    padding-left: 10%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;
    background-color: #6bc5aa;
    font-size: 13px;
    min-width: 95%;
    max-width: 170px;
  }

  .active {
    background-color: #497e6e;
  }

  #kategorieMobil {
    grid-row: 3/4;
    grid-column: 1/2;
    margin-top: 20px;
    min-width: 170px !important;
  }

  @media (max-width: 600px) {
    .pomnickyNavigace {
      flex-direction: row;
      grid-row: 1/2;
      grid-column: 1 / span 5;
      width: 95%;
      margin: 10px 0 0 0;
    }

    .domu,
    #seznam,
    .ukazMenu {
      height: 40px !important;
      flex-basis: 30%;
    }

    #pomnicky .pomnicekKategorie.pomnicekMenu {
      display: none;
    }

    /* #abecedniSeznam {
      display:none;
    } */
  }

  #pomnicky .pomnicekKategorie.responsive {
    display: flex;
  }

  /* @media(max-width: 600px){
    #pomnicky .pomnicekKategorie.responsive {
      display: none;
    }
  } */

  .pomnicekKategorie:hover,
  .domu:hover,
  #seznam:hover {
    color: #13131d;
    background-color: #9aacab;
  }

  .kategorieTextCenter {
    justify-content: center;
    padding-left: 0;
  }

  .domu {
    background-color: rgb(32, 190, 195);
    /* margin-bottom: 20px; */
    min-width: 95%;
    max-width: 170px;
    height: 30px;
  }

  .domu a {
    color: black;
  }

  .ukazMenu {
    display: none;
    grid-column: 5/6;
    grid-row: 1/2;
  }

  #seznam {
    margin-bottom: 20px;
    background-color: rgb(110, 130, 172);
  }

  @media (max-width: 600px) {
    .domu {
      min-width: 70px;
      max-width: 150px;
    }

    .pomnicekKategorie {
      min-width: 70px;
      max-width: 150px;
    }

    #seznam {
      margin-bottom: 0;
    }

    .ukazMenu {
      display: block;
    }
  }

  #pozadi1 {
    grid-column: 1 / 7;
    grid-row-start: 1;
    grid-row-end: 80;
    width: 100vw;
  }
  #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 80;
    width: 100vw;
    background-color: rgba(220, 241, 240, 0.5);
    margin-right: 0;
  }

  @media (max-width: 600px) {
    #pozadi1 {
      height: 250vh;
    }
  }
  #pomnicky .kontejner {
    grid-column: 2/7;
    grid-row: 4/20;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  #oknoPomnicky {
    background-color: white;
    margin: 0;
    padding: 30px;
    border-radius: 10px;
    font-size: 15px;
  }

  @media (max-width: 600px) {
    #pomnicky .kontejner {
      grid-column: 1/7;
      grid-row: 6/20;
      width: 100vw;
      font-size: 15px;
      margin: 0;
      margin-top: 40px;
      padding: 0;
    }

    #pomnicky #oknoPomnicky {
      margin: 0;
      padding: 0;
      border-radius: 0;
      font-size: 15px;
    }
  }
</style>
