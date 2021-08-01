<template>
  <router-link v-bind:to="`/${stranka}/${clanek.podkategorie}/${clanek.id}`">
    <div class="clanek">
      <h2
        v-if="
          stranka === 'pomnicky' ||
            stranka === 'vypraveni' ||
            stranka === 'cesty' ||
            stranka === 'novepridane'
        "
      >
        {{ clanek.nazev }}
      </h2>
      <h2 v-else-if="stranka === 'smircikrize'">
        {{ clanek.jmeno }}
      </h2>
      <h4 v-if="stranka === 'pomnicky'">
        {{ clanek.jmeno }}
      </h4>
      <h4 v-else-if="stranka === 'smircikrize'">
        Číslo v evidenci: {{ clanek.cislo }}
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
          v-if="clanek.fotkaUvod"
          v-bind:src="
            clanek.fotkaUvod &&
              require(`./../assets/${clanek.fotkaUvod.fotka.trim()}`)
          "
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
