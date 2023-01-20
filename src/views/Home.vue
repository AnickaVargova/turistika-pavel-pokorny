<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/uvodniStrana.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div v-bind:class="{ responsive: responsive }" id="uvodniText">
      <h1>{{isTest ? 'Vítejte na testovacím prostředí' : 'Vítejte na našich webových stránkách.'}}</h1>
      <h2>Postupně doplňujeme pomníčky, smírčí kříže, cesty a vyprávění.</h2>
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

    <div v-bind:class="{ nav: true, responsive: responsive }">
      <div>
        <Loader class="homeButton" v-if="loading.novePridane" />
        <router-link v-else to="/novepridane"
          >Naposled přidané ({{ pocetNovych }})</router-link
        >
      </div>
      <div>
        <a v-bind:href="mapaUrl" target="_self" style="background: #72dac1">
          Mapa </a
        >
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.pomnicky" />
        <router-link v-else to="/pomnicky">Pomníčky ({{ pomnicky }}) </router-link>
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.krize" />
        <router-link v-else to="/krize">Smírčí kříže ({{ krize }})</router-link>
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.studanky" />
        <router-link v-else to="/studanky">Studánky ({{ studanky }})</router-link>
      </div>
      <div>
        <Loader class="homeButton" v-if="loading.cesty" />
        <router-link v-else to="/cesty">Cesty ({{ cesty }})</router-link>
</div>
      <div>
        <Loader class="homeButton" v-if="loading.vypraveni" />
        <router-link v-else to="/vypraveni">Vyprávění ({{ vypraveni }})</router-link>
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

    <a href="javascript:void(0);" class="icon" v-on:click="toggleMenu">
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
import { displayTestItems} from "../utils/displayTestItems";
import { apiUrl, testUrl, mapaUrl } from "../utils/url";

export default {
  components: { Loader},
  data() {
    return {
      isTest: location.origin === testUrl,
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
        vypraveni: true
      },
      mapaUrl
    };
  },

  methods: {
    toggleMenu() {
      this.responsive = !this.responsive;
    },
  },
  created() {
  
    ['pomnicky', 'krize', 'studanky', 'vypraveni', 'cesty'].map(kategorie => {
    fetch(`${apiUrl}/${kategorie}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (this[kategorie] = data.names.filter(item => !item.temp && (!displayTestItems() ? !item.test : true)).length))
      .then(() => (this.loading[kategorie] = false));
    });
    fetch(`${apiUrl}/novePridane`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {this.pocetNovych = data.length})
      .then(() => (this.loading.novePridane = false));
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
  color: darkslategrey;
  margin-top: 20px;
}

#pocitadlo {
  grid-row: 1/2;
  grid-column: 5/6;
  margin: auto;
  margin-top: 20px;
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
  line-height: 1.5;
  grid-column: 2 / 6;
  grid-row-start: 2;
  margin: 5%;
  margin-bottom: 0;
  text-align: justify;
  color: #1e0b3d;
}

#uvodniText h1 {
  font-size: 40px;
  color: #1e0b3d;
}

#uvodniText h2 {
  font-family: "Patrick Hand", cursive;
  color: #1e0b3d;
  /* color: #2c3e50; */
}

#pozadi {
  grid-row-start: 1;
  grid-column: 1/7;
  grid-row-end: 4;
  width: 100%;
  height: 100%;
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
  background-color: rgba(246, 244, 250, 0.7);
  /* background-color: rgba(178, 203, 223, 0.7); */
  margin-right: 0;
}

footer {
  grid-row: 3/4;
  grid-column: 1/6;
  margin: 0 0 20px 20px;
  padding-top: 40px;
  color: #1e0b3d;
}

footer a {
  color: #1e0b3d;
  text-decoration: underline;
}

footer a:hover {
  color: rgb(69, 67, 71);
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
  color: #2c3e50;
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
}

.nav a,
.homeButton {
  grid-column: 1/2;
  opacity: 1;
  font-weight: bold;
  text-decoration: none;
  width: 100%;
  height: 50px;
  margin: 5px;
  border: 2px solid #2c3e50;
  border-radius: 10px;
  display: flex;
  justify-content: flex-start;
  padding-left: 10%;
  align-items: center;
  text-transform: uppercase;
  box-shadow: 5px 2px 2px #395250;
  background-color: #7695dd;
  color: #13131d;
  font-family: "Raleway", sans-serif;
}

@media (max-width: 600px) {
  .nav a, .nav .homeButton {
    display: none;
  }
}

.nav.responsive a, .nav.responsive.homeButton {
  display: flex;
}

#uvodniText.responsive {
  display: none;
}

.nav a:hover,
.nav a:active {
  color: #13131d;
  background-color: #9aacab;
}

#okno {
  grid-column: 1/7;
  grid-row: 1/43;
  width: 100%;
}

#pomnickyFiltry li:hover {
  background-color: #30524f;
}
</style>
