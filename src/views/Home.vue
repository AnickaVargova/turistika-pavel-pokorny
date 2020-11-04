<template>
  <div class="home">
    <div id="pozadi">
      <img src="./../assets/foto01.jpg" alt="hory" />
    </div>

    <div id="transbox"></div>
    <div v-bind:class="{ responsive: responsive }" id="uvodniText">
      <h1>Vítejte na našich zatím nedokončených webových stránkách.</h1>
      <p>
       Až je dokončíme, najdete zde nejrůznější zajímavá místa v okolí Brna i jinde. Tak nám držte palce, ať se to brzy povede. 
      </p>
    </div>

    <div v-bind:class="{ nav: true, responsive: responsive }">
      <router-link to="/pomnicky">Pomníčky </router-link>

      <router-link to="/studanky">Studánky </router-link>

      <router-link to="/smircikrize">Smírčí kříže </router-link>

      <router-link to="/cesty/1">Cesty </router-link>

      <router-link to="/vypraveni/1">Vyprávění</router-link>

      <router-link to="/onas">O nás</router-link>

      <router-link to="/odkazy">Sympatické weby</router-link>

      <a href="mailto:someone@example.com?Subject=Pozdrav"> Kontakt</a>

      <a href="https://turistapavel.rajce.idnes.cz/" target="_blank">
        Moje rajče</a
      >
    </div>
    <a href="javascript:void(0);" class="icon" v-on:click="toggleMenu">
      <i class="fa fa-bars"></i>
    </a>
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

  @media (max-width: 600px) {
    .icon {
      display: block;
    }
  }
  .home {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: grid;
    grid-template-columns: repeat(6, 20%);
    grid-template-rows: repeat(40, 60px);
    margin: 0;
    padding: 0;
  }

  #uvodniText {
    justify-content: center;
    align-items: center;
    grid-column: 2 / 6;
    grid-row: 2 / 6;
    margin: 5%;
  }

  #uvodniText h1 {
    font-size: 40px;
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
    grid-row: 1/15;
    grid-column: 1/7;
    width: 100vw;
    height: 300vh;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #pozadi img {
    grid-column: 1 / 7;
    grid-row: 1 / 14;
    height: 300vh;
    width: 100vw;
    object-fit: cover;
  }

  #transbox {
    grid-column: 1 / 7;
    grid-row: 1 / 14;
    width: 100vw;
    height: 300vh;
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

  #pomnickyFiltry {
    grid-column: 5 / span 1;
    grid-row: 2/4;
    background-color: #9aacab;
    border: 2px solid black;
    padding: 10px;
    border-radius: 3px;
  }

  #pomnickyFiltry li:hover {
    background-color: #30524f;
  }
</style>

