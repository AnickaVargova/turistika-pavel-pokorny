<template>
  <div id="pomnicky">
    <div id="pozadi1">
      <img
        :src="getImageUrl(innerParams.background)"
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

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import OknoPomnicky from "./OknoPomnicky.vue";
import OknoClanky from "./OknoClanky.vue";
import AbecedniSeznam from "./AbecedniSeznam.vue";
import Klikaci from "./Klikaci.vue";
import Loader from "./Loader.vue";
import { useScrollPosition } from "../composables/useScrollPosition";
import {
  LONG_VERSION_ROUTES,
  CATEGORY_ROUTES,
  MAIN_ROUTES,
  NEW_ITEM_ROUTES,
  ARTICLE_ROUTES,
  DETAIL_ROUTES,
  LONG_CATEGORY_ROUTES,
} from "../router/constants";

const props = defineProps({
  params: {
    type: Object,
    required: true,
  },
});

const route = useRoute();
const { scrollToTop } = useScrollPosition();

const innerParams = ref(props.params);
const vybranaId = ref([Number(route.params.kategorie)]);

const routeName = computed(() => route.name);

const isLongVersion = computed(() => {
  return LONG_VERSION_ROUTES.includes(routeName.value);
});

const transboxStyle = computed(() => {
  return innerParams.value.transbox
    ? { backgroundColor: innerParams.value.transbox }
    : {};
});

const showAbecedniSeznam = computed(() => {
  const { kategorie, id } = route.params;
  const { stranka } = innerParams.value;
  const excludedPages = ["vypraveni", "cesty", "novepridane"];

  return !kategorie && !id && !excludedPages.includes(stranka);
});

const textContainerClasses = computed(() => {
  const { stranka } = innerParams.value;
  const largePages = ["vypraveni", "cesty", "novepridane"];

  return {
    pomnickyText: true,
    large: largePages.includes(stranka),
  };
});

const showExpandButton = computed(() => {
  return (
    CATEGORY_ROUTES.includes(routeName.value) ||
    routeName.value === "NovePridane" ||
    isLongVersion.value
  );
});

const expandLink = computed(() => {
  const { stranka } = innerParams.value;
  const { kategorie } = route.params;
  const isNovePridane =
    routeName.value === "NovePridane" || routeName.value === "NovePridaneLong";
  const categoryPath = isNovePridane ? "" : `/${kategorie}`;
  const longPath = !isLongVersion.value ? "/long" : "";

  return `/${stranka}${categoryPath}${longPath}`;
});

const showNewButton = computed(() => {
  return NEW_ITEM_ROUTES.includes(routeName.value);
});

const showAbcButton = computed(() => {
  const { kategorie, id } = route.params;
  const { stranka } = innerParams.value;
  const excludedPages = ["vypraveni", "cesty"];

  return kategorie || (id && !excludedPages.includes(stranka));
});

const showCategoryNavigation = computed(() => {
  const { stranka } = innerParams.value;
  return ["pomnicky", "krize", "studanky"].includes(stranka);
});

const showContainer = computed(() => {
  return !MAIN_ROUTES.includes(routeName.value);
});

const containerClasses = computed(() => {
  const { stranka, detail } = innerParams.value;
  const largePages = ["vypraveni", "cesty", "novepridane"];
  const smallMarginPages = ["pomnicky", "krize", "studanky"];

  return {
    kontejner: true,
    kontejnerBigMargin: largePages.includes(stranka),
    kontejnerSmallMargin: smallMarginPages.includes(stranka),
    large: largePages.includes(stranka) || stranka === "novepridane",
    bezTextu: detail,
  };
});

const showOknoClanky = computed(() => {
  return ARTICLE_ROUTES.includes(routeName.value);
});

const showOknoPomnicky = computed(() => {
  return (
    DETAIL_ROUTES.includes(routeName.value) ||
    LONG_CATEGORY_ROUTES.includes(routeName.value) ||
    routeName.value === "NovePridaneLong"
  );
});

const goToTop = () => {
  scrollToTop();
};

const categoryButtonClasses = (kategorie) => {
  const { stranka } = innerParams.value;
  const isActive = vybranaId.value.includes(kategorie.id);

  return {
    tyrkys: stranka === "krize",
    hneda: stranka === "pomnicky",
    fialova: stranka === "studanky",
    commonButton: true,
    kategorieTextCenter: stranka === "cesty" || stranka === "vypraveni",
    active: isActive,
    podkategorie: true,
  };
};

// Vite dynamic import for images
const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
};

onMounted(() => {
  if (!localStorage.getItem("scrollY")) {
    scrollToTop(false);
  }
});
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
  color: var(--text-primary);
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  position: relative;
}

#pomnicky > *:not(#pozadi1):not(.transbox1):not(#tlacitkoNahoru) {
  position: relative;
  z-index: 10;
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
  font-size: 35px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
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
  line-height: 1.7;
  color: var(--text-secondary);
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

.hneda {
  background: linear-gradient(135deg, #5b3f20 0%, #95460a 100%);
  color: var(--button-text-color);
  border-color: #6f3306;
}

.hneda:hover {
  border-color: #2a1709;
  background: linear-gradient(135deg, #96734c 0%, #b56d37 100%);
}

.tyrkys {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: var(--button-text-color);
  border-color: #0891b2;
}

.fialova {
  background: linear-gradient(135deg, #8252db 0%, #4a1f8f 100%);
  color: var(--button-text-color);
  border-color: #6731bd;
}

.hneda:hover {
  color: var(--button-text-hover);
}

.tyrkys:hover {
  color: var(--button-text-hover);
  background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
}

.fialova:hover {
  color: var(--button-text-hover);
  background: linear-gradient(135deg, #9465c2 0%, #8e49cf 100%);
}

/* .active {
  color: var(--button-text-hover);
  background: linear-gradient(135deg, #96734c 0%, #b56d37 100%);
} */

.active.hneda {
  background: linear-gradient(135deg, #96734c 0%, #b56d37 100%);
}

.active.tyrkys {
  background: linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%);
}

.active.fialova {
  background: linear-gradient(135deg, #9465c2 0%, #8e49cf 100%);
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
  margin-top: 6px;
}

#naNovePridane {
  margin-right: 10px;
  min-width: unset;
  max-width: unset;
  width: 56px;
  padding: 0 12px;
  height: 38px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  border: none;
  box-shadow: var(--shadow-md);
  margin-top: 20px;
  margin-left: 30px;
  grid-column: 1/2;
  grid-row: 1/2;
  justify-self: start;
  align-self: end;
  transition: var(--transition);
  width: 60px;
}

#naNovePridane:hover {
  box-shadow: var(--shadow-lg);
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
#rozbalit,
#domuOnas {
  min-width: unset;
  max-width: unset;
  width: 116px !important;
  padding: 0 14px;
  height: 38px;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  color: var(--button-text-color);
  box-shadow: var(--shadow-md);
  transition: background 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#tlacitkoDomu:hover,
#tlacitkoNahoru:hover,
#rozbalit:hover,
#domuOnas:hover {
  box-shadow: var(--shadow-lg);
  color: var(--button-text-hover);
  background: linear-gradient(135deg, #4c5e96f2 0%, #3355a6 100%);
}

#tlacitkoDomu {
  grid-column: 6/7;
  grid-row: 1/2;
  align-self: flex-end;
  justify-self: flex-end;
  margin-right: 30px;
  margin-top: 20px;
  text-decoration: none;
}

#tlacitkoNahoru {
  grid-column: 6/7;
  grid-row: 1/2;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 20;
  justify-self: flex-end;
  margin-right: 30px;
  margin-top: 10px;
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
    margin: 17px 0 3px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 5fr);
    max-width: calc(100% - 20px);
    width: calc(100% - 20px);
    box-sizing: border-box;
    padding: 0;
    gap: 2px;
  }

  .pomnickyNavigace > div {
    max-width: 100%;
  }

  .pomnickyNavigace .commonButton {
    width: 100%;
    max-width: 100%;
    min-width: 0;
    box-sizing: border-box;
    overflow-wrap: break-word;
    word-wrap: break-word;
    padding: 8px 10px;
    font-size: 11px;
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
    margin-top: 21px;
    grid-column: 5/7;
    justify-self: center;
  }
}

#pomnicky .commonButton.responsive {
  display: flex;
}

/* .commonButton:hover:not(.active):not(.hneda):not(.tyrkys):not(.fialova):not(
    #seznam
  ) {
  color: var(--primary-color) !important;
  background-color: var(--bg-accent) !important;
} */

.kategorieTextCenter {
  justify-content: center;
  padding-left: 0;
}

#seznam {
  margin-bottom: 20px;
  color: var(--button-text-color);
  border: none;
  padding: 0 14px;
  box-shadow: var(--shadow-md);
  width: 20px;
  min-width: 100%;
}

#seznam:hover {
  color: var(--button-text-hover);
}

@media (max-width: 600px) {
  #seznam {
    margin-bottom: 3px;
    min-width: 50%;
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
  position: relative;
  z-index: 1;
}

.transbox1 {
  grid-column: 1 / 7;
  grid-row: 1 / 8;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  margin-right: 0;
  position: relative;
  z-index: 2;
  pointer-events: none;
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
  background: var(--bg-primary);
  margin: 0;
  margin-bottom: 10px;
  padding: 30px;
  border-radius: var(--border-radius);
  font-size: 15px;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
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
