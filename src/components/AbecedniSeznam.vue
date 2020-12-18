<template>
  <div  v-if="stranka==='smircikrize'" id="abecedniSeznam">
   
    <router-link
      v-for="clanek in seznam"
      v-bind:key="clanek.id"
      v-bind:to="`/${clanek.kategorie}/${clanek.podkategorie}/${clanek.id}`"
      class="kontejnerJmeno"
      v-bind:style="{backgroundColor:'#e9f4f5'}"
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
      for (let clanek of this.clanky) {
        if (clanek.kategorie === this.stranka) {
          this.seznam.push(clanek);
        }
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
    max-height: 100vh;
    max-width: 75vw;
  }

  .kontejnerJmeno {
    flex-basis: auto;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: 1px;
    background-color: #e7e7d0;
    color: black;
    max-width: 40%;
  }

  .kontejnerJmeno  {
    color: rgb(90, 21, 122);
  }

  .kontejnerJmeno:hover {
    color: grey;
  }

  @media (max-width: 900px) {
    #abecedniSeznam {
      max-height: 100vh;
    }
    .kontejnerJmeno {
      width: 50%;
      max-width: unset;
    }
  }

  @media (max-width: 600px) {
    #abecedniSeznam {
      grid-row-start: 4;
      grid-column: 1/7;
      align-items: center;
      flex-wrap: nowrap;
    }

    #abecedniSeznam {
      max-height: auto;
      max-width: 100vw;
    }

    .kontejnerJmeno {
      max-width: unset;
      width: 100%;
    }
  }
</style>
