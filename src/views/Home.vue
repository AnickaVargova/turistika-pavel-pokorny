<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/uvodniStrana.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div :class="{ responsive: responsive }" id="uvodniText">
      <h1>{{ welcomeMessage }}</h1>
      <p>
        Naše webové stránky se zabývají regionální vlastivědou v{{ "\xa0" }}Brně
        a okolí, turistikou a cestováním po republice i po Evropě. Popisují
        pomníčky, smírčí kříže, studánky a další objekty turistického zájmu v{{
          "\xa0"
        }}okruhu zhruba třiceti kilometrů od Brna, tedy oblast vymezenou
        Vyškovem Ždánicemi na východě, Novomlýnskými nádržemi na jihu, Moravským
        Krumlovem, Náměští a Velkou Bíteší na západě a Nedvědicemi a Boskovicemi
        na severu. Až na výjimky se nalézají v{{ "\xa0" }}přírodě, mimo
        zástavbu. Pomníky v{{ "\xa0" }}intravilánu obcí nehledáme. Návodem se
        pro nás stala Kniha o Jizerských horách od Miloslava Nevrlého, která
        vyšla poprvé v{{ "\xa0" }}roce 1978 a od té doby ještě čtyřikrát.
        Navazovala na odvěkou touhu člověka hledat, nalézat, objevovat. V{{
          "\xa0"
        }}osmdesátých letech jsme začali hledat pomníčky kolem Brna a dosud
        nepřestali. Tehdy byly k{{ "\xa0" }}dispozici jen nepřesné mapy a GPS
        ještě nebylo vynalezeno. Počet těchto objektů přesahuje odhadem
        tisícovku a mění se, některé přibývají, jiné zanikají. Doufáme, že tyto
        stránky se mohou stát vaší inspirací k{{ "\xa0" }}výletům a vyjížďkám do
        spanilého okolí brněnského. Byli bychom rádi, kdybyste zažili aspoň
        zlomek radosti, kterou jsme prožívali my při hledání, neboť hledání je
        lepší než nalézání.
      </p>
    </div>
    <footer>
      <small>
        <span>Stránky vytvořila Anna Vargová, </span
        ><a href="mailto:anna.vargova@seznam.cz?Subject=''"
          >anna.vargova@seznam.cz
        </a></small
      >
    </footer>

    <div :class="{ nav: true, responsive: responsive }">
      <div>
        <Loader v-if="loading.novePridane" class="homeButton" />
        <router-link v-else to="/novepridane">
          Naposled přidané <span class="count">&nbsp;{{ pocetNovych }}</span>
        </router-link>
      </div>
      <div>
        <a :href="mapaUrl" target="_self" id="mapabutton"> Mapa </a>
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.pomnicky" />
        <router-link v-else to="/pomnicky"
          >Pomníčky <span class="count">&nbsp;{{ pomnicky }}</span>
        </router-link>
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.krize" />
        <router-link v-else to="/krize"
          >Smírčí kříže
          <span class="count">&nbsp;{{ krize }}</span></router-link
        >
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.studanky" />
        <router-link v-else to="/studanky"
          >Studánky <span class="count">&nbsp;{{ studanky }}</span></router-link
        >
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.cesty" />
        <router-link v-else to="/cesty"
          >Cesty <span class="count">&nbsp;{{ cesty }}</span></router-link
        >
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.vypraveni" />
        <router-link v-else to="/vypraveni"
          >Vyprávění
          <span class="count">&nbsp;{{ vypraveni }}</span></router-link
        >
      </div>
      <div>
        <router-link to="/onas">O nás</router-link>
      </div>
      <div>
        <router-link to="/odkazy">Sympatické weby</router-link>
      </div>
      <div>
        <a href="https://turistapavel.rajce.idnes.cz/" target="_blank">
          Moje rajče</a
        >
      </div>
    </div>

    <a href="javascript:void(0);" class="icon" @click="toggleMenu">
      <i class="fa fa-bars"></i>
    </a>
    <div id="pocitadlo">
      <a href="https://www.toplist.cz/stat/1802686/">
        <img
          src="https://www.toplist.cz/count.asp?id=1802686&amp;logo=mc&amp;http=https%3A//www.google.com/&amp;wi=1440&amp;he=900&amp;cd=24&amp;t=Turistika Pavel Pokorný"
          style="border: 1; width: 88px; height: 60px"
          alt="Toplist"
        />
      </a>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl, testUrl, mapaUrl } from "../utils/url";
import { cachedFetch } from "../utils/apiCache";

const CATEGORIES = ["pomnicky", "krize", "studanky", "vypraveni", "cesty"];

export default {
  components: { Loader },
  data() {
    return {
      responsive: false,
      pomnicky: 0,
      krize: 0,
      studanky: 0,
      cesty: 0,
      vypraveni: 0,
      pocetNovych: 0,
      loading: {
        novePridane: true,
        pomnicky: true,
        krize: true,
        studanky: true,
        cesty: true,
        vypraveni: true,
      },
      mapaUrl,
      error: null,
    };
  },

  computed: {
    isTest() {
      return location.origin === testUrl;
    },

    welcomeMessage() {
      return this.isTest
        ? "Vítejte na testovacím prostředí"
        : "Vítejte na našich webových stránkách";
    },
  },

  methods: {
    toggleMenu() {
      this.responsive = !this.responsive;
    },

    filterTestItems(data) {
      const showTestItems = displayTestItems();
      return data.filter((item) => !item.temp && (showTestItems || !item.test));
    },

    async fetchCategoryCount(kategorie) {
      try {
        const response = await cachedFetch(`${apiUrl}/${kategorie}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch ${kategorie}: ${response.statusText}`
          );
        }

        const data = await response.json();
        const filtered = this.filterTestItems(data.names);
        this[kategorie] = filtered.length;
      } catch (error) {
        console.error(`Error fetching ${kategorie}:`, error);
        this.error = error.message;
      } finally {
        this.loading[kategorie] = false;
      }
    },

    async fetchNovePridane() {
      try {
        const response = await cachedFetch(`${apiUrl}/novePridane`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch novePridane: ${response.statusText}`
          );
        }

        const data = await response.json();
        this.pocetNovych = data.filter((item) => !item.test).length;
      } catch (error) {
        console.error("Error fetching novePridane:", error);
        this.error = error.message;
      } finally {
        this.loading.novePridane = false;
      }
    },
  },

  async created() {
    await Promise.all([
      ...CATEGORIES.map((kategorie) => this.fetchCategoryCount(kategorie)),
      this.fetchNovePridane(),
    ]);
  },
};
</script>

<style>
.icon {
  display: none;
  grid-column: 5/6;
  grid-row: 1/2;
  font-size: 50px;
  justify-content: center;
  align-content: center;
  color: var(--text-primary);
  margin-top: 20px;
  transition: var(--transition);
  cursor: pointer;
  z-index: 100;
  position: relative;
}

.icon:hover {
  color: var(--primary-color);
}

#pocitadlo {
  grid-row: 1/2;
  grid-column: 5/6;
  margin: auto;
  margin-top: 20px;
  z-index: 100;
  position: relative;
}

#mapabutton {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  transition: var(--transition);
}

#mapabutton:hover {
  background: linear-gradient(135deg, #0891b2 0%, #0e7490 100%);
  box-shadow: var(--shadow-md);
}

@media (max-width: 600px) {
  .icon {
    display: block;
    margin-right: 40px;
    grid-column: 5/6;
    justify-self: end;
  }
  #pocitadlo {
    grid-column: 5/6;
    grid-row: 3/4;
    margin-left: 40px;
    margin-right: 20px;
  }
}
.home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: minmax(min-content, 100px) auto minmax(min-content, 100px);
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

@media (min-width: 900px) {
  body {
    width: 100vw;
    max-width: 2000px;
    margin: auto;
    background-color: rgb(230, 236, 243);
  }
}

#uvodniText {
  justify-content: center;
  align-items: center;
  line-height: 1.7;
  grid-column: 2 / 6;
  grid-row-start: 2;
  margin: 5%;
  margin-bottom: 0;
  text-align: justify;
  color: var(--text-primary);
  position: relative;
  z-index: 10;
}

#uvodniText h1 {
  font-size: 35px;
  font-weight: 500;
  color: var(--text-primary);
  letter-spacing: -0.5px;
  margin-bottom: 20px;
}

#uvodniText h2 {
  font-family: "Patrick Hand", cursive;
  color: var(--text-primary);
}

#pozadi {
  grid-row-start: 1;
  grid-column: 1/7;
  grid-row-end: 4;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

#pozadi img {
  grid-column: 1 / 7;
  object-fit: cover;
}

#transbox {
  grid-column: 1 / 7;
  grid-row: 1 / 4;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.75) 0%,
    rgba(248, 250, 252, 0.65) 100%
  );
  backdrop-filter: blur(2px);
  margin-right: 0;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

footer {
  grid-row: 3/4;
  grid-column: 1/6;
  margin: 0 0 20px 20px;
  padding-top: 40px;
  color: var(--text-primary);
  position: relative;
  z-index: 10;
}

footer a {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  transition: var(--transition);
  border-bottom: 1px solid transparent;
}

footer a:hover {
  color: var(--primary-hover);
  border-bottom-color: var(--primary-hover);
}

@media (max-width: 600px) {
  .home {
    grid-template-rows:
      minmax(min-content, 100px) auto minmax(min-content, 100px)
      minmax(min-content, 100px);
  }

  #uvodniText {
    grid-column: 1/6;
    padding: 5%;
  }

  #uvodniText h1 {
    font-size: 30px;
  }

  #pozadi {
    grid-row: 1/5;
  }

  #transbox {
    grid-row: 1/5;
  }

  footer {
    grid-row: 4/5;
  }
}

@media (max-width: 900px) {
  #pozadi {
    height: 100%;
  }
}

h1 {
  text-align: center;
  color: var(--text-primary);
}

.nav {
  grid-column: 1/2;
  grid-row: 1/4;
  padding: 0;
  display: block;
  gap: 10px;
  grid-template-rows: repeat(7, 1fr);
  grid-template-columns: 1fr;
  margin: 20px;
  position: relative;
  z-index: 10;
}

.nav a,
.homeButton {
  grid-column: 1/2;
  opacity: 1;
  font-weight: 600;
  text-decoration: none;
  width: 100%;
  height: 50px;
  margin: 5px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  display: flex;
  justify-content: flex-start;
  padding-left: 10%;
  align-items: center;
  text-transform: uppercase;
  box-shadow: var(--shadow-sm);
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  color: var(--button-text-color);
  font-family: "Raleway", sans-serif;
  transition: var(--transition);
  letter-spacing: 0.5px;
}

@media (max-width: 600px) {
  .nav a,
  .nav .homeButton {
    display: none;
  }
}

.nav.responsive a,
.nav.responsive.homeButton {
  display: flex;
}

#uvodniText.responsive {
  display: none;
}

.nav a:hover,
.nav a:active {
  box-shadow: var(--shadow-md);
  color: white;
  border-color: #2a1709;
}

#okno {
  grid-column: 1/7;
  grid-row: 1/43;
  width: 100%;
}

#pomnickyFiltry li {
  transition: background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#pomnickyFiltry li:hover {
  background-color: #30524f;
}

.count {
  color: var(--button-text-color);
  font-size: 14px;
  font-weight: 500;
}
</style>
