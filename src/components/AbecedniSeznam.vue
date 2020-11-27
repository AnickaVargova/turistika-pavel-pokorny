<template>
  <div id="abecedniSeznam">
    <div v-for="clanek in seznam" v-bind:key="clanek.id" class="kontejnerJmeno">
      <router-link
        v-bind:to="`/${clanek.kategorie}/${clanek.podkategorie}/${clanek.id}`"
      >
        {{ clanek.jmeno }}
      </router-link>
    </div>
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
    max-height: 70vh;
    max-width: 75vw;
  }

  .kontejnerJmeno {
    flex-basis: auto;
    padding: 5px;
    border: 1px solid lightgrey;
    border-radius: 5px;
    margin: 1px;
    background-color: rgb(231, 231, 208);
    color: black;
  }

  .kontejnerJmeno a {
    color: rgb(90, 21, 122);
  }

  .kontejnerJmeno a:hover {
    color: grey;
  }

  @media (max-width: 900px) {
    #abecedniSeznam {
      max-height: 100vh;
    }
    .kontejnerJmeno {
      width: 50%;
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
      width: 100%;
    }
  }
</style>
