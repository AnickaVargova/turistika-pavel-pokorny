<template>
  <div
    id="detailClanku"
    v-bind:style="{
      backgroundColor: 'beige',
      backgroundImage: 'none',
      padding: '2%',
      minHeight: '100vh',
    }"
  >
    <Loader v-if="this.loading" />
    <div v-else id="detailOkno">
      <router-link to="/" id="tlacitkoDomuDetail" class="commonButton">
        Úvodní strana
      </router-link>
      <span
        v-if="
          this.$route.name === 'NoveVypraveni' ||
          this.$route.name === 'NovaCesta'
        "
        v-on:click="$router.go(-1)"
      >
        <div class="commonButton zpetNaClanky">Nové</div>
      </span>
      <router-link
        v-else-if="this.$route.name === 'SmirciKrizeVypraveni'"
        to="/krize"
      >
        <div class="commonButton zpetNaClanky">Zpět na smírčí kříže</div>
      </router-link>
      <span v-else v-on:click="$router.go(-1)">
        <div class="commonButton zpetNaClanky">Zpět na články</div>
      </span>
      <div id="tlacitkoNahoruDetail" class="commonButton" v-on:click="goToTop">
        Nahoru
      </div>
      <h1>{{ detailClanku.nazev }}</h1>
      <div class="smallZalozkaTop">
        <div
          v-for="zalozka in detailClanku.zalozky"
          v-bind:key="zalozka.paragraphId"
          v-on:click="goToParagraph"
        >
          <SmallZalozka :zalozka="zalozka" />
        </div>
      </div>
      <h3>{{ detailClanku.datum }}</h3>

      <div id="textClanku">
        <div
          v-for="(odstavec, index) in detailClanku.text"
          v-bind:key="index"
          class="odstavec"
          v-bind:id="String(odstavec.id)"
        >
          <router-link
            v-if="odstavec.foto && detailClanku.kategorie === 'vypraveni'"
            v-bind:to="`/fotodetail/${detailClanku.kategorie}/${
              detailClanku.id
            }/${odstavec.foto.trim()}`"
          >
            <figure
              id="fotoText"
              v-bind:class="{
                vpravo: odstavec.umisteniFoto.trim() === 'vpravo',
                vlevo: odstavec.umisteniFoto.trim() === 'vlevo',
                nahore: index === 0,
              }"
            >
              <img
                v-bind:src="`${apiUrl}/photos/small/${odstavec.foto.trim()}`"
                v-bind:alt="detailClanku.nazev"
              />
              <!-- <figcaption>{{ odstavec.popisek }}</figcaption> -->
            </figure>
          </router-link>
          <p>
            <span v-html="odstavec.textOdstavce" />
            <span v-if="odstavec.vnitrniOdkazy">
              <Klikaci v-bind:clanek="odstavec" kdeJsem="odstavec" />
            </span>
          </p>

          <router-link
            v-if="detailClanku.kategorie === 'cesty' && odstavec.foto"
            v-bind:to="
              innerWidth < 600
                ? `/fotodetail/${detailClanku.kategorie}/${
                    detailClanku.id
                  }/${odstavec.foto.trim()}`
                : ''
            "
          >
            <figure
              v-bind:class="{
                figCesty: true,
                naVysku: odstavec.naVysku,
              }"
              v-bind:style="{ textAlign: 'center' }"
              v-if="
                odstavec.foto &&
                !odstavec.textOdstavce &&
                !odstavec.vnitrniOdkazy
              "
            >
              <img
                v-bind:src="`${apiUrl}/photos/medium/${odstavec.foto.trim()}`"
                v-bind:alt="detailClanku.nazev"
                class="fotoCesty"
              />
              <figcaption>{{ odstavec.popisek }}</figcaption>
            </figure>
          </router-link>
          <div id="mapa">
            <iframe
              v-if="odstavec.odkazMapa"
              style="border: none"
              v-bind:src="odstavec.odkazMapa.trim()"
              width="90%"
              height="400"
            >
              frameborder="0" ></iframe
            >
          </div>
        </div>
      </div>

      <div
        id="galerieClanek"
        v-if="detailClanku.galerie && detailClanku.kategorie !== 'cesty'"
      >
        <div
          class="obrazek"
          v-for="(obrazek, index) in detailClanku.galerie"
          v-bind:key="index"
        >
          <router-link
            v-bind:to="`/fotodetail/${detailClanku.kategorie}/galerie/${
              detailClanku.id
            }/${obrazek.fotka.trim()}`"
          >
            <figure>
              <img
                v-bind:src="`${apiUrl}/photos/small/${obrazek.fotka.trim()}`"
                v-bind:alt="obrazek.popisek"
              />
              <!-- <figcaption>{{ obrazek.popisek }}</figcaption> -->
            </figure>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Klikaci from "./../components/Klikaci.vue";
import Loader from "../components/Loader.vue";
import { displayTestItems } from "../utils/displayTestItems";
import { apiUrl } from "../utils/url";
import SmallZalozka from "../components/SmallZalozka.vue";

export default {
  components: { Klikaci, Loader, SmallZalozka },
  data() {
    return {
      detailClanku: undefined,
      loading: true,
      apiUrl,
      innerWidth: window.innerWidth,
    };
  },

  methods: {
    goToTop() {
      window.scroll(0, 0);
    },

    goToParagraph() {
      const paragraph = document.getElementById(
        String(sessionStorage.getItem("paragraphId"))
      );
      const top = paragraph?.getBoundingClientRect().top;
      window.scrollTo(0, top);
      sessionStorage.removeItem("paragraphId");
    },
  },

  created() {
    if (
      this.$route.name === "DetailVypraveni" ||
      this.$route.name === "NoveVypraveni"
    ) {
      fetch(`${apiUrl}/vypraveni/1/${this.$route.params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.temp && (!displayTestItems() ? !data.test : true))
            //TODO remove when api is updated
            this.detailClanku = data
        })
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          window.scrollTo(0, sessionStorage.getItem("scrollY"));
          sessionStorage.removeItem("scrollY");
        })
        .then(() => {
          this.goToParagraph(sessionStorage.getItem("paragraphId"));
          sessionStorage.removeItem("paragraphId");
        });
    } else if (
      this.$route.name === "DetailCesty" ||
      this.$route.name === "NovaCesta"
    ) {
      fetch(`${apiUrl}/cesty/1/${this.$route.params.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.temp && (!displayTestItems() ? !data.test : true))
            this.detailClanku = data;
        })
        .then(() => {
          this.loading = false;
        })
        .then(() => {
          this.goToParagraph();
        });
    }
  },
};
</script>

<style>
#detailClanku {
  background-color: beige;
  padding: 2%;
}

#detailOkno {
  margin: auto;
  /* margin-top: 20px; */
  border: 2px solid grey;
  border-radius: 10px;
  padding: 2% 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* gap: 20px; */
  max-width: 800px;
  background-color: white;
}

#tlacitkoNahoruDetail {
  grid-row: 1/2;
  grid-column: 3/4;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  margin-top: 3px;
  right: 0;
  min-width: unset;
  max-width: unset;
  width: 116px;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
  justify-self: flex-end;
  align-self: start;
}

#tlacitkoDomuDetail {
  grid-column: 3/4;
  grid-row: 2/3;
  min-width: unset;
  max-width: unset;
  width: 116px !important;
  padding: 0 10px;
  height: 35px;
  background-color: #459ae6;
  justify-self: flex-end;
}

#tlacitkoDomuDetail:hover,
#tlacitkoNahoruDetail:hover {
  background-color: #898a8b;
}

.smallZalozkaTop {
  display: flex;
  flex-wrap: wrap;
  grid-row: 4;
  grid-column: 1/5;
  padding: 15px 0;
}

@media (max-width: 600px) {
  #detailOkno {
    border: none;
  }

  #detailClanku {
    padding: 0;
  }

  #detailOkno p {
    font-size: 15px;
  }

  #tlacitkoNahoruDetail {
    width: 60px !important;
  }

  #tlacitkoDomuDetail {
    width: 60px !important;
  }
}

.zpetNaClanky {
  width: 50%;
  min-width: 80px;
  padding: 10px;
  height: auto;
  background-color: #459ae6;
}

.zpetNaClanky:hover {
  color: #13131d;
  background-color: #9aacab;
}

#detailClanku h1 {
  grid-column: 1 / 4;
  margin-top: 50px;
}

#detailClanku h3 {
  grid-column: 1 / 4;
}

#fotoText {
  height: 200px;
  width: min-content;
}

@media (max-width: 600px) {
  .zpetNaClanky {
    width: 60px;
    min-width: 110px;
  }
}

.vpravo {
  float: right;
  margin-right: 0;
  margin-bottom: 20px;
  margin-top: 16px;
  margin-left: 30px;
}

.vlevo {
  float: left;
  margin-right: 30px;
  margin-bottom: 20px;
  margin-top: 16px;
  margin-left: 0;
}

@media (max-width: 600px) {
  .vlevo {
    float: none;
    margin: auto;
  }

  .vpravo {
    float: none;
    margin: auto;
  }
}

.nahore {
  margin-top: 0;
}

#textClanku {
  grid-column: 1 / span 3;
  margin-bottom: 20px;
  text-align: justify;
  line-height: 1.5;
}

.figCesty {
  margin: auto;
  margin-bottom: 10px;
}

.figCesty img {
  width: 100% !important;
  object-fit: cover;
}

.naVysku {
  width: 50%;
  margin: 10px auto;
}

#fotoText img {
  width: unset;
  height: 100%;
  object-fit: cover;
}

figcaption {
  font-style: italic;
  font-size: 16px;
  text-decoration: none;
  color: black;
  line-height: 1.2;
}

@media (max-width: 600px) {
  figcaption {
    font-size: 12px;
  }
}

a {
  text-decoration: none;
}

.obrazek {
  flex-basis: 25%;
}

.obrazek figure {
  height: 200px;
  width: min-content;
  object-fit: cover;
  margin-left: 0;
  margin-bottom: 60px;
}

#detailClanku img {
  border: 2px solid grey;
  border-radius: 5px;
  width: unset;
}

#detailClanku img:hover,
#detailClanku img:active {
  border: 2px solid black;
}

.fotoCesty:hover {
  border: 2px solid grey !important;
}

#galerieClanek {
  grid-column: 1 / span3;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}

#detailClanku #mapa {
  text-align: center;
}

@media (max-width: 400px) {
  #galerieClanek {
    flex-direction: column;
    flex-wrap: nowrap;
  }
  #obrazek {
    flex-basis: unset;
  }

  .fotoCesty {
    max-width: 90vw;
    margin: auto;
  }

  #fotoText {
    max-width: 90vw;
  }

  .naVysku,
  .naSirku {
    max-width: 90vw;
  }

  .naVysku {
    margin: 0 auto !important;
  }
}
</style>
