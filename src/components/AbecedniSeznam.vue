<template>
  <div v-if="stranka === 'smircikrize'" id="abecedniSeznam" :style="cssVars">
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`${stranka}/${clanek.kategorie}/${clanek.id}`"
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
      v-bind:to="`${stranka}/${clanek.kategorie}/${clanek.id}`"
      class="kontejnerJmeno"
    >
      {{ clanek.jmeno }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["stranka"],
  data() {
    return {
      seznam: [],
      itemHeight: 34,
      componentKey: 0,
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
    fetch(`http://localhost:8080/pomnicky`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data = data.sort((a, b) => {
          return a.jmeno.trim().localeCompare(b.jmeno.trim(), "cs", {
            sensitivity: "accent",
          });
        });
        this.seznam = data;
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
