<template>
  <div id="oknoPomnicky">
    <div
      v-bind:class="{ ramecek: vybraneId !== clanek.id }"
      v-for="clanek in mojeClanky"
      v-bind:key="clanek.id"
    >
      <h2 style="textAlign:center">
        {{ clanek.nazev ? clanek.nazev : clanek.jmeno }}
      </h2>

      <div v-if="vybraneId === clanek.id" id="mapaPomnicky">
        <div style="width: 100%; height:100%">
          <!-- <iframe
            scrolling="no"
            marginheight="0"
            marginwidth="0"
            v-bind:src="
              `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${clanek.latitude},%20${clanek.longitude}+(Pomn%C3%AD%C4%8Dek%20test)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
            "
            width="100%"
            height="600"
            frameborder="0"
          ></iframe> -->

          <iframe
            style="border:none"
            v-bind:src="clanek.odkazMapa"
            width="400"
            height="280"
            frameborder="0"
          ></iframe>

          <button
            class="pomnicekKategorie"
            v-on:click="schovejMapu"
           
          >
            Schovat mapu
          </button>
        </div>
      </div>

      <table v-else>
        <tr v-if="clanek.kategorie === 'pomnicky'">
          <td>Druh:</td>
          <td>{{ clanek.druh }}</td>
        </tr>
        <tr v-else-if="clanek.kategorie === 'smircikrize'">
          <td>Umístění:</td>
          <td>{{ clanek.oblast }}</td>
        </tr>

        <tr>
          <td>Okres:</td>
          <td>{{ clanek.okres }}</td>
        </tr>
        <tr>
          <td>Obec:</td>
          <td>{{ clanek.obec }}</td>
        </tr>

        <tr v-if="clanek.kategorie === 'smircikrize'">
          <td>Číslo v evidenci:</td>
          <td>{{ clanek.cislo }}</td>
        </tr>
        <tr
          v-if="
            clanek.jmeno !== clanek.nazev && clanek.kategorie === 'pomnicky'
          "
        >
          <td>Jméno:</td>
          <td>
            <strong>{{ clanek.jmeno }}</strong>
          </td>
        </tr>
        <tr v-else-if="clanek.kategorie === 'pomnicky'">
          <td>Název:</td>
          <td
            v-if="
              clanek.jmeno !== clanek.nazev && clanek.kategorie === 'pomnicky'
            "
          >
            {{ clanek.nazev }}
          </td>
          <td v-else-if="clanek.kategorie === 'pomnicky'">
            <strong>{{ clanek.nazev }}</strong>
          </td>
        </tr>

        <tr v-if="clanek.kategorie === 'pomnicky'">
          <td>Kde se nachází?</td>
          <td
            v-if="
              clanek.vnitrniOdkazy &&
                clanek.vnitrniOdkazy[0].odkazKde === 'popisCesty'
            "
          >
            <Klikaci v-bind:clanek="clanek" kdeJsem ='popisCesty' v-on:kliknuti="vyfiltrujPomnicek" />
          </td>
          <td v-else>{{ clanek.popisCesty }}</td>
        </tr>
       
        <tr v-if="clanek.kategorie === 'smircikrize'">
          <td>Kde se nachází?</td>
          <td
            v-if="
              clanek.vnitrniOdkazy &&
                clanek.vnitrniOdkazy[0].odkazKde === 'kdeSeNaleza'
            "
          >
            <Klikaci v-bind:clanek="clanek" kdeJsem ='kdeSeNaleza' v-on:kliknuti="vyfiltrujPomnicek" />
          </td>
          <td v-else >{{ clanek.kdeSeNaleza }}</td>
        </tr>

        <tr v-if="clanek.kategorie === 'pomnicky'">
          <td>Kdy vznikl?</td>
          <td>{{ clanek.kdyVznikl }}</td>
        </tr>

        <tr>
          <td v-if="clanek.kategorie === 'pomnicky'">Popis pomníčku:</td>
          <td v-if="clanek.kategorie === 'smircikrize'">Popis kříže:</td>
          <td>{{ clanek.popis }}</td>
        </tr>
        <tr>
          <td>Nápis:</td>
          <td
            v-if="
              clanek.vnitrniOdkazy &&
                clanek.vnitrniOdkazy[0].odkazKde === 'napis'
            "
          >
            <Klikaci kdeJsem='napis' v-bind:clanek="clanek" />
          </td>
          <td v-else>{{ clanek.napis }}</td>
        </tr>

        <tr v-if="clanek.kategorie === 'smircikrize'">
          <td>Pověst:</td>
          <td
            v-if="
              clanek.vnitrniOdkazy &&
                clanek.vnitrniOdkazy[0].odkazKde === 'povest'
            "
          >
            <Klikaci v-bind:clanek="clanek" kdeJsem='povest'/>
          </td>
          <td v-else>{{ clanek.povest }}</td>
        </tr>

        <tr>
          <td>Poznámka:</td>
          <td
            v-if="
              clanek.vnitrniOdkazy &&
                clanek.vnitrniOdkazy[0].odkazKde === 'pozn'
            "
          >
            <Klikaci kdeJsem ='pozn' v-bind:clanek="clanek" />
          </td>
          <td v-else>{{ clanek.pozn }}</td>
        </tr>
        <tr>
          <td>Galerie:</td>
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
        <tr v-if="clanek.kategorie === 'pomnicky'">
          <td>
            <button
              class="pomnicekKategorie"
              v-bind:style="{
                padding: '2%',
                height: '40px',
                paddingLeft: '10%',
               
              }"
              v-on:click="ukazMapu(clanek.id)"
            >
              Ukázat na mapě
            </button>
          </td>
        </tr>
        <tr>
          <td>Naposled editováno:</td>
          <td>{{ clanek.naposledObnoveno }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import Klikaci from "./../components/Klikaci.vue";
  export default {
    props: ["clanky"],
    components: { Klikaci: Klikaci },
    data() {
      return {
        vybraneId: undefined,
        testData: undefined,
        mojeClanky: this.clanky,
      };
    },

    methods: {
      ukazMapu(id) {
        for (let clanek of this.mojeClanky) {
          if (clanek.id === id) {
            this.vybraneId = id;
          }
        }
      },

      schovejMapu() {
        this.vybraneId = undefined;
      },

      vyfiltrujPomnicek(id) {
        this.$emit("kliknuti", id);
      },

     
    },
    created(){
     
      if(this.$route.name === 'NovePridane'){
        this.mojeClanky = this.clanky.filter(clanek=>clanek.kategorie==='pomnicky'||clanek.kategorie==='smircikrize')
       
      }
    }
  };
</script>

<style>
  #pomnicky h2 {
    text-align: start;
    color: #3784c7;
  }

  #oknoPomnicky button {
    background-color: #459ae6;
  }

  #oknoPomnicky button:hover {
    background-color: #898a8b;
  }

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
    margin-bottom: 5px !important;
    margin-top: 0 !important;
  }

  .odkaz a {
    color: rgb(59, 43, 204) !important;
    text-decoration: underline;
  }

  .odkaz a:hover,
  .odkaz a:active {
    color: rgb(93, 102, 143) !important;
  }

  #fotogalerie {
    display: flex;
    justify-content: flex-start;
  }

  .jednaFotka {
    /* flex-basis: 15%; */
    border: 2px solid grey;
    border-radius: 3px;
    height: 150px;
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
    max-width: 70vw;
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
    min-width: 0;
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

    .jednaFotka {
      height: 100px;
    }

    .ramecek {
      max-width: unset;
    }
  }
</style>
