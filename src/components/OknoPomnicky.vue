<template>
  <div id="oknoPomnicky">
    <div
      v-bind:class="{ ramecek: vybraneId !== clanek.id }"
      v-for="clanek in clanky"
      v-bind:key="clanek.id"
    >
      <div v-if="vybraneId === clanek.id" id="mapaPomnicky">
        <div style="width: 100%; height:100%">
          <iframe
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            v-bind:src="
              `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${clanek.latitude},%20${clanek.longitude}+(Pomn%C3%AD%C4%8Dek%20test)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
            "
            width="100%"
            height="600"
            frameborder="0"
          ></iframe>
        
          <!-- <iframe style="border:none" src="https://frame.mapy.cz/s/lohaguleba" width="400" height="280" frameborder="0"></iframe> -->
          <button class="pomnicekKategorie" v-on:click="schovejMapu">
            Schovat mapu
          </button>
        </div>
      </div>

      <table v-else>
        <tr>
          <td>Druh:</td>
          <td>{{ clanek.druh }}</td>
        </tr>
        <tr>
          <td>Okres:</td>
          <td>{{ clanek.okres }}</td>
        </tr>
        <tr>
          <td>Obec:</td>
          <td>{{ clanek.obec }}</td>
        </tr>
        <tr v-if="clanek.jmeno">
          <td>Jméno:</td>
          <td><strong>{{ clanek.jmeno }}</strong></td>
        </tr>
        <tr v-if="clanek.nazev">
          <td >Název:</td>
          <td>{{ clanek.nazev }}</td>
        </tr>
        <tr>
          <td>Kde se nachází?</td>
          <td>{{ clanek.popisCesty }}</td>
        </tr>
        <tr>
          <td>Kdy vznikl?</td>
          <td>{{ clanek.kdyVznikl }}</td>
        </tr>

        <tr>
          <td>Popis:</td>
          <td>{{ clanek.popis }}</td>
        </tr>
        <tr>
          <td>Nápis:</td>
          <td>{{ clanek.napis }}</td>
        </tr>
        <tr>
          <td>Poznámka:</td>
          <td>{{ clanek.pozn }}</td>
        </tr>

        <tr>
          <td>Fotky:</td>
          <div id="fotogalerie">
            <div
              v-for="(obrazek, index) in clanek.galerie"
              v-bind:key="index"
              class="jednaFotka"
            >
              <router-link
                v-bind:to="
                  `/fotodetail/${clanek.podkategorie}/${obrazek.fotka}`
                "
                ><img
                  v-bind:src="require(`./../assets/${obrazek.fotka}`)"
                  alt="Fotodetail"
              /></router-link>
            </div>
          </div>
        </tr>
        <tr>
          <td>Odkazy:</td>
          <td>
            <p
              class="odkaz"
              v-for="(odkaz, index) in clanek.odkazy"
              v-bind:key="index"
            >
              <span v-if="odkaz.adresa"
                ><a v-bind:href="odkaz.adresa" target="_blank"
                  >{{ odkaz.nazev }}
                </a></span
              >
              <span v-else>{{ odkaz.nazev }}</span>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <button class="pomnicekKategorie" v-on:click="ukazMapu(clanek.id)">
              Ukázat na mapě
            </button>
          </td>
        </tr>
        <tr>
          <td>Naposled obnoveno:</td>
          <td>{{ clanek.naposledObnoveno }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["clanky"],
    data() {
      return {
        vybraneId: undefined,
      };
    },

    methods: {
      ukazMapu(id) {
        for (let clanek of this.clanky) {
          if (clanek.id === id) {
            this.vybraneId = id;
          }
        }
      },

      schovejMapu() {
        this.vybraneId = undefined;
      },

      
    },

   
  };
</script>

<style>
  table {
    padding: 10px;
  }

  tr {
    height: 20px;
  }

  td:nth-child(odd) {
    font-weight: bold;
    vertical-align: top;
    width: 15%;
  }

  .odkaz {
    margin: 0 !important;
  }

  .odkaz a {
    color: rgb(23, 59, 37) !important;
    text-decoration: underline;
  }

  .odkaz a:hover,
  .odkaz a:active {
    color: darkolivegreen !important;
  }

  #fotogalerie {
    display: flex;
    justify-content: flex-start;
  }

  .jednaFotka {
    flex-basis: 15%;
    border: 2px solid grey;
    border-radius: 3px;
    height: 50px;
    margin: 20px;
    margin-left: 0;
  }

  .jednaFotka:hover {
    border: 2px solid black;
  }

  .ramecek {
    border: 1px solid grey;
    border-radius: 10px;
    margin: auto;
    margin-top: 10px;
    width: 70vw;
  }

  #mapaPomnicky {
    width: 70vw;
    height: 80vh;
    margin: auto;
  }

  #mapaPomnicky iframe {
    height: 90%;
    width: 100%;
    margin-bottom: 10px;
    border: 2px solid grey;
    border-radius: 10px;
  }

  #mapaPomnicky iframe:hover {
    border: 2px solid black;
  }

  #mapaPomnicky .pomnicekKategorie {
    padding-left: 2%;
    margin-bottom: 20px;
  }

  td .pomnicekKategorie {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 10px;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 600px) {
    #oknoPomnicky .ramecek {
      border: none;
      border-bottom: 1px solid grey;
      border-radius: 0;
      margin: 0;
      width: 100vw;
    }

    #oknoPomnicky .ramecek:last-child {
      border-bottom: none;
    }

    #mapaPomnicky {
      width: 100vw;
      height: 90vh;
    }

    #mapaPomnicky iframe {
      border: none;
      border-radius: 0;
    }

    #mapaPomnicky iframe:hover {
      border: none;
    }
  }
</style>
