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
      class="transbox1"
    ></div>
    <div v-else class="transbox1"></div>
    <h1>
      <a name="top"></a>
      {{ innerParams.nadpis }}
    </h1>

    <AbecedniSeznam
      v-if="
        !this.$route.params.kategorie &&
        !this.$route.params.id &&
        innerParams.stranka !== 'vypraveni' &&
        innerParams.stranka !== 'cesty' &&
        innerParams.stranka !== 'novepridane'
      "
      v-bind:stranka="innerParams.stranka"
      class="abSeznam"
    />

    <div
      v-bind:class="{
        pomnickyText: true,
        large:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty' ||
          innerParams.stranka === 'novepridane',
      }"
    >
      <div
        id="pomnickyUvod"
        v-for="(odstavec, index) in innerParams.uvodniText"
        v-bind:key="index"
      >
        <p>
          <span v-html="odstavec.textOdstavce">
            {{ odstavec.textOdstavce }}
          </span>
          <span v-if="odstavec.vnitrniOdkazy">
            <Klikaci v-bind:clanek="odstavec" kdeJsem="odstavec" />
          </span>
        </p>
      </div>
    </div>

    <div id="rozbalitWrapper">
      <router-link
        v-bind:to="`/${innerParams.stranka}/${$route.params.kategorie}${
          !isLongVersion ? '/long' : ''
        }`"
      >
        <div
          id="rozbalit"
          class="commonButton"
          v-if="
            $route.name === 'SmirciKrizeKategorie' ||
            $route.name === 'PomnickyKategorie' ||
            $route.name === 'StudankyKategorie' ||
            isLongVersion
          "
        >
          {{ isLongVersion ? "Zkrácená verze" : "Rozbalit vše" }}
        </div>
      </router-link>
    </div>

    <router-link to="/" id="tlacitkoDomu" class="commonButton">
      Úvodní strana
    </router-link>

    <a id="tlacitkoNahoru" class="commonButton" href="#top">Nahoru </a>
    <router-link
      to="/novepridane"
      id="naNovePridane"
      class="commonButton"
      v-if="
        this.$route.name === 'NovyPomnicek' ||
        this.$route.name === 'NovyKriz' ||
        this.$route.name === 'NovaStudanka'
      "
    >Nové</router-link>

    <router-link v-bind:to="`/${innerParams.stranka}`" id="ABClink">
      <div
        class="commonButton"
        id="seznam"
        v-if="
          this.$route.params.kategorie ||
          (this.$route.params.id &&
            innerParams.stranka !== 'vypraveni' &&
            innerParams.stranka !== 'cesty')
        "
      >
        ABC
      </div>
    </router-link>

    <div
      class="pomnickyNavigace"
      v-if="
        innerParams.stranka === 'pomnicky' ||
        innerParams.stranka === 'krize' ||
        innerParams.stranka === 'studanky'
      "
    >
      <!-- buttons end -->

      <!-- kategorie menu start -->

      <div
        v-for="kategorie in innerParams.kategoriePomnicky"
        v-bind:key="kategorie.nazev"
      >
        <router-link v-bind:to="`/${innerParams.stranka}/${kategorie.id}`">
          <div
            v-bind:class="{
              tyrkys: innerParams.stranka === 'krize',
              hneda: innerParams.stranka === 'pomnicky',
              fialova: innerParams.stranka === 'studanky',
              commonButton: true,
              kategorieTextCenter:
                innerParams === 'cesty' || innerParams === 'vypraveni',
              active: vybranaId.includes(kategorie.id),
              podkategorie: true,
            }"
            v-bind:style="{ backgroundColor: innerParams.buttonsColor }"
          >
            {{ kategorie.nazev }} ({{ kategorie.pocet }})
          </div>
        </router-link>
      </div>
    </div>

    <!-- kategorie menu end -->

    <!-- condition v-if for kontejner is here because otherwise it covers abecedniSeznam which becomes unclickable -->
    <div
      class="kontejner"
      v-if="
        this.$route.name !== 'Pomnicky' &&
        this.$route.name !== 'SmirciKrize' &&
        this.$route.name !== 'Studanky'
      "
      v-bind:class="{
        kontejnerBigMargin:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty',
        kontejnerSmallMargin:
          innerParams.stranka === 'pomnicky' ||
          innerParams.stranka === 'krize' ||
          innerParams.stranka === 'studanky',
        large:
          innerParams.stranka === 'vypraveni' ||
          innerParams.stranka === 'cesty' ||
          innerParams.stranka === 'novepridane',
        bezTextu: innerParams.detail,
      }"
    >
      <div>
        <OknoClanky
          v-if="
            this.$route.name === 'NovePridane' ||
            this.$route.name === 'PomnickyKategorie' ||
            this.$route.name === 'SmirciKrizeKategorie' ||
            this.$route.name === 'StudankyKategorie' ||
            this.$route.name === 'Vypraveni' ||
            this.$route.name === 'Cesty'
          "
          v-bind:stranka="innerParams.stranka"
          v-bind:zalozky="!isLongVersion"
        />
        <OknoPomnicky
          v-if="
            this.$route.name === 'PomnickyKategorieLong' ||
            this.$route.name === 'DetailPomnicku' ||
            this.$route.name === 'SmirciKrizeKategorieLong' ||
            this.$route.name === 'StudankyKategorieLong' ||
            this.$route.name === 'DetailKrize' ||
            this.$route.name === 'DetailStudanky' ||
            this.$route.name === 'NovyPomnicek' ||
            this.$route.name === 'NovyKriz' ||
            this.$route.name === 'NovaStudanka'
          "
          v-bind:kategoriePomnicky="innerParams.kategoriePomnicky"
          v-bind:stranka="innerParams.stranka"
          v-bind:zalozky="!isLongVersion"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OknoPomnicky from "./OknoPomnicky.vue";
import OknoClanky from "./OknoClanky.vue";
import AbecedniSeznam from ".//AbecedniSeznam.vue";
import Klikaci from "./Klikaci.vue";
import Loader from "./Loader.vue";

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
      isLongVersion:
        this.$route.name === "PomnickyKategorieLong" ||
        this.$route.name === "SmirciKrizeKategorieLong" ||
        this.$route.name === "StudankyKategorieLong",
    };
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
  width: 70px;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
  margin-top: 20px;
  grid-column: 5/6;
  grid-row: 1/2;
  justify-self: end;
}

@media (max-width: 600px) {
  #naNovePridane {
    grid-column: 1/2;
    grid-row: 2/3;
    margin-top: 10px;
    min-width: unset;
    max-width: 60px;
    width: 60px !important;
    grid-column: 1/2;
    grid-row: 2/3;
    margin-left: 10px;
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
  min-width: unset;
  max-width: unset;
  width: 116px !important;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
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

  #tlacitkoDomu,
  #tlacitkoNahoru,
  #naNovePridane,
  #seznam {
    margin-right: 0;
    height: 45px;
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
