<template>
  <div id="oknoPomnicky">
    <div v-for="(clanek, index) in mojeClanky" v-bind:key="index">
      <router-link v-if="stranka==='vypraveni'" v-bind:to="`/vypraveni/${clanek.podkategorie}/${clanek.id}`">
        <div class="clanek">
          <h2>{{ clanek.nazev }}</h2>
          <h3>{{ clanek.datum }}</h3>
          <div class="clanekFoto">
            <img
              v-bind:src="require(`./../assets/${clanek.fotkaUvod.fotka.trim()}`)"
              v-bind:alt="clanek.jmeno"
            />
          </div>
        </div>
      </router-link>
      <router-link v-else-if="stranka==='novepridane'" v-bind:to="`/novepridane/${clanek.podkategorie}/${clanek.id}`">
        <div class="clanek">
          <h2>{{ clanek.nazev }}</h2>
          <h3>{{ clanek.datum }}</h3>
          <div class="clanekFoto">
            <img
              v-bind:src="require(`./../assets/${clanek.fotkaUvod.fotka.trim()}`)"
              v-bind:alt="clanek.jmeno"
            />
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["clanky", "stranka"],
    data(){
      return {
        mojeClanky: this.clanky,
      }
    },
    created() {
      if (this.$route.name === "NovePridane") {
        this.mojeClanky = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "vypraveni" ||
            clanek.kategorie === "cesty"
        );
        
      }
    },
  };
</script>

<style>
  .clanek {
    display: grid;
    grid-template-columns: 75% 25%;
    border: 2px solid grey;
    margin: auto;
    margin-bottom: 5px;
    border-radius: 10px;
    padding: 10px;
    max-height: 200px;
    max-width: 70vw;
    color: rgb(87, 81, 81);
  }

  .clanek h2 {
    grid-row: 1/2;
    grid-column: 1/2;
    margin: 15px;
  }

  .clanek h3 {
    grid-row: 2/3;
    grid-column: 1/2;
    justify-items: center;
    align-items: center;
    margin: 5px;
    margin-left: 15px;
  }

  .clanekFoto {
    grid-row: 1/3;
    grid-column: 2/3;
    width: 100%;
    height: 148px;
    border: 2px solid grey;
    border-radius: 5px;
  }

  .clanekFoto img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    .clanek {
      border-bottom: 2px solid grey;
      border-top: none;
      border-right: none;
      border-left: none;
      border-radius: 0;
      grid-template-rows: auto;
      grid-template-columns: 50% 50%;
      max-width: unset;
      width: 90%;
      
    }

    /* .clanek:last-child {
      border-bottom: none;
    } */
  }

  .clanek:hover {
    border: 2px solid black;
    color: black;
    background-color: whitesmoke;
  }

  
</style>
