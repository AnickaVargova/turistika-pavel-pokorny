<template>
  <div id="fotodetail">
    <figure v-bind:class="{ setHeight: !isEdgeChromium }">
      <img
        v-bind:src="require(`./../assets/${vybranaFotka.fotka}`)"
        v-bind:alt="vybranaFotka.popisek"
      />
      <figcaption v-if="vybranaFotka.datum && !vybranaFotka.poznamka">
        ({{ vybranaFotka.datum }})
      </figcaption>
      <figcaption v-else-if="vybranaFotka.datum && vybranaFotka.poznamka">
        ({{ vybranaFotka.datum }})
        <p v-bind:style="{ fontStyle: 'normal' }">
          {{ vybranaFotka.poznamka }}
        </p>
      </figcaption>
      <figcaption
        v-else-if="
          vybranaFotka.popisek && !vybranaFotka.datum && !vybranaFotka.poznamka
        "
      >
        {{ vybranaFotka.popisek }}
      </figcaption>

      <a @click="$router.go(-1)"
        ><button class="pomnicekKategorie">Zpět</button></a
      >
    </figure>
  </div>
</template>

<script>
  import Detail from "./Detail.vue";

  import Clanky from "@/components/clanky.js";
  export default {
    props: ["popisek"],
    data() {
      return {
        vybranaFotka: {},
        vybranyIndex: undefined,
        vybranaKategorie: undefined,
        clanky: Clanky.data,
        vybranyClanek: undefined,
        fotoOnas: [
          {
            fotka: "onas1.jpg",
            popisek: "Rumunsko, Trascau  (září 2016)",
          },
          {
            fotka: "onas2.jpg",
            popisek: "Polsko, Czarna Hancza  (červenec 2018)",
          },
        ],
        isEdgeChromium: false,
      };
    },

    methods: {
      detailFotky() {
        
        if (this.$route.params.podkategorie === "onas") {
          for (let item of this.fotoOnas) {
            if (item.fotka == this.$route.params.id) {
              this.vybranaFotka.fotka = item.fotka;
              this.vybranaFotka.popisek = item.popisek;
            }
          }
        } else {
          for (let clanek of this.clanky) {
            if (clanek.text) {
              
            
              for (let odstavec of clanek.text) {
                if (odstavec.foto) {
                  clanek.galerie.push({
                    fotka: odstavec.foto,
                    popisek: odstavec.popisek,
                  });
                }
              }
             
            }
            if (clanek.galerie) {
              for (let obrazek of clanek.galerie) {
                if (obrazek.fotka == this.$route.params.id) {
                  this.vybranaFotka = obrazek;
                  this.vybranyIndex = clanek.id;
                  this.vybranaKategorie = clanek.kategorie;
                }
              }
            }
          }
        }
      },
    },

    created() {
      this.detailFotky();
      // Opera 8.0+
      // var isOpera =
      //   (!!window.opr && !!opr.addons) ||
      //   !!window.opera ||
      //   navigator.userAgent.indexOf(" OPR/") >= 0;

      // // Firefox 1.0+
      // var isFirefox = typeof InstallTrigger !== "undefined";

      // // Safari 3.0+ "[object HTMLElementConstructor]"
      // var isSafari =
      //   /constructor/i.test(window.HTMLElement) ||
      //   (function(p) {
      //     return p.toString() === "[object SafariRemoteNotification]";
      //   })(
      //     !window["safari"] ||
      //       (typeof safari !== "undefined" && window["safari"].pushNotification)
      //   );

      // // Internet Explorer 6-11
      // var isIE = /*@cc_on!@*/ false || !!document.documentMode;

      // // Edge 20+
      // var isEdge = !isIE && !!window.StyleMedia;

      // Chrome 1 - 79
      var isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore || !!window.chrome.runtime);

      // Edge (based on chromium) detection
      var isEdgeChromium = isChrome && navigator.userAgent.indexOf("Edg") != -1;

      // Blink engine detection
      // var isBlink = (isChrome || isOpera) && !!window.CSS;

      this.isEdgeChromium = isEdgeChromium;
    },
   
  };
</script>

<style>
  #fotodetail {
    padding: 30px;
    padding-bottom: 60px;
    display: flex;
    justify-content: center;
  }

  #fotodetail figure {
    /* height: 80vh; */
    margin-top: 30px;
    position: relative;
    border: 2px solid grey;
    border-radius: 5px;
  }

  .setHeight {
    height: 80vh;
  }

  #fotodetail img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  #fotodetail figcaption {
    font-size: 15px;
    margin-top: 20px;
  }

  #fotodetail button {
    position: absolute;
    right: 0;
    bottom: -90px;
    width: 100px;
    justify-content: left;
    padding-left: 30px;
    padding-right: 30px;
    background-color: #459ae6;
  }

  #fotodetail .pomnicekKategorie {
    min-width: 0;
  }
  #fotodetail button:active,
  #fotodetail button:hover {
    background-color: grey;
  }

  @media (max-width: 600px) {
    #fotodetail {
      padding-top: 100px;
    }

    #fotodetail figure {
      height: auto;
      margin: 0;
    }

    #fotodetail button {
      bottom: -100px;
    }
  }
</style>
