<template>
  <div id="oknoPomnicky" v-if="this.zalozkyButton">
    <div
      class="kontejnerClanek"
      v-for="(clanek, index) in mojeClanky"
      v-bind:key="index"
    >
      <Zalozka v-bind:clanek="clanek" v-bind:stranka="stranka" />
    </div>
  </div>
</template>

<script>
  import Zalozka from "./Zalozka";
  export default {
    props: ["clanky", "stranka", "zalozkyButton"],
    components: {
      Zalozka: Zalozka,
    },
    data() {
      return {
        mojeClanky: this.clanky,
      };
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
    margin-bottom: 0;
  }

  .clanek h4 {
    grid-row: 2/3;
    grid-column: 1/2;
    margin-left: 15px;
    margin-top: 5px;
    color: rgb(63, 58, 139);
  }

  .clanek h3 {
    grid-row: 3/4;
    grid-column: 1/2;
    justify-items: center;
    align-items: center;
    margin: 5px;
    margin-left: 15px;
  }

  .clanekFoto {
    grid-row: 1/4;
    grid-column: 2/3;
    width: 100%;
    height: 148px;
    border: 2px solid grey;
    border-radius: 5px;
  }

  .clanekFoto img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
  }

  @media (max-width: 600px) {
    .kontejnerClanek {
      border-bottom: 2px solid grey;
    }

    .kontejnerClanek:last-child {
      border-bottom: none;
    }

    .clanek {
      border: none;
      border-radius: 0;
      grid-template-rows: auto;
      grid-template-columns: 3fr 1fr;
      max-width: unset;
      max-height: unset;
      width: 90%;
    }
  }

  .clanek:hover {
    border: 2px solid black;
    color: black;
    background-color: whitesmoke;
  }
</style>
