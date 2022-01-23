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
          innerParams.stranka === 'cesty' ||
          innerParams.stranka === 'novepridane',
      }"
    >
      <!-- <Klikaci v-if="innerParams.vnitrniOdkazy"/> -->

      <div
        id="pomnickyUvod"
        v-for="(odstavec, index) in innerParams.uvodniText"
        v-bind:key="index"
      >
        <p v-if="odstavec.vnitrniOdkazy">
          <Klikaci v-bind:clanek="odstavec" kdeJsem="odstavec" />
        </p>

        <p
          v-html="odstavec.textOdstavce"
          v-else-if="!odstavec.vnitrniOdkazy && odstavec.textOdstavce"
        >
          {{ odstavec.textOdstavce }}
        </p>
      </div>
      <div
        id="rozbalit"
        class="pomnicekKategorie"
        v-if="
          $route.name === 'SmirciKrizeKategorie' ||
            $route.name === 'PomnickyKategorie'
        "
        v-on:click="fullVersionToggler"
      >
        {{ zalozkyUkazat ? "Rozbalit vše" : "Zkrácená verze" }}
      </div>
    </div>
    <!-- <Klikaci v-bind:clanek="odstavec" kdeJsem="odstavec" /> : -->
    <router-link to="/" id="tlacitkoDomu" class="pomnicekKategorie">
      Úvodní strana
    </router-link>

    <a id="tlacitkoNahoru" class="pomnicekKategorie" href="#top">Nahoru </a>

    <div
      class="naNovePridane"
      v-if="
        this.$route.name === 'NovyPomnicek' || this.$route.name === 'NovyKriz'
      "
    >
      <router-link to="/novepridane">
        <div class="pomnicekKategorie zpet" id="zpetNaClanky">
          Naposled přidané
        </div>
      </router-link>
    </div>

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
                active: vybranaId.includes(kategorie.id),
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

              active: vybranaId.includes(kategorie.id),
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
        kontejnerBigMargin:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty',
        kontejnerSmallMargin:
          innerParams.stranka === 'pomnicky' ||
          innerParams.stranka === 'smircikrize',
        large:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty' ||
          innerParams.stranka === 'novepridane',
        bezTextu: innerParams.detail,
      }"
    >
      <div v-if="clankyPodKategorie">
        <OknoClanky
          v-if="
            innerParams.stranka === 'cesty' ||
              innerParams.stranka === 'vypraveni' ||
              (innerParams.stranka === 'pomnicky' &&
                this.$route.name !== 'DetailPomnicku' &&
                this.$route.name !== 'NovyPomnicek') ||
              (innerParams.stranka === 'smircikrize' &&
                this.$route.name !== 'DetailKrize' &&
                this.$route.name !== 'NovyKriz') ||
              innerParams.stranka === 'novepridane'
          "
          v-bind:clanky="clankyPodKategorie"
          v-bind:stranka="innerParams.stranka"
          v-bind:zalozkyButton="zalozkyUkazat"
          v-bind:key="clankyKey"
        />
        <OknoPomnicky
          v-if="
            innerParams.stranka === 'pomnicky' ||
              innerParams.stranka === 'studanky' ||
              innerParams.stranka === 'smircikrize'
          "
          v-bind:clanky="clankyPodKategorie"
          v-bind:kategoriePomnicky="innerParams.kategoriePomnicky"
          v-on:kliknuti="vyfiltrujPomnicek"
          v-bind:zalozkyButton="zalozkyUkazat"
          v-bind:key="pomnickyKey"
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
  import Klikaci from "./../components/Klikaci.vue";
  export default {
    props: ["params", "paramsKrize"],
    components: {
      OknoPomnicky: OknoPomnicky,
      OknoClanky: OknoClanky,
      AbecedniSeznam: AbecedniSeznam,
      Klikaci: Klikaci,
    },

    data() {
      return {
        innerParams: this.params,
        clanky: vsechnyClanky.data,
        clankyPodKategorie: null,
        vybraneId: undefined,
        vybranaId: [Number(this.$route.params.kategorie)],
        menuUkazat: false,
        oknoUkazat: false,
        seznamUkazat: true,
        innerWidth: window.innerWidth,
        menuColumn: false,
        pomnickyUkazat: false,
        clankyUkazat: true,
        zalozkyUkazat: true,
        clankyKey: 0,
        pomnickyKey: 1,
      };
    },

    methods: {
      forceRerender() {
        this.clankyKey += 1;
        this.pomnickyKey += 1;
      },

      getZalozky(pomnicky) {
        return pomnicky.every((pomnicek) => pomnicek.fotkaUvod);
      },
      fullVersionToggler() {
        this.zalozkyUkazat = !this.zalozkyUkazat;
        this.forceRerender();
      },

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
        this.vybranaId.push(kategorie.id);
        if (this.clankyPodKategorie.length === 0) {
          this.clankyPodKategorie = null;
        }
        this.seradClanky();

        this.oknoUkazat = true;
        this.menuUkazat = false;
        this.seznamUkazat = false;
      },

      getDateNumber(formatDatum) {
        let date = formatDatum.trim();
        date = Date.parse(
          date.slice(3, 6).concat(date.slice(0, 3), date.slice(6))
        );
        return date;
      },

      seradClanky() {
        if (this.$route.name === "Vypraveni") {
          this.clankyPodKategorie.sort(
            (a, b) =>
              Number(b.datum.trim().slice(-4)) -
              Number(a.datum.trim().slice(-4))
          );
        } else if (this.$route.name === "Cesty") {
          this.clankyPodKategorie.sort(
            (a, b) =>
              this.getDateNumber(b.formatDatum) -
              this.getDateNumber(a.formatDatum)
          );
        } else if (this.$route.name === "NovePridane") {
          this.clankyPodKategorie.sort((a, b) => b.id - a.id);
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

      filterRecent(clanek) {
        if (clanek.pridano) {
          let pridano = clanek.pridano.trim();

          pridano = Date.parse(
            pridano.slice(3, 6).concat(pridano.slice(0, 3), pridano.slice(6))
          );

          let today = new Date().getTime();

          let last2weeks = (today - pridano) / 1000 / 60 / 60 / 24;

          return last2weeks <= 14;
        }
      },
    },

    created() {
      if (
        this.$route.name === "DetailKrize" ||
        this.$route.name === "NovyKriz"
      ) {
        this.innerParams = this.paramsKrize;
      }

      if (this.$route.params.id) {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) => clanek.id == this.$route.params.id
        );
        //tady zacinaji nove pridane
      } else if (this.$route.name === "NovePridane") {
        //vyfiltruji se clanky podle data

        let clanky14dni = this.clanky.filter((clanek) =>
          this.filterRecent(clanek)
        );

        //zjisti se, ktere clanky z clanku podle data nejsou v poslednich 10 clancich podle id a tyto clanky se do 10 clanku podle id pridaji

        let poslednich20 = this.clanky.slice(-20);

        let vysledneNove = [];

        for (let clanek14 of clanky14dni) {
          let pridat = true;

          for (let clanek of poslednich20) {
            if (clanek.id === clanek14.id) {
              pridat = false;
              break;
            }
          }
          if (pridat) {
            vysledneNove.push(clanek14);
          }
        }

        vysledneNove = vysledneNove.concat(poslednich20);

        //vyhodi se duplikovane clanky (ruzne id,stejny nazev)
        let novaKategorie = [];

        for (let i = 0; i < vysledneNove.length; i++) {
          if (!vysledneNove[i].nazev) {
            vysledneNove[i].nazev = vysledneNove[i].jmeno;
          }
          novaKategorie.push(vysledneNove[i]);

          for (let j = 0; j < i; j++) {
            if (novaKategorie[j].nazev === vysledneNove[i].nazev) {
              novaKategorie[j].nezobrazuj = true;
            }
          }
        }
        novaKategorie = novaKategorie.filter((clanek) => !clanek.nezobrazuj);
        this.clankyPodKategorie = novaKategorie;

        for (let clanek of this.clankyPodKategorie) {
          if (
            clanek.kategorie === "pomnicky" ||
            clanek.kategorie === "smircikrize"
          ) {
            this.pomnickyUkazat = true;
          } else if (
            clanek.kategorie === "cesty" ||
            clanek.kategorie === "vypraveni"
          ) {
            this.clankyUkazat = true;
          }
        }

        //tady konci novePridane
      } else if (this.$route.name === "Vypraveni") {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) => clanek.kategorie === "vypraveni"
        );
      } else if (this.$route.name === "Cesty") {
        this.clankyPodKategorie = this.clanky.filter(
          (clanek) => clanek.kategorie === "cesty"
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

      if (
        this.$route.name === "DetailPomnicku" ||
        this.$route.name === "NovyPomnicek"
      ) {
        for (let clanek of this.clanky) {
          if (clanek.id == this.$route.params.id) {
            let vybrany = clanek;
            for (let clanek of this.clanky) {
              if (clanek.nazev === vybrany.nazev && clanek.id !== vybrany.id) {
                this.vybranaId.push(clanek.podkategorie);
              }
            }
          }
        }
      }
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
    grid-template-rows: auto auto auto auto;
    color: #131e36;
  }

  .large {
    grid-column: 1/7 !important;
    justify-self: center;
    grid-row: 2/3;
    margin: 60px;
    width: 900px;
  }

  @media (max-width: 950px) {
    .large {
      width: unset;
      max-width: 900px;
    }
  }

  .bezTextu {
    grid-row: 2/4 !important;
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
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-template-rows: auto auto;
  }

  #pomnickyUvod {
    grid-column: 1/6;
  }

  @media screen and (max-width: 600px) {
    #pomnicky {
      grid-template-rows: minmax(min-content, 120px) minmax(min-content, 50px) auto auto;
    }

    #pomnicky h1 {
      grid-row: 2/3;
      grid-column: 1/7;
      padding-top: 30px;
      font-size: 30px;
      margin: 0;
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
    grid-row: 1/4;
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
    font-size: 13px;
    min-width: 100%;
    max-width: 170px;
    font-family: "Raleway", sans-serif;
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

  .naNovePridane {
    grid-column: 5/6;
    grid-row: 1/2;
    margin-top: 16px;
    justify-self: end;
  }

  .zpet {
    width: unset !important;
  }

  @media (max-width: 600px) {
    .naNovePridane {
      grid-column: 1/2;
      grid-row: 2/3;
      margin-top: 0;
      width: unset;
      max-width: 60px;
    }

    .zpet {
      min-width: 70px !important;
    }
  }

  #tlacitkoDomu {
    grid-column: 6/7;
    grid-row: 1/2;
    align-self: flex-end;
    justify-self: flex-end;
    margin-right: 30px;
    min-width: unset;
    max-width: unset;
    width: 116px !important;
    padding: 0 10px;
    height: 35px;
    background-color: #459ae6;
    margin-top: 20px;
  }

  #tlacitkoNahoru {
    grid-column: 6/7;
    grid-row: 1/2;
    position: sticky;
    top: 0;
    left: 0;
    justify-self: flex-end;
    margin-right: 30px;
    margin-top: 20px;
    min-width: unset;
    max-width: unset;
    width: 116px !important;
    padding: 0 10px;
    height: 35px;
    background-color: #459ae6;
  }

  #rozbalit {
    grid-column: 5/6;
    align-self: flex-end;
    justify-self: flex-end;
    /* margin-right: 30px; */
    min-width: unset;
    max-width: unset;
    width: 116px !important;
    padding: 0 10px;
    height: 35px;
    background-color: #459ae6;
  }

  #tlacitkoDomu:hover,
  #tlacitkoNahoru:hover {
    background-color: #898a8b;
  }

  @media (max-width: 600px) {
    .pomnickyNavigace {
      flex-direction: row;
      grid-row: 1/2;
      grid-column: 1 / span 4;
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
      left: unset;
    }

    #tlacitkoDomu {
      /* top: 10px; */
      width: 60px !important;
    }

    #tlacitkoNahoru {
      /* top: 80px; */
      margin-top: 13px;
      width: 60px !important;
    }

    #pomnicky .pomnicekKategorie.pomnicekMenu {
      display: none;
    }
  }

  #pomnicky .pomnicekKategorie.responsive {
    display: flex;
  }

  .pomnicekKategorie:hover,
  .domu:hover,
  #seznam:hover {
    color: #13131d;
    background-color: #898a8b;
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
    width: 100%;
    height: 100%;
  }
  #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 5;
    width: 100%;
    height: 100%;
    background-color: rgba(204, 175, 127, 0.4);
    margin-right: 0;
  }

  #pomnicky .kontejner {
    grid-column: 2/7;
    grid-row: 3/4;
    margin-bottom: 20px;
  }

  .kontejnerBigMargin {
    margin-top: 60px;
  }

  .kontejnerSmallMargin {
    margin: 30px;
  }

  #oknoPomnicky {
    background-color: #f5f2ed;
    margin: 0;
    margin-bottom: 10px;
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
