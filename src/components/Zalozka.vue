<template>
  <div>
    <Loader v-if="this.loading"/>
    <router-link v-bind:to="path">
      <div class="clanek" v-if="!this.loading">
        <h2
          v-if="
            clanek.kategorie === 'pomnicky' ||
            clanek.kategorie === 'vypraveni' ||
            clanek.kategorie === 'cesty'
          "
        >
          {{ clanek.nazev }}
        </h2>
        <h2 v-else-if="clanek.kategorie === 'krize'">
          {{ clanek.jmeno }}
        </h2>
        <h4 v-if="clanek.kategorie === 'pomnicky'">
          {{ clanek.jmeno }}
        </h4>
        <h4 v-else-if="clanek.kategorie === 'krize'">
          Číslo v evidenci: {{ clanek.cisloEvid }}
        </h4>
        <h3
          v-if="
            clanek.kategorie.trim() === 'cesty' || clanek.kategorie.trim() === 'vypraveni'
          "
        >
          {{ clanek.datum }} -->
        </h3>
        <h3
          v-if="
            clanek.kategorie.trim() === 'pomnicky' ||
            clanek.kategorie === 'krize'
          "
        >
          {{ clanek.obec }}
        </h3>

        <div class="clanekFoto">
          <img
            v-if="clanek.fotkaUvod"
            v-bind:src="
              clanek.fotkaUvod &&
              `http://localhost:8080/photos/${clanek.fotkaUvod.fotka.trim()}`
            "
            v-bind:alt="clanek.jmeno"
          />
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import Loader from "./Loader.vue";
export default {
  props: ["mujClanek", "stranka"],
  components: { Loader },
  data() {
    return {
      clanek: {},
      loading: true,
    };
  },
  computed: {
    path() {
      if (!this.clanek) {
        return this.$route.path;
      }
      return this.stranka === "novepridane"
        ? `novepridane/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`
        : `/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`;
    },
  },
  created() {
    if (this.clanek) {
      fetch(
        `http://localhost:8080/${this.mujClanek.kategorie}/${this.mujClanek.podkategorie}/${this.mujClanek.id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => (this.clanek = data))
        .then(() => (this.loading = false));
    }
  },
};
</script>

<style></style>
