<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/uvodniStrana.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div v-bind:class="{ responsive: responsive }" id="uvodniText">
      <h1>Vítejte na našich zatím nedokončených webových stránkách.</h1>
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
      <router-link to="/novepridane"
        >Naposled přidané ({{ pocetNovych }})</router-link
      >

      <router-link to="/pomnicky">Pomníčky ({{ pocetPomnicku }}) </router-link>

      <!-- <router-link to="/studanky">Studánky </router-link> -->

      <router-link to="/smircikrize"
        >Smírčí kříže ({{ pocetKrizu }})</router-link
      >

      <router-link to="/cesty">Cesty ({{ pocetCest }})</router-link>

      <router-link to="/vypraveni"
        >Vyprávění ({{ pocetVypraveni }})</router-link
      >

      <router-link to="/onas">O nás</router-link>

      <router-link to="/odkazy">Sympatické weby</router-link>

      <a href="https://turistapavel.rajce.idnes.cz/" target="_blank">
        Moje rajče</a
      >
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
  import clanky from "./../components/clanky.js";
  export default {
    data() {
      return {
        responsive: false,
        pocetPomnicku: 0,
        pocetKrizu: 0,
        pocetCest: 0,
        pocetVypraveni: 0,
        pocetNovych: 0,
      };
    },

    methods: {
      toggleMenu() {
        this.responsive = !this.responsive;
      },
      filterRecent(clanek) {
        if (clanek.pridano) {
          let pridano = clanek.pridano;
          pridano = Date.parse(
            pridano.slice(3, 6).concat(pridano.slice(0, 3), pridano.slice(6))
          );

          let today = new Date().getTime();

          let last2weeks = (today - pridano) / 1000 / 60 / 60 / 24;

          if (last2weeks <= 14) {
            if (
              clanek.kategorie === "pomnicky" ||
              clanek.kategorie === "smircikrize"
            ) {
              this.pomnickyUkazat = true;
            } else if (
              clanek.kategorie === "vypraveni" ||
              clanek.kategorie === "cesty"
            ) {
              this.clankyUkazat = true;
            }
          }

          return last2weeks <= 14;
        }
      },
    },
    created() {
      
      for (let j = 0; j < clanky.data.length; j++) {
        if (clanky.data[j].kategorie === "pomnicky") {
          this.pocetPomnicku++;
        } else if (clanky.data[j].kategorie === "smircikrize") {
          this.pocetKrizu++;
        } else if (clanky.data[j].kategorie === "cesty") {
          this.pocetCest++;
        } else if (clanky.data[j].kategorie === "vypraveni") {
          this.pocetVypraveni++;
        }
        for (let i = 0; i < j; i++) {
          if (
            clanky.data[j].kategorie === "pomnicky" &&
            clanky.data[j].nazev === clanky.data[i].nazev
          ) {
            this.pocetPomnicku--;
          }
        }
      }

      //vyfiltruji se clanky podle data

      let clanky14dni = clanky.data.filter((clanek) =>
        this.filterRecent(clanek)
      );

      //zjisti se, ktere clanky z clanku podle data nejsou v poslednich 10 clancich podle id a tyto clanky se do 10 clanku podle id pridaji

      let poslednich10 = clanky.data.slice(-10);

      let vysledneNove = [];

      for (let clanek14 of clanky14dni) {
        let pridat = true;
        for (let clanek10 of poslednich10) {
          if (clanek10.id === clanek14.id) {
            pridat = false;
            break;
          }
        }
        if (pridat) {
          vysledneNove.push(clanek14);
        }
      }

      vysledneNove = vysledneNove.concat(poslednich10);

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

      this.pocetNovych = novaKategorie.length;
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
    grid-template-rows: minmax(min-content, 100px) auto minmax(
        min-content,
        100px
      );
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }

  @media (min-width: 900px) {
    body {
      width: 100vw;
      max-width: 1600px;
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

  .nav a {
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
    /* background-color: #6bc5aa; */
    color: #13131d;
  }

  @media (max-width: 600px) {
    .nav a {
      display: none;
    }
  }

  .nav.responsive a {
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
