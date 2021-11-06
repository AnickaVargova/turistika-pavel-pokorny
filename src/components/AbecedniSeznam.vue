<template>
  <div v-if="stranka === 'smircikrize'" id="abecedniSeznam" :style="cssVars">
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`${stranka}/${clanek.podkategorie}/${clanek.id}`"
      class="kontejnerJmeno"
      v-bind:style="{ backgroundColor: '#e9f4f5' }"
    >
      {{ clanek.jmeno }}
    </router-link>
  </div>

  <div v-else :style="cssVars">
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`${stranka}/${clanek.podkategorie}/${clanek.id}`"
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
        itemHeight: 34,
      };
    },

    computed: {
      cssVars() {
        return {
          "--columnHeightIpad":
            Math.ceil(this.seznam.length / 2) * this.itemHeight + "px",
          "--columnHeightSmallD":
            Math.ceil(this.seznam.length / 3) * this.itemHeight + "px",
          "--columnHeightBigD":
            Math.ceil(this.seznam.length / 4) * this.itemHeight + "px",
        };
      },
    },
    created() {
      this.seznam = this.clanky
        .filter((clanek) => clanek.kategorie === this.stranka)
        .sort((a, b) => {
          return a.jmeno.trim().localeCompare(b.jmeno.trim(), "cs", {
            sensitivity: "accent",
          });
        });
      if (this.stranka === "pomnicky") {
        const seznamNazvu = [];
        this.seznam = this.seznam.filter((item) =>
          seznamNazvu.includes(item.nazev)
            ? false
            : seznamNazvu.push(item.nazev)
        );
      }
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
    max-height: var(--columnHeightBigD);
    max-width: 75vw;
  }

  .kontejnerJmeno {
    flex-basis: auto;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: 1px;
    background-color: #e7e0d0;
    width: 25%;
    color: #2f5bad;
  }

  .kontejnerJmeno:hover {
    color: grey;
  }

  @media (max-width: 1200px) {
    #abecedniSeznam {
      max-height: var(--columnHeightSmallD);
    }

    .kontejnerJmeno {
      width: 32%;
    }
  }

  @media (max-width: 850px) {
    #abecedniSeznam {
      max-height: var(--columnHeightIpad);
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
      max-height: unset;
    }

    .kontejnerJmeno {
      max-width: unset;
      width: 100%;
    }
  }
</style>
