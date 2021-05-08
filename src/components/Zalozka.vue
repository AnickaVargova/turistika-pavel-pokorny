<template>
  <router-link v-bind:to="`/${stranka}/${clanek.podkategorie}/${clanek.id}`">
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
</template>

<script>
  export default {
    props: ["clanek", "stranka"],
  };
</script>

<style></style>
