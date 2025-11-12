<template>
  <div id="pomnicky">
    <div id="pozadi1">
      <img
        :src="require(`./../assets/${innerParams.background}`)"
        :alt="innerParams.backgroundDescription"
      />
    </div>

    <div :class="['transbox1']" :style="transboxStyle"></div>

    <h1>{{ innerParams.nadpis }}</h1>

    <AbecedniSeznam
      v-if="showAbecedniSeznam"
      :stranka="innerParams.stranka"
      class="abSeznam"
    />

    <div :class="textContainerClasses">
      <div
        id="pomnickyUvod"
        v-for="(odstavec, index) in innerParams.uvodniText"
        :key="index"
      >
        <p>
          <span v-html="odstavec.textOdstavce" />
          <span v-if="odstavec.vnitrniOdkazy">
            <Klikaci :clanek="odstavec" kdeJsem="odstavec" />
          </span>
        </p>
      </div>
    </div>

    <div id="rozbalitWrapper">
      <router-link :to="expandLink">
        <div v-if="showExpandButton" id="rozbalit" class="commonButton">
          {{ isLongVersion ? "Zkrácená verze" : "Rozbalit vše" }}
        </div>
      </router-link>
    </div>

    <router-link to="/" id="tlacitkoDomu" class="commonButton">
      Úvodní strana
    </router-link>

    <div id="tlacitkoNahoru" class="commonButton" @click="goToTop">Nahoru</div>

    <span
      v-if="showNewButton"
      @click="$router.go(-1)"
      id="naNovePridane"
      class="commonButton"
    >
      Nové
    </span>

    <router-link :to="`/${innerParams.stranka}`" id="ABClink">
      <div v-if="showAbcButton" class="commonButton" id="seznam">ABC</div>
    </router-link>

    <div v-if="showCategoryNavigation" class="pomnickyNavigace">
      <div
        v-for="kategorie in innerParams.kategoriePomnicky"
        :key="kategorie.nazev"
      >
        <router-link :to="`/${innerParams.stranka}/${kategorie.id}`">
          <div
            :class="categoryButtonClasses(kategorie)"
            :style="{ backgroundColor: innerParams.buttonsColor }"
          >
            {{ kategorie.nazev }} ({{ kategorie.pocet }})
          </div>
        </router-link>
      </div>
    </div>

    <div v-if="showContainer" :class="containerClasses">
      <div>
        <OknoClanky
          v-if="showOknoClanky"
          :stranka="innerParams.stranka"
          :zalozky="!isLongVersion"
        />
        <OknoPomnicky
          v-if="showOknoPomnicky"
          :kategoriePomnicky="innerParams.kategoriePomnicky"
          :stranka="innerParams.stranka"
          :zalozky="!isLongVersion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OknoPomnicky from "./OknoPomnicky.vue";
import OknoClanky from "./OknoClanky.vue";
import AbecedniSeznam from "./AbecedniSeznam.vue";
import Klikaci from "./Klikaci.vue";
import Loader from "./Loader.vue";

// Route name constants
const LONG_VERSION_ROUTES = [
  "PomnickyKategorieLong",
  "SmirciKrizeKategorieLong",
  "StudankyKategorieLong",
  "NovePridaneLong",
];

const CATEGORY_ROUTES = [
  "PomnickyKategorie",
  "SmirciKrizeKategorie",
  "StudankyKategorie",
];

const MAIN_ROUTES = ["Pomnicky", "SmirciKrize", "Studanky"];

const NEW_ITEM_ROUTES = ["NovyPomnicek", "NovyKriz", "NovaStudanka"];

const ARTICLE_ROUTES = [
  "NovePridane",
  "NovePridaneLong",
  "PomnickyKategorie",
  "SmirciKrizeKategorie",
  "StudankyKategorie",
  "Vypraveni",
  "Cesty",
];

const DETAIL_ROUTES = [
  "PomnickyKategorieLong",
  "DetailPomnicku",
  "SmirciKrizeKategorieLong",
  "StudankyKategorieLong",
  "NovePridaneLong",
  "DetailKrize",
  "DetailStudanky",
  "NovyPomnicek",
  "NovyKriz",
  "NovaStudanka",
];

export default {
  props: ["params"],
  components: {
    OknoPomnicky,
    OknoClanky,
    AbecedniSeznam,
    Klikaci,
    Loader,
  },

  data() {
    return {
      innerParams: this.params,
      vybranaId: [Number(this.$route.params.kategorie)],
    };
  },

  computed: {
    routeName() {
      return this.$route.name;
    },

    isLongVersion() {
      return LONG_VERSION_ROUTES.includes(this.routeName);
    },

    transboxStyle() {
      return this.innerParams.transbox
        ? { backgroundColor: this.innerParams.transbox }
        : {};
    },

    showAbecedniSeznam() {
      const { kategorie, id } = this.$route.params;
      const { stranka } = this.innerParams;
      const excludedPages = ["vypraveni", "cesty", "novepridane"];

      return !kategorie && !id && !excludedPages.includes(stranka);
    },

    textContainerClasses() {
      const { stranka } = this.innerParams;
      const largePages = ["vypraveni", "cesty", "novepridane"];

      return {
        pomnickyText: true,
        large: largePages.includes(stranka),
      };
    },

    showExpandButton() {
      return (
        CATEGORY_ROUTES.includes(this.routeName) ||
        this.routeName === "NovePridane" ||
        this.isLongVersion
      );
    },

    expandLink() {
      const { stranka } = this.innerParams;
      const { kategorie } = this.$route.params;
      const isNovePridane =
        this.routeName === "NovePridane" ||
        this.routeName === "NovePridaneLong";
      const categoryPath = isNovePridane ? "" : `/${kategorie}`;
      const longPath = !this.isLongVersion ? "/long" : "";

      return `/${stranka}${categoryPath}${longPath}`;
    },

    showNewButton() {
      return NEW_ITEM_ROUTES.includes(this.routeName);
    },

    showAbcButton() {
      const { kategorie, id } = this.$route.params;
      const { stranka } = this.innerParams;
      const excludedPages = ["vypraveni", "cesty"];

      return kategorie || (id && !excludedPages.includes(stranka));
    },

    showCategoryNavigation() {
      const { stranka } = this.innerParams;
      return ["pomnicky", "krize", "studanky"].includes(stranka);
    },

    showContainer() {
      return !MAIN_ROUTES.includes(this.routeName);
    },

    containerClasses() {
      const { stranka, detail } = this.innerParams;
      const largePages = ["vypraveni", "cesty", "novepridane"];
      const smallMarginPages = ["pomnicky", "krize", "studanky"];

      return {
        kontejner: true,
        kontejnerBigMargin: largePages.includes(stranka),
        kontejnerSmallMargin: smallMarginPages.includes(stranka),
        large: largePages.includes(stranka) || stranka === "novepridane",
        bezTextu: detail,
      };
    },

    showOknoClanky() {
      return ARTICLE_ROUTES.includes(this.routeName);
    },

    showOknoPomnicky() {
      return DETAIL_ROUTES.includes(this.routeName);
    },
  },

  methods: {
    goToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },

    categoryButtonClasses(kategorie) {
      const { stranka } = this.innerParams;
      const isActive = this.vybranaId.includes(kategorie.id);

      return {
        tyrkys: stranka === "krize",
        hneda: stranka === "pomnicky",
        fialova: stranka === "studanky",
        commonButton: true,
        kategorieTextCenter: stranka === "cesty" || stranka === "vypraveni",
        active: isActive,
        podkategorie: true,
      };
    },
  },
};
</script>

<style>
.abSeznam {
  grid-column: 2/7;
  grid-row: 3;
  min-height: 300px;
  margin: 30px;
}

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
  grid-column: 1/7;
}

@media screen and (max-width: 600px) {
  #pomnicky {
    grid-template-rows: minmax(min-content, 50px) auto auto;
  }

  #pomnicky h1 {
    grid-row: 2/3;
    grid-column: 1/7;
    padding-top: 30px;
    font-size: 30px;
    margin: 0;
    padding: 0;
    margin-top: 20px;
  }

  .pomnickyText {
    grid-row: 3/4;
    grid-column: 1/7;
    font-size: 15px;
    margin: 10px 20px 0;
  }

  .abSeznam {
    grid-column-start: 1;
    grid-row-start: 5;
  }
}

.pomnickyNavigace {
  grid-column: 1/2;
  grid-row: 2/5;
  margin: 23px;
  display: flex;
  flex-direction: column;
}

p.responsive {
  display: none;
}

.commonButton {
  border: 2px solid black;
  margin: 3px;
  height: 35px;
  font-weight: bold;
  color: black;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  padding: 7px;
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

.fialova {
  background-color: #a059be;
}

.active {
  background-color: #898a8b;
}

#kategorieMobil {
  grid-row: 3/4;
  grid-column: 1/4;
  margin-top: 20px;
}

#ABClink {
  width: fit-content;
  height: fit-content;
  grid-row: 1/2;
  grid-column: 1/2;
  margin-left: 25px;
  margin-top: 20px;
}

#naNovePridane {
  margin-right: 10px;
  min-width: unset;
  max-width: unset;
  width: 56px;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
  margin-top: 20px;
  margin-left: 30px;
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: start;
  align-self: end;
}

@media (max-width: 600px) {
  #naNovePridane {
    grid-column: 1/2;
    grid-row: 2/3;
    margin-top: 10px;
    margin-left: 10px;
    max-width: 60px;
    width: 60px !important;
    justify-self: flex-start;
    align-self: flex-start;
  }

  #ABClink {
    grid-row: 1/2;
    grid-column: 3/4;
    margin-top: 17px;
    margin-left: 0;
  }
}

/* Common button styles for top-right buttons */
#tlacitkoDomu,
#tlacitkoNahoru,
#rozbalit {
  min-width: unset;
  max-width: unset;
  width: 116px !important;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
}

#tlacitkoDomu {
  grid-column: 6/7;
  grid-row: 1/2;
  align-self: flex-end;
  justify-self: flex-end;
  margin-right: 30px;
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
}

#rozbalitWrapper {
  grid-column: 6/7;
  grid-row: 3/4;
  align-self: flex-end;
  justify-self: flex-end;
  margin-right: 30px;
}

@media (max-width: 600px) {
  .pomnickyNavigace {
    flex-direction: row;
    grid-row: 4/5;
    grid-column: 1/7;
    margin: 17px 0 3px 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 5fr);
  }

  #rozbalitWrapper {
    grid-column: 1/2;
    grid-row: 5/6;
    justify-self: flex-start;
    align-self: flex-start;
  }

  #tlacitkoDomu {
    width: 60px !important;
    grid-column: 1/2;
    margin-left: 10px;
    justify-self: flex-start;
    align-self: flex-start;
  }

  #tlacitkoNahoru {
    width: 60px !important;
    grid-column: 5/7;
    justify-self: center;
  }
}

#pomnicky .commonButton.responsive {
  display: flex;
}

.commonButton:hover {
  color: #13131d !important;
  background-color: #898a8b !important;
}

.kategorieTextCenter {
  justify-content: center;
  padding-left: 0;
}

#seznam {
  margin-bottom: 20px;
  background-color: #459ae6;
  padding: 0 10px;
}

@media (max-width: 600px) {
  .commonButton {
    min-width: 70px;
    max-width: 150px;
    font-size: 11px;
  }

  #seznam {
    margin-bottom: 3px;
  }

  #tlacitkoDomu,
  #tlacitkoNahoru,
  #naNovePridane,
  #seznam {
    margin-right: 0;
    height: 45px;
  }
}

#pozadi1 {
  grid-column: 1 / 7;
  grid-row-start: 1;
  grid-row-end: 8;
  width: 100%;
  height: 100%;
}
.transbox1 {
  grid-column: 1 / 7;
  grid-row: 1 / 8;
  width: 100%;
  height: 100%;
  background-color: rgba(204, 175, 127, 0.4);
  margin-right: 0;
}

#pomnicky .kontejner {
  grid-column: 2/7;
  grid-row: 4/5;
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
    grid-column-start: 1;
    grid-row-start: 7;
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
    padding-top: 10px;
    margin-top: 10px;
  }
}
</style>
