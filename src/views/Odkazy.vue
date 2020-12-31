<template>
  <div id="odkazy">
    <div id="transbox1">
      <router-link class="kontejnerDomuOnas" to="/">
        <div
          class="pomnicekKategorie"
          id="domuOnas"
          v-bind:style="{ margin: '20px' }"
        >
          Úvodní strana
        </div>
      </router-link>

      <h1>Sympatické weby</h1>

      <div id="oknoOdkazy">
        <div class="odkazy" v-for="(odkaz, index) in odkazy" v-bind:key="index">
          <a v-bind:href="odkaz.adresa" target="_blank">{{ odkaz.jmeno }}</a>
          <span>{{ odkaz.popis }}</span>
        </div>
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
    background-image: url("./../assets/presypy.jpg");
    width: 100%;
  }

  #domuOnas {
   
    height: 40px;
    padding: 0 10px;
    margin-bottom: 40px;
    width: 116px;
    height: 35px;
    background-color: #459ae6;
  }

  #domuOnas:hover {
    color: #13131d;
    background-color: #9aacab;
  }

  .kontejnerDomuOnas {
    grid-column: 6/7;
    grid-row: 1/3;
  }

  #odkazy .pomnicekKategorie {
    min-width: 0;
  }

  #odkazy #transbox1 {
    background-color: rgba(183, 202, 202, 0.6);
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-auto-rows: 60px;
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
    grid-row-start: 3;
    margin: auto;
    background-color: rgb(240, 233, 223);
    border: 2px solid grey;
    border-radius: 10px;
    padding: 20px;
    margin-top: 50px;
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
      grid-row-start: 3;
      margin: auto;
      background-color: rgb(240, 233, 223);
      border: 2px solid grey;
      border-radius: 10px;
      padding: 20px;
      margin-top: 40px;
    }

    #oknoOdkazy .odkazy {
      font-size: 15px;
    }

    #odkazy span {
      font-size: 15px;
    }
  }
</style>
