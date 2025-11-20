<template>
  <div>
    <router-link :to="path" class="clanekLink">
      <div class="clanek">
        <h2 v-if="showNazev">{{ clanek.nazev }}</h2>
        <h2 v-else-if="isKrize">{{ getCleanJmeno(clanek.jmeno) }}</h2>
        <div class="smallZalozkaWrapper">
          <SmallZalozka
            v-for="(zalozka, index) in clanek.zalozky"
            :key="zalozka.paragraphId || `${clanek.id}-zalozka-${index}`"
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

<script setup>
import { computed } from "vue";
import Loader from "./Loader.vue";
import { apiUrl } from "../utils/url";
import SmallZalozka from "./SmallZalozka.vue";

const props = defineProps({
  mujClanek: {
    type: Object,
    required: true,
  },
  stranka: {
    type: String,
    required: true,
  },
});

const clanek = computed(() => ({
  ...props.mujClanek,
  zalozky: props.mujClanek.zalozky,
}));

const path = computed(() => {
  if (props.stranka === "novepridane") {
    return `/novepridane/${clanek.value.kategorie}/${clanek.value.podkategorie}/${clanek.value.id}`;
  }
  return `/${clanek.value.kategorie}/${clanek.value.podkategorie}/${clanek.value.id}`;
});

const showNazev = computed(() => {
  const { kategorie } = clanek.value;
  return (
    kategorie === "pomnicky" ||
    kategorie === "studanky" ||
    kategorie === "vypraveni" ||
    kategorie === "cesty"
  );
});

const isKrize = computed(() => clanek.value.kategorie === "krize");

const showJmeno = computed(() => {
  const { kategorie } = clanek.value;
  return kategorie === "pomnicky" || kategorie === "studanky";
});

const showDatum = computed(() => {
  const { kategorie } = clanek.value;
  return kategorie?.trim() === "cesty" || kategorie?.trim() === "vypraveni";
});

const showObec = computed(() => {
  const { kategorie } = clanek.value;
  return (
    kategorie?.trim() === "pomnicky" ||
    kategorie === "krize" ||
    kategorie === "studanky"
  );
});

const getCleanJmeno = (jmeno) => {
  if (!jmeno) return "";
  const index = jmeno.indexOf("<");
  return index < 0 ? jmeno : jmeno.slice(0, index);
};

const getPhotoUrl = (clanek) => {
  if (!clanek.fotkaUvod) return "";
  const { kategorie } = clanek;
  const photoName =
    kategorie?.trim() === "vypraveni" || kategorie?.trim() === "cesty"
      ? clanek.fotkaUvod.trim()
      : clanek.fotkaUvod.fotka.trim();
  return `${apiUrl}/photos/small/${photoName}`;
};

const getPhotoSrcSet = (clanek) => {
  if (!clanek.fotkaUvod) return "";
  const { kategorie } = clanek;
  const photoName =
    kategorie?.trim() === "vypraveni" || kategorie?.trim() === "cesty"
      ? clanek.fotkaUvod.trim()
      : clanek.fotkaUvod.fotka.trim();
  return `${apiUrl}/photos/small/${photoName} 300w, ${apiUrl}/photos/medium/${photoName} 600w`;
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
