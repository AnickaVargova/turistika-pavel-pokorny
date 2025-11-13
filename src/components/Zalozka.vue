<template>
  <div>
    <router-link :to="path" class="clanekLink">
      <div class="clanek">
        <h2 v-if="showNazev">{{ clanek.nazev }}</h2>
        <h2 v-else-if="isKrize">{{ getCleanJmeno(clanek.jmeno) }}</h2>
        <div class="smallZalozkaWrapper">
          <SmallZalozka
            v-for="zalozka in clanek.zalozky"
            :key="zalozka.paragraphId"
            :zalozka="zalozka"
          />
        </div>
        <h4 v-if="showJmeno" v-html="clanek.jmeno"></h4>
        <h4 v-else-if="isKrize">Číslo v evidenci: {{ clanek.cisloEvid }}</h4>
        <h3 v-if="showDatum">{{ clanek.datum }}</h3>
        <h3 v-if="showObec">{{ clanek.obec }}</h3>

        <div class="clanekFoto">
          <img
            v-if="clanek.fotkaUvod"
            :src="getPhotoUrl(clanek)"
            :srcset="getPhotoSrcSet(clanek)"
            sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"
            :alt="clanek.jmeno"
            loading="lazy"
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
  props: {
    mujClanek: {
      type: Object,
      required: true,
    },
    stranka: {
      type: String,
      required: true,
    },
  },
  components: { Loader, SmallZalozka },
  data() {
    return {
      clanek: {
        ...this.mujClanek,
        zalozky: this.mujClanek.zalozky,
      },
      apiUrl,
    };
  },
  computed: {
    path() {
      if (this.stranka === "novepridane") {
        return `/novepridane/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`;
      }
      return `/${this.clanek.kategorie}/${this.clanek.podkategorie}/${this.clanek.id}`;
    },

    showNazev() {
      const { kategorie } = this.clanek;
      return (
        kategorie === "pomnicky" ||
        kategorie === "studanky" ||
        kategorie === "vypraveni" ||
        kategorie === "cesty"
      );
    },

    isKrize() {
      return this.clanek.kategorie === "krize";
    },

    showJmeno() {
      const { kategorie } = this.clanek;
      return kategorie === "pomnicky" || kategorie === "studanky";
    },

    showDatum() {
      const { kategorie } = this.clanek;
      return kategorie?.trim() === "cesty" || kategorie?.trim() === "vypraveni";
    },

    showObec() {
      const { kategorie } = this.clanek;
      return (
        kategorie?.trim() === "pomnicky" ||
        kategorie === "krize" ||
        kategorie === "studanky"
      );
    },
  },
  methods: {
    getCleanJmeno(jmeno) {
      if (!jmeno) return "";
      const index = jmeno.indexOf("<");
      return index < 0 ? jmeno : jmeno.slice(0, index);
    },

    getPhotoUrl(clanek) {
      if (!clanek.fotkaUvod) return "";
      const { kategorie } = clanek;
      const photoName =
        kategorie?.trim() === "vypraveni" || kategorie?.trim() === "cesty"
          ? clanek.fotkaUvod.trim()
          : clanek.fotkaUvod.fotka.trim();
      return `${this.apiUrl}/photos/small/${photoName}`;
    },

    getPhotoSrcSet(clanek) {
      if (!clanek.fotkaUvod) return "";
      const { kategorie } = clanek;
      const photoName =
        kategorie?.trim() === "vypraveni" || kategorie?.trim() === "cesty"
          ? clanek.fotkaUvod.trim()
          : clanek.fotkaUvod.fotka.trim();
      return `${this.apiUrl}/photos/small/${photoName} 300w, ${this.apiUrl}/photos/medium/${photoName} 600w`;
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

.clanekLink {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
