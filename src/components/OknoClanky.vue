<template>
  <div id="oknoPomnicky">
    <div v-for="(clanek, index) in clanky" v-bind:key="index">
        <router-link v-bind:to="`/detail/${clanek.podkategorie}/${clanek.id}`">
        <div class="clanek">
        <h2>{{ clanek.nazev }}</h2>
        <h3>{{ clanek.datum }}</h3>
        <div class="clanekFoto">
          <img v-bind:src="require(`./../assets/${clanek.fotkaUvod.fotka}`)" v-bind:alt="clanek.jmeno" />
        </div>
        <p>{{ clanek.kratkyText }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  
  export default {
    props: ["clanky"],
      };
</script>

<style>
  .clanek {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(2, 50%);
    border: 2px solid grey;
    margin: 10px;
    border-radius: 10px;
    padding: 10px;
    height: 200px;
    color: rgb(87, 81, 81);
  }

  @media(max-width:600px){
    .clanek {
      border: none;
      border-bottom:2px solid grey;
      border-radius:0;
      grid-template-rows: auto;
    }

    .clanek:last-child {
      border-bottom:none;
    }
  }

  .clanek:hover {
    border: 2px solid black;
    color:black;
    background-color:whitesmoke;
  }

  .clanek h2 {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  .clanek h3 {
    grid-row: 2/3;
    grid-column: 1/2;
    justify-items: center;
    align-items: center;
  }

  .clanekFoto {
    grid-row: 1/3;
    grid-column: 2/3;
    width: 100%;
    height: 100%;
    border: 2px solid grey;
    border-radius: 5px;
  }

  .clanekFoto img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
