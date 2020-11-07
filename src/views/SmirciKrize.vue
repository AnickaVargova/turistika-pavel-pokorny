<template>
  <div id="krize">
    <div id="pozadi1">
      <img src="./../assets/pozadiKapky.jpg" alt="Pozadí" />
    </div>

    <div id="transbox1"></div>
    <div id="kontejnerDomu">
      <router-link to="/">
        <div class="pomnicekKategorie" id="domu">Domů</div>
      </router-link>
    </div>
    <h1>Smírčí kříže</h1>
    <p id="krizeText">
      Tady bude uvodni text. Lorem ipsum dolor sit amet consectetur adipisicing
      elit. Dignissimos suscipit fuga natus, delectus autem voluptates?
      Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendis
      officiis, veritatis dolor ipsum impedit laudantium! Nihil?
    </p>

    <div id="kontejnerKrize">
      <OknoPomnicky v-bind:clanky="clankySmirciKrize" />
    </div>
  </div>
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  import OknoPomnicky from "./../components/OknoPomnicky.vue";
  export default {
    components: {
      OknoPomnicky: OknoPomnicky,
    },

    data() {
      return {
        clanky: vsechnyClanky.data,
      };
    },

    computed: {
      clankySmirciKrize() {
        return this.clanky.filter((clanek) => clanek.kategorie === "krize");
      },
    },
  };
</script>

<style>
  #krize {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
  }

  #krize #domu {
    margin-bottom: 0;
  }

  #kontejnerDomu {
    margin: 20px;
    grid-column: 1/2;
    grid-row: 1/2;
  }

  #krize h1 {
    grid-row: 2/3;
    grid-column: 1/7;
    justify-self: center;
    align-self: center;
    font-size: 40px;
    margin: 0;
  }

  @media (max-width: 600px) {
    #krize h1 {
      font-size: 30px;
      margin: 0;
      padding: 0;
    }
  }

  #krizeText {
    grid-row: 3/5;
    grid-column: 1/7;
    margin: 40px;
  }

  #kontejnerKrize {
    grid-column: 1/7;
    grid-row: 5;
    padding: 30px;
    padding-top: 0;
  }

  @media (max-width: 600px) {
    #krizeText {
      font-size: 15px;
      grid-row: 3/6;
      margin-top: 20px;
      margin-bottom: 20px;
    }

    #kontejnerKrize {
      grid-row: 6;
      width: 100vw;
      font-size: 15px;
      padding: 0;
    }

    #krize #oknoPomnicky {
      margin: 0;
      padding: 0;
      border-radius: 0;
      font-size: 15px;
    }
  }

  #pomnickyNavigace {
    grid-column: 1/2;
    grid-row: 1/16;
    margin: 23px;
    display: flex;
    flex-direction: column;
  }

  #krize #pozadi1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    height: auto;
  }

  #krize #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    background-color: rgba(196, 226, 208, 0.8);
    margin-right: 0;
  }

  #krize #pozadi1 img {
    object-fit: cover;
  }
</style>
