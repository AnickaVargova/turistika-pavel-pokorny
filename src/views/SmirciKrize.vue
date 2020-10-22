<template>
  <div id="krize">
    <div id="pozadi1">
      <img src="./../assets/kriz.jpg" alt="kříž" />
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
      clankySmirciKrize(){
        return this.clanky.filter(clanek=>clanek.kategorie==='krize');
      }
    },

   

    created(){
      console.log(this.clanky.filter(clanek=>clanek.kategorie==='krize'));
    }
  };
</script>

<style>
  #krize {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(40, 60px);
    
  }

  #kontejnerDomu {
    margin: 20px;
    grid-column: 1/2;
    grid-row: 1/2;
  }

  #krize h1 {
    grid-row: 1/3;
    grid-column: 2/5;
    justify-self: center;
    align-self: center;
    font-size: 40px;
  }

  #krizeText {
    grid-row: 3/5;
    grid-column: 1/7;
    margin: 40px;
    font-size: 20p;
  }

   #kontejnerKrize {
    grid-column: 1/7;
    grid-row: 5;
  }

  @media(max-width: 600px)  {

    #krizeText {
      font-size:15px;
      grid-row: 3/6;
      margin-top: 20px;
      margin-bottom: 20px;
     
    }

    #kontejnerKrize {
      grid-row:6;
      width: 100vw;
      font-size: 15px;
      margin: 0;
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

  .pomnicekKategorie {
    flex-basis: 100px;
    border: 2px solid black;
    margin: 3px;
    height: 30px;
    font-weight: bold;
    color: black;
    border-radius: 10px;
    display: flex;
    justify-content: flex-start;
    padding: 2%;
    align-items: center;
    text-transform: uppercase;
    box-shadow: 5px 2px 2px #395250;
    background-color: #6bc5aa;
    font-size: 13px;
  }

  /* #domu {
    background-color: mediumturquoise;
    margin-bottom: 20px;
  }

  #domu a {
    background-color: rgb(137, 173, 172);
  } */

  #pozadi1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    height: 300vh;
  }

  #krize #transbox1 {
    grid-column: 1 / 7;
    grid-row: 1 / 20;
    width: 100vw;
    height: 300vh;
    background-color: rgba(196, 226, 208, 0.8);
    margin-right: 0;
  }

 
  #krize #pozadi1 img {
    object-fit: cover;
  }
</style>
