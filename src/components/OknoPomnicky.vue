<template>
  <div>
    <Loader v-if="this.loading" />

    <div
      id="oknoPomnicky"
      v-if="
        !this.loading &&
        this.mojeClanky.length &&
        (this.$route.name === 'DetailPomnicku' ||
          this.$route.name === 'DetailKrize' ||
          this.$route.name === 'DetailStudanky' ||
          this.$route.name === 'NovePridane' ||
          this.$route.name === 'NovyPomnicek' ||
          this.$route.name === 'NovyKriz' ||
          this.$route.name === 'NovaStudanka' ||
          !this.zalozky)
      "
    >
      <div
        v-bind:class="{ ramecek: idMapaUkazat !== clanek.id }"
        v-for="clanek in mojeClanky"
        v-bind:key="clanek.id"
      >
        <h2 style="text-align: center">
          {{ clanek.nazev ? clanek.nazev : clanek.jmeno
          }}{{
            clanek.kategorie === "krize" && $route.name === "NovePridane"
              ? "  (smírčí kříž)"
              : null
          }}
        </h2>

        <table>
          <tr>
            <td>
              {{ clanek.kategorie === "pomnicky" ? "Druh:" : "Umístění:" }}
            </td>
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

          <tr v-if="clanek.kategorie === 'krize'">
            <td>Číslo v evidenci:</td>
            <td>{{ clanek.cisloEvid }}</td>
          </tr>
          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>Jméno:</td>
            <td>
              <strong>{{ clanek.jmeno }}</strong>
            </td>
          </tr>

          <tr>
            <td>Kde se nachází?</td>
            <td>
              <span v-html="clanek.popisCesty"></span>
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'popisCesty'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="popisCesty"
              />
            </td>
          </tr>

          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>
              {{
                clanek.kategorie === "pomnicky" ? "Kdy vznikl?" : "Kdy vznikla?"
              }}
            </td>
            <td v-html="clanek.kdyVznikl" />
          </tr>

          <tr>
            <td>Popis:</td>
            <td>
              <span v-html="clanek.popis" />
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'popis'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="popis"
              />
            </td>
          </tr>

          <tr>
            <td>Nápis:</td>
            <td>
              <span v-html="clanek.napis" />
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'napis'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="napis"
              />
            </td>
          </tr>

          <tr v-if="clanek.kategorie === 'studanky'">
            <td>Využitelnost:</td>
            <td>
              <span v-html="clanek.vyuzitelnost" />
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'vyuzitelnost'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="vyuzitelnost"
              />
            </td>
          </tr>

          <tr v-if="clanek.kategorie === 'krize'">
            <td>Pověst:</td>
            <td>
              <span v-html="clanek.povest" />
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'povest'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="povest"
              />
            </td>
          </tr>

          <tr>
            <td>Poznámka:</td>
            <td>
              <span v-html="clanek.pozn" />
              <Klikaci
                v-if="
                  clanek.vnitrniOdkazy &&
                  clanek.vnitrniOdkazy.length &&
                  clanek.vnitrniOdkazy.find(
                    (odkaz) => odkaz.odkazKde.trim() === 'pozn'
                  )
                "
                v-bind:clanek="clanek"
                kdeJsem="pozn"
              />
            </td>
          </tr>

          <tr>
            <td>Galerie:</td>
            <div
              id="fotogalerie"
              v-if="clanek.galerie"
              v-bind:class="{ galerieEdge: isEdgeChromium }"
            >
              <div
                v-for="(obrazek, index) in clanek.galerie"
                v-bind:key="index"
                class="jednaFotka"
                v-bind:class="{ jednaFotkaEdge: isEdgeChromium }"
              >
                <router-link
                  v-bind:to="`/fotodetail/${clanek.kategorie}/${
                    clanek.id
                  }/${obrazek.fotka.trim()}`"
                  ><img
                    v-bind:src="`${apiUrl}/photos/small/${obrazek.fotka.trim()}`"
                    alt="Fotodetail"
                    v-bind:class="{ imgEdge: isEdgeChromium }"
                /></router-link>
              </div>
            </div>
          </tr>

          <tr>
            <td>Odkazy:</td>
            <td v-if="clanek.odkazy">
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
            <td>Naposled editováno:</td>
            <td>{{ clanek.naposledObnoveno }}</td>
          </tr>
          <tr
            v-if="
              clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
            "
          >
            <td>
              <button
                class="commonButton"
                v-if="clanek.odkazMapa && idMapaUkazat !== clanek.id"
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
        </table>

        <div v-if="idMapaUkazat === clanek.id" id="mapaPomnicky">
          <div style="width: 100%; height: 100%">
            <iframe
              style="border: none"
              v-bind:src="clanek.odkazMapa.trim()"
              width="400"
              height="280"
              frameborder="0"
            ></iframe>

            <button class="commonButton" v-on:click="schovejMapu">
              Schovat mapu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Klikaci from "./../components/Klikaci.vue";
import Loader from "./Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl } from "../utils/url";

export default {
  props: ["kategoriePomnicky", "zalozky", "stranka"],
  components: { Klikaci, Loader },
  data() {
    return {
      idMapaUkazat: undefined,
      testData: undefined,
      mojeClanky: [],
      metadata: [],
      isEdgeChromium: false,
      loading: true,
      names: [],
      apiUrl,
    };
  },

  methods: {
    ukazMapu(id) {
      for (let clanek of this.mojeClanky) {
        if (clanek.id === id) {
          this.idMapaUkazat = id;
        }
      }
    },

    schovejMapu() {
      this.idMapaUkazat = undefined;
    },
  },
  created() {
    if (
      this.$route.name === "DetailPomnicku" ||
      this.$route.name === "NovyPomnicek" ||
      this.$route.name === "DetailKrize" ||
      this.$route.name === "NovyKriz" ||
      this.$route.name === "DetailStudanky" ||
      this.$route.name === "NovaStudanka"
    ) {
      fetch(
        `${this.apiUrl}/${this.stranka}/${this.$route.params.kategorie}/${this.$route.params.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.temp && (!displayTestItems() ? !data.test : true)) {
            this.mojeClanky = [data];
          }
        })
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          window.scrollTo(0, sessionStorage.getItem("scrollY"));
          sessionStorage.removeItem("scrollY");
        });
    } else if (
      this.$route.name === "PomnickyKategorieLong" ||
      this.$route.name === "SmirciKrizeKategorieLong" ||
      this.$route.name === "StudankyKategorieLong"
    ) {
      fetch(`${this.apiUrl}/${this.stranka}/${this.$route.params.kategorie}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(
          (data) =>
            (this.mojeClanky = data.filter((item) =>
              !displayTestItems() ? !item.test : true
            ))
        )
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          window.scrollTo(0, sessionStorage.getItem("scrollY"));
          sessionStorage.removeItem("scrollY");
        });
    } else if (this.$route.name === "NovePridaneLong") {
      fetch(`${this.apiUrl}/novePridane/long`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then(
          (data) =>
          (this.mojeClanky = data
              .filter((item) => (!displayTestItems() ? !item.test : true))
              .filter(
                (item) =>
                  item.kategorie !== "vypraveni" && item.kategorie !== "cesty"
              ))
        )
        .then(() => (this.loading = false))
        .then(() => {
          window.scrollTo(0, sessionStorage.getItem("scrollY"));
          sessionStorage.removeItem("scrollY");
        });
    }
    var isChrome =
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

    // Blink engine detection
    // var isBlink = (isChrome || isOpera) && !!window.CSS;

    this.isEdgeChromium = isEdgeChromium;
  },
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

td:nth-child(2) {
  text-align: justify;
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
  flex-wrap: wrap;
}

.galerieEdge {
  flex-wrap: wrap;
}

.jednaFotka {
  border: 2px solid grey;
  border-radius: 3px;
  height: 150px;
  margin: 20px;
  margin-left: 0;
}

.jednaFotkaEdge {
  width: min-content;
}

.smallPhoto {
  height: 150px;
}

.imgEdge {
  object-fit: cover;
  width: unset;
  height: 100%;
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
  width: 100%;
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

#mapaPomnicky .commonButton {
  padding-left: 2%;
  margin-bottom: 20px;
  min-width: 0;
}

td .commonButton {
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
