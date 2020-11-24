<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/uvodniStrana.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div v-bind:class="{ responsive: responsive }" id="uvodniText">
      <h1>Vítejte na našich zatím nedokončených webových stránkách.</h1>
      <h2>Jediné, co funguje, jak má, je tlačítko  MOJE  RAJČE.</h2>
      <p>
         
        Naše webové stránky se zabývají regionální vlastivědou v Brně a okolí, turistikou a
        cestováním po republice i po Evropě. Popisují pomníčky, smírčí kříže,
        studánky a další objekty turistického zájmu v okruhu zhruba třiceti
        kilometrů od Brna, tedy oblast vymezenou Vyškovem a Ždánicemi na
        východě, Novomlýnskými nádržemi na jihu, Moravským Krumlovem, Náměští a
        Velkou Bíteší na západě a Nedvědicemi a Boskovicemi na severu. Až na
        výjimky se nalézají v přírodě, mimo zástavbu. Pomníky v intravilánu obcí
        nehledáme. Návodem se pro nás stala Kniha o Jizerských horách od
        Miloslava Nevrlého, která vyšla poprvé v roce 1978 a od té doby ještě
        čtyřikrát. Navazovala na odvěkou touhu člověka hledat, nalézat,
        objevovat. V osmdesátých letech jsme začali hledat pomníčky kolem Brna a
        dosud nepřestali. Tehdy byly k dispozici jen nepřesné mapy a GPS ještě
        nebylo vynalezeno. Počet těchto objektů přesahuje odhadem tisícovku a
        mění se, některé přibývají, jiné zanikají. Doufáme, že tyto stránky se
        mohou stát vaší inspirací k výletům a vyjížďkám do spanilého okolí
        brněnského.
      </p>
    </div>
    <footer>
      <small
        >&copy; <span>Copyright 2020&nbsp</span
        ><a href="mailto:anna.vargova@seznam.cz?Subject=''">
          Anna Vargová</a
        ></small
      >
    </footer>

    <div v-bind:class="{ nav: true, responsive: responsive }">
      <router-link to="/pomnicky">Pomníčky </router-link>

      <!-- <router-link to="/studanky">Studánky </router-link> -->

      <router-link to="/smircikrize">Smírčí kříže </router-link>

      <router-link to="/cesty/1">Cesty </router-link>

      <router-link to="/vypraveni/18">Vyprávění</router-link>

      <router-link to="/onas">O nás</router-link>

      <router-link to="/odkazy">Sympatické weby</router-link>

      <a href="mailto:pokorny.pavel1@centrum.cz?Subject=Pozdrav"> Kontakt</a>

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
  export default {
    data() {
      return {
        responsive: false,
      };
    },

    methods: {
      toggleMenu() {
        this.responsive = !this.responsive;
      },
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
    }
    #pocitadlo {
      grid-column: 1/2;
      grid-row: 9/10;
      margin-left: 40px;
    }
  }
  .home {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    min-height: 100vh;
    /* grid-template-rows: repeat(14, 60px); */
    margin: 0;
    padding: 0;
    /* height: 100vh;
     */
  }

  @media(min-width: 900px){
    body {
    height: 100vh;
       }

   #pozadi {
     height: 100vh;
     /* overflow: hidden; */
   }
  }

  #uvodniText {
    justify-content: center;
    align-items: center;
    line-height: 1.5;
    grid-column: 2 / 6;
    grid-row: 2 / 6;
    margin: 5%;
  }

  #uvodniText h1 {
    font-size: 40px;
  }

   #uvodniText h2 {
    font-family:  'Patrick Hand', cursive;
    color: #2c3e50;
  }

  @media (max-width: 600px) {
    #uvodniText {
      grid-column: 1/6;
      padding: 5%;
    }

    #uvodniText h1 {
      font-size: 30px;
    }
  }

  #pozadi {
    grid-row-start: 1;
    grid-column: 1/6;
    grid-row-end: 40;
    width: 100vw;
    /* height: 100vh; */
    /* display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px); */
  }

  #pozadi img {
    grid-column: 1 / 7;
    /* grid-row: 1 / 14; */
    
    /* height: 100vh; */
    width: 100vw;
    object-fit: cover;
  }

  #transbox {
    grid-column: 1 / 7;
    grid-row: 1 / 40;
    width: 100vw;
    /* height: 100vh; */
    background-color: rgba(160, 193, 221, 0.5);
    margin-right: 0;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
  }

  .nav {
    grid-column: 1/2;
    grid-row: 1/11;
    padding: 0;
    display: grid;
    gap: 10px;
    grid-template-rows: repeat(10, 1fr);
    margin: 20px;
  }

  .nav a {
    opacity: 1;
    font-weight: bold;
    text-decoration: none;
    width: 100%;
    height: 100%;
    border: 2px solid #2c3e50;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    padding-left: 10%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;
    background-color: #6bc5aa;
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

  footer {
    grid-row: 13/14;
    grid-column: 1/3;
    margin-left: 20px;
    padding-top: 40px;
    color: black;
  }

  footer a {
    color: black;
    text-decoration: underline;
  }

  footer a:hover {
    color: rgb(34, 32, 32);
  }
</style>
