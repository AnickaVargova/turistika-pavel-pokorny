<template>
  <router-link
    v-bind:to="
      `/${stranka}/${clanek.kategorie}/${clanek.podkategorie}/${clanek.id}`
    "
  >
    <div class="clanek">
      <h2
        v-if="
          clanek.kategorie === 'pomnicky' ||
            clanek.kategorie === 'vypraveni' ||
            clanek.kategorie === 'cesty'
        "
      >
        {{ clanek.nazev }}
      </h2>
      <h2 v-else-if="clanek.kategorie === 'smircikrize'">
        {{ clanek.jmeno }}
      </h2>
      <h4 v-if="clanek.kategorie === 'pomnicky'">
        {{ clanek.jmeno }}
      </h4>
      <h4 v-else-if="clanek.kategorie === 'smircikrize'">
        Číslo v evidenci: {{ clanek.cislo }}
      </h4>
      <h3
        v-if="clanek.kategorie === 'cesty' || clanek.kategorie === 'vypraveni'"
      >
        {{ clanek.datum }}
      </h3>
      <h3
        v-if="
          clanek.kategorie === 'pomnicky' || clanek.kategorie === 'smircikrize'
        "
      >
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
