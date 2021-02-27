<template>
  <div v-if="stranka === 'smircikrize'" id="abecedniSeznam">
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`/${clanek.kategorie}/${clanek.podkategorie}/${clanek.id}`"
      class="kontejnerJmeno"
      v-bind:style="{ backgroundColor: '#e9f4f5' }"
    >
      {{ clanek.jmeno }}
    </router-link>
  </div>

  <div v-else>
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`/${clanek.kategorie}/${clanek.podkategorie}/${clanek.id}`"
      class="kontejnerJmeno"
    >
      {{ clanek.jmeno }}
    </router-link>
  </div>
</template>

<script>
  export default {
    props: ["clanky", "stranka"],
    data() {
      return {
        seznam: [],
        oldPath: this.$route.path,
      };
    },

    created() {
      let seznamJednotlivych = [];
      for (let clanek of this.clanky) {
        if (clanek.kategorie === this.stranka) {
          this.seznam.push(clanek);
        }
      }

      if (this.stranka === "pomnicky") {
        for (let clanek of this.seznam) {
          seznamJednotlivych.push(clanek);
          for (let i = 0; i < seznamJednotlivych.length - 1; i++) {
            if (seznamJednotlivych[i].nazev === clanek.nazev) {
              seznamJednotlivych.pop();
            }
          }
        }

        this.seznam = seznamJednotlivych;
      }
      this.seznam = this.seznam.sort((a, b) => {
        return a.jmeno.trim().localeCompare(b.jmeno.trim(), "cs", {
          sensitivity: "accent",
        });
      });
    },
  };
</script>

<style>
  #abecedniSeznam {
    display: flex;
    flex-direction: column;
    grid-column: 2/7;
    grid-row-start: 3;
    margin: 30px;
    flex-wrap: wrap;
    max-height: 150vh;
    max-width: 75vw;
  }

  .kontejnerJmeno {
    flex-basis: auto;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: 1px;
    background-color: #e7e0d0;
    color: black;
    width: 33.3%;
  }

  .kontejnerJmeno {
    color: #2f5bad;
    /* color:#3566c2 */
    /* color: #3E5682; */
    /* color: rgb(90, 21, 122); */
  }

  .kontejnerJmeno:hover {
    color: grey;
  }

  @media (max-width: 1100px) {
    #abecedniSeznam {
      max-height: 250vh;
    }

    .kontejnerJmeno {
      width: 50%;
    }
  }

  @media (max-width: 600px) {
    #abecedniSeznam {
      grid-row: 4/5;
      grid-column: 1/7;
      align-items: center;
      flex-wrap: nowrap;
      max-width: 100vw;
    }

    #abecedniSeznam {
      max-height: unset;
      max-width: 100vw;
    }

    .kontejnerJmeno {
      max-width: unset;
      width: 100%;
    }
  }
</style>
