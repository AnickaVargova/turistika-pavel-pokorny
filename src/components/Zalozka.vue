<template>
  <div>
    <router-link v-bind:to="path">
      <div class="clanek" >
        <h2
          v-if="
            clanek.kategorie === 'pomnicky' ||
            clanek.kategorie === 'studanky' ||
            clanek.kategorie === 'vypraveni' ||
            clanek.kategorie === 'cesty'
          "
        >
          {{ clanek.nazev }}
        </h2>
        <h2 v-else-if="clanek.kategorie === 'krize'">
          {{ clanek.jmeno }}
        </h2>
        <div class="smallZalozkaWrapper">
          <SmallZalozka
            v-for="zalozka in clanek.zalozky"
            v-bind:key="zalozka.paragraphId"
            :zalozka="zalozka"
          />
        </div>
        <h4
          v-if="
            clanek.kategorie === 'pomnicky' || clanek.kategorie === 'studanky'
          "
        >
          {{ clanek.jmeno }}
        </h4>
        <h4 v-else-if="clanek.kategorie === 'krize'">
          Číslo v evidenci: {{ clanek.cisloEvid }}
        </h4>
        <h3
          v-if="
            clanek.kategorie.trim() === 'cesty' ||
            clanek.kategorie.trim() === 'vypraveni'
          "
        >
          {{ clanek.datum }}
        </h3>
        <h3
          v-if="
            clanek.kategorie.trim() === 'pomnicky' ||
            clanek.kategorie === 'krize' ||
            clanek.kategorie === 'studanky'
          "
        >
          {{ clanek.obec }}
        </h3>

        <div class="clanekFoto">
          <img
            v-if="clanek.fotkaUvod"
            v-bind:src="
              clanek.fotkaUvod &&
              `${apiUrl}/photos/small/${
                clanek.kategorie.trim() === 'vypraveni' ||
                clanek.kategorie.trim() === 'cesty'
                  ? clanek.fotkaUvod.trim()
                  : clanek.fotkaUvod.fotka.trim()
              }`
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
import { apiUrl } from "../utils/url";
import SmallZalozka from "./SmallZalozka.vue";

export default {
  props: ["mujClanek", "stranka"],
  components: { Loader, SmallZalozka },
  data() {
    return {
      clanek: {
        ...this.mujClanek,
        zalozky: this.mujClanek.zalozky
      },
      apiUrl,
    };
  },
  computed: {
    path() {
      return this.stranka === "novepridane"
        ? `/novepridane/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`
        : `/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`;
    },
  },
};
</script>

<style>

.smallZalozkaWrapper {
  display: flex;
  flex-wrap: wrap;
  margin: 0 15px;
}
</style>
