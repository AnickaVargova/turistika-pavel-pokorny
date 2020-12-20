<template>
  <div id="pomnicky">
    <div id="pozadi1">
      <img
        v-bind:src="require(`./../assets/${innerParams.background}`)"
        v-bind:alt="`${innerParams.backgroundDescription}`"
      />
    </div>
    <div
      v-if="innerParams.transbox"
      v-bind:style="{ backgroundColor: innerParams.transbox }"
      id="transbox1"
    ></div>
    <div v-else id="transbox1"></div>
    <h1>
      <a name="top"></a>

      {{ innerParams.nadpis }}
    </h1>

    <AbecedniSeznam
      v-if="
        (innerParams.stranka === 'pomnicky' ||
          innerParams.stranka === 'smircikrize') &&
          seznamUkazat &&
          !innerParams.detail &&
          !this.$route.params.kategorie
      "
      v-bind:clanky="clanky"
      v-bind:stranka="innerParams.stranka"
      id="abecedniSeznam"
    />

    <div
      v-if="innerWidth > 600 || (innerWidth <= 600 && !menuUkazat)"
      v-bind:class="{
        pomnickyText: true,
        large:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty',
      }"
    >
      <p
        v-for="(odstavec, index) in innerParams.uvodniText"
        v-bind:key="index"
        v-html="odstavec"
      >
        {{ odstavec }}
      </p>
    </div>

    <router-link to="/" id="tlacitkoDomu" class="pomnicekKategorie">
      Úvodní strana
    </router-link>

    <a href="#top" id="odkazNahoru">
      <button id="tlacitkoNahoru" class="pomnicekKategorie">Nahoru</button>
    </a>

    <div class="pomnickyNavigace">
      <div
        v-on:click="toggleSeznam"
        class="pomnicekKategorie domu"
        id="seznam"
        v-if="
          innerParams.stranka === 'pomnicky' ||
            innerParams.stranka === 'smircikrize'
        "
      >
        <router-link v-bind:to="`/${innerParams.stranka}`">
          Abecední seznam
        </router-link>
      </div>
      <div
        v-bind:class="{
          pomnicekKategorie: true,
          ukazMenu: true,
          hneda: innerParams.stranka === 'pomnicky',
          tyrkys: innerParams.stranka === 'smircikrize',
        }"
        v-on:click="toggleMenu"
        v-if="
          innerParams.stranka === 'pomnicky' ||
            innerParams.stranka === 'smircikrize'
        "
      >
        Řazení podle skupin
      </div>

      <div
        v-if="
          (innerParams.stranka === 'pomnicky' ||
            innerParams.stranka === 'smircikrize') &&
            innerWidth >= 600
        "
      >
        <div
          v-for="kategorie in innerParams.kategoriePomnicky"
          v-bind:key="kategorie.id"
          v-on:click="handleClick(kategorie)"
        >
          <router-link v-bind:to="`/${innerParams.stranka}/${kategorie.id}`">
            <div
              v-bind:class="{
                tyrkys: innerParams.stranka === 'smircikrize',
                hneda: innerParams.stranka === 'pomnicky',
                pomnicekKategorie: true,
                kategorieTextCenter:
                  innerParams.stranka === 'cesty' ||
                  innerParams.stranka === 'vypraveni',
                active: kategorie.id == vybraneId,
                responsive: menuUkazat && !oknoUkazat,
                pomnicekMenu: true,
              }"
              v-bind:style="{ backgroundColor: innerParams.buttonsColor }"
            >
              {{ kategorie.nazev }} ({{ kategorie.pocet }})
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- kategorie menu, neni potomkem navigace - jen pro mobil -->
    <div
      v-if="
        (innerParams.stranka === 'pomnicky' ||
          innerParams.stranka === 'smircikrize') &&
          innerWidth < 600 &&
          menuColumn
      "
      id="kategorieMobil"
    >
      <div
        v-for="kategorie in innerParams.kategoriePomnicky"
        v-bind:key="kategorie.id"
        v-on:click="handleClick(kategorie)"
      >
        <router-link v-bind:to="`/${innerParams.stranka}/${kategorie.id}`">
          <div
            v-bind:class="{
              pomnicekKategorie: true,
              kategorieTextCenter:
                innerParams.stranka === 'cesty' ||
                innerParams.stranka === 'vypraveni',
              active: kategorie.id == vybraneId,
              responsive: menuUkazat && !oknoUkazat,
              pomnicekMenu: true,
              hneda: innerParams.stranka === 'pomnicky',
              tyrkys: innerParams.stranka === 'smircikrize',
            }"
          >
            {{ kategorie.nazev }} ({{ kategorie.pocet }})
          </div>
        </router-link>
      </div>
    </div>

    <div
      class="kontejner"
      v-if="oknoUkazat && clankyPodKategorie"
      
      v-bind:class="{
        kontejnerBigMargin: innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty',
        kontejnerSmallMargin: innerParams.stranka === 'pomnicky' ||
          innerParams.stranka === 'smircikrize',
        large:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty',
        bezTextu: innerParams.detail,
      }"
    >
      <div v-if="clankyPodKategorie">
        <OknoPomnicky
          v-if="
            innerParams.stranka === 'pomnicky' ||
              innerParams.stranka === 'studanky' ||
              innerParams.stranka === 'smircikrize'
          "
          v-bind:clanky="clankyPodKategorie"
          v-on:kliknuti="vyfiltrujPomnicek"
        />

        <OknoClanky
          v-if="
            innerParams.stranka === 'cesty' ||
              innerParams.stranka === 'vypraveni'
          "
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
    props: ["params", "paramsKrize"],
    components: {
      OknoPomnicky: OknoPomnicky,
      OknoClanky: OknoClanky,
      AbecedniSeznam: AbecedniSeznam,
    },

    data() {
      return {
        innerParams: this.params,
        clanky: vsechnyClanky.data,
        clankyPodKategorie: null,
        vybraneId: undefined,
        menuUkazat: false,
        oknoUkazat: false,
        seznamUkazat: true,
        innerWidth: window.innerWidth,
        menuColumn: false,
      };
    },

    methods: {
      vyfiltrujPomnicek(id) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === this.innerParams.stranka && clanek.id === id
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
        if (this.$route.name === "Vypraveni") {
          this.clankyPodKategorie = this.clankyPodKategorie.sort(
            (a, b) => b.datum.slice(-4) - a.datum.slice(-4)
          );
        } else {
          for (let clanek of this.clankyPodKategorie) {
            if (!clanek.jmeno) {
              clanek.jmeno = clanek.nazev;
            }
          }

          this.clankyPodKategorie = this.clankyPodKategorie.sort((a, b) => {
            return a.jmeno.trim().localeCompare(b.jmeno.trim(), "cs", {
              sensitivity: "accent",
            });
          });
        }
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
      if (this.$route.name === "DetailKrize") {
        this.innerParams = this.paramsKrize;
      }

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
            clanek.kategorie === this.innerParams.stranka &&
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
    grid-template-rows: minmax(min-content, 150px) auto auto auto;
    color: #131e36;
  }

  .large {
    grid-column: 1/7 !important;
    justify-self: center;
    grid-row: 2/3;
    margin: 60px;
    max-width: 900px;
  }

  .bezTextu {
    grid-row: 2/5 !important;
  }

  #pomnicky h1 {
    grid-row: 1/2;
    grid-column: 1/7;
    justify-self: center;
    align-self: center;
    font-size: 40px;
    color: #131e36;
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
      grid-template-rows: minmax(min-content, 150px) minmax(min-content, 50px) auto auto;
    }

    #pomnicky h1 {
      grid-row: 2/3;
      grid-column: 1/7;
      padding-top: 30px;
      font-size: 30px;
      margin: 0;
      /* margin-top: 50px; */
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
    grid-row: 1/5;
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
    height: 35px;
    font-weight: bold;
    color: black;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    padding: 0 2%;
    padding-left: 10%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;

    /* background-color: #38b974;  zelena na krize*/

    /* background-color: #6bc5aa; puvodni*/
    font-size: 13px;
    min-width: 95%;
    max-width: 170px;
  }

  .hneda {
    background-color: #956c4a;
  }

  .tyrkys {
    background-color: #56cdd1;
  }

  .active {
    background-color: #898a8b;
  }

  #kategorieMobil {
    grid-row: 3/4;
    grid-column: 1/4;
    margin-top: 20px;
  }

  #tlacitkoDomu {
    grid-column: 6/7;
    grid-row: 1/2;
    position: fixed;
    top: 20px;
    right: 20px;
    min-width: unset;
    max-width: unset;
    width: 136px !important;
    padding: 0 10px;
    height: 35px;
    background-color: #459ae6;
    /* background-color: rgb(32, 190, 195); */
  }

  #odkazNahoru {
    grid-column: 6/7;
    grid-row: 1/2;
  }

  #tlacitkoNahoru {
    position: fixed;
    top: 60px;
    margin-top: 10px;
    right: 20px;
    min-width: unset;
    max-width: unset;
    width: 160px !important;
    padding: 0 10px;
    height: 35px;
    background-color: #497399;
  }

  #tlacitkoDomu:hover,
  #tlacitkoNahoru:hover {
    background-color: #898a8b;
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
      height: 45px !important;
      flex-basis: 30%;
    }

    #tlacitkoDomu,
    #tlacitkoNahoru {
      height: 45px;
      left: 270px;
      right: unset;
    }

    #tlacitkoDomu {
      top: 10px;
      width: 70px !important;
    }

    #tlacitkoNahoru {
      top: 60px;
      width: 94px !important;
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

  .pomnicekKategorie:hover,
  .domu:hover,
  #seznam:hover {
    color: #13131d;
    background-color: #898a8b;
    /* background-color: #a4a8ac;  */
  }

  .kategorieTextCenter {
    justify-content: center;
    padding-left: 0;
  }

  .domu {
    
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
    background-color: #459ae6;
    /* background-color: rgb(110, 130, 172); */
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
    grid-row-end: 5;
    width: 100vw;
    height: 100%;
  }
  #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 5;
    width: 100vw;
    height: 100%;
    background-color: rgba(204, 175, 127, 0.4);
    margin-right: 0;
  }

  #pomnicky .kontejner {
    grid-column: 2/7;
    grid-row: 3/4;
    /* margin-top: 20px; */
    margin-bottom: 20px;
  }

  .kontejnerBigMargin {
    margin-top: 60px;
  }

  .kontejnerSmallMargin {
    margin-top: 20px;
  }

  #oknoPomnicky {
    background-color: #f5f2ed;
    margin: 0;
    padding: 30px;
    border-radius: 10px;
    font-size: 15px;
  }

  @media (max-width: 600px) {
    #pomnicky .kontejner {
      grid-column: 1/7;
      grid-row: 4/5;
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
