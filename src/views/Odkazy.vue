<template>
  <div id="odkazy">
    <div id="pozadi1">
      <img src="./../assets/presypy.jpg" alt="Pozadí" />
    </div>

    <div id="transbox1"></div>

    <router-link class="kontejnerDomuOnas" to="/">
      <div class="pomnicekKategorie" id="domuOnas">Domů</div>
    </router-link>

    <h1>Sympatické weby</h1>

    <div id="oknoOdkazy">
      <div class="odkazy" v-for="(odkaz, index) in odkazy" v-bind:key="index">
        <a v-bind:href="odkaz.adresa" target="_blank">{{ odkaz.jmeno }}</a>
        <span>{{ odkaz.popis }}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import odkazy from "@/components/odkazy.js";
  export default {
    data() {
      return {
        odkazy: odkazy,
      };
    },
  };
</script>

<style>
  #odkazy {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
  }

  #odkazy #transbox1 {
    background-color: rgba(183, 202, 202, 0.6);
  }

  #odkazy h1 {
    grid-column: 1/7;
    grid-row: 2/3;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #oknoOdkazy {
    grid-column: 1/7;
    grid-row:3/8;
    margin: 20px;
    background-color: rgb(240, 233, 223);
    border: 2px solid grey;
    border-radius: 10px;
    padding: 20px;
  }

  #oknoOdkazy .odkazy {
    font-size: 20px;
    line-height: normal;
    margin-top: 20px;
  }

  .odkazy a {
    margin: 0;
    margin-right: 3%;
    padding: 0;
    color: rgb(23, 59, 37);
    text-decoration: underline;
  }

  #odkazy a:hover,
  #odkazy a:active {
    color: darkolivegreen;
  }

  #odkazy span {
    font-size: 15px;
  }

  @media (max-width: 600px) {
    #oknoOdkazy {
    grid-column: 1/7;
    grid-row:3/11;
    width: 80vw;
    margin: auto;
    background-color: rgb(240, 233, 223);
    border: 2px solid grey;
    border-radius: 10px;
    padding: 20px;
    }

    #oknoOdkazy .odkazy {
      font-size: 15px;
    }

    #odkazy span {
      font-size: 15px;
    }
  }
</style>
