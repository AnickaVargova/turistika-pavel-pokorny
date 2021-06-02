<template>
  <router-link v-bind:to="`/${stranka}/${clanek.podkategorie}/${clanek.id}`">
    <div class="clanek">
      <h2>
        {{ clanek.nazev }}
      </h2>
      <h4 v-if="stranka === 'pomnicky' || stranka === 'smircikrize'">
        {{ clanek.jmeno }}
      </h4>
      <h3
        v-if="
          stranka === 'cesty' ||
            stranka === 'vypraveni' ||
            stranka === 'novepridane'
        "
      >
        {{ clanek.datum }}
      </h3>
      <h3 v-else-if="stranka === 'pomnicky' || stranka === 'smircikrize'">
        {{ clanek.obec }}
      </h3>

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
