<template>
  <Sablona v-bind:params="params" v-bind:paramsKrize="paramsKrize" />
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  import Sablona from "./../components/Sablona.vue";
  export default {
    components: {
      Sablona: Sablona,
    },

    data() {
      return {
        clanky: vsechnyClanky.data,
        params: {
          nadpis: "Pomníčky",
          uvodniText: "",

          kategoriePomnicky: [
             { id: 1, nazev: "Lesnický slavín", pocet: undefined },
            { id: 7, nazev: "Lesnické a dřevařské", pocet: undefined },
            { id: 8, nazev: "Lovecké a pytlácké", pocet: undefined },
            { id: 4, nazev: "Napoleonské", pocet: undefined },
            { id: 14, nazev: "Lichtenštejnské", pocet: undefined },
            { id: 5, nazev: "Válečné", pocet: undefined },
            { id: 10, nazev: "Sochy v\xa0přírodě", pocet: undefined },
            { id: 11, nazev: "Literární", pocet: undefined },
            { id: 15, nazev: "Sakrální", pocet: undefined },
            { id: 2, nazev: "Dopravní tragédie", pocet: undefined },
            { id: 3, nazev: "Letecké nehody", pocet: undefined },
            { id: 6, nazev: "Usmrcení bleskem", pocet: undefined },
            { id: 9, nazev: "Ostatní tragédie", pocet: undefined },
            { id: 12, nazev: "Jeskyňářské a horolezecké", pocet: undefined },
            { id: 13, nazev: "Trampské objekty", pocet: undefined },
            { id: 16, nazev: "Jiné nezařaditelné", pocet: undefined },
            { id: 17, nazev: "Zaniklé", pocet: undefined },
          ],
          stranka: "pomnicky",
          detail: true,
          background: "pozadiPomnicky.jpg",
          backgroundDescription: "Pozadí",
        },
        paramsKrize: {
          nadpis: "Smírčí kříže",
          uvodniText: "",

          kategoriePomnicky: [
            { id: 1, nazev: "V Brně" },
            { id: 2, nazev: "Na sever" },
            { id: 3, nazev: "Na východ" },
            { id: 4, nazev: "Na jih" },
            { id: 5, nazev: "Na západ" },
          ],
          stranka: "smircikrize",
          transbox: "rgba(211, 214, 214, 0.8)",
          detail: true,
          background: "pozadiKapky.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },
    created() {
      for (let kategorie of this.params.kategoriePomnicky) {
        kategorie.pocet = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "pomnicky" &&
            clanek.podkategorie === kategorie.id
        ).length;
      }
      for (let kategorie of this.paramsKrize.kategoriePomnicky) {
        kategorie.pocet = this.clanky.filter(
          (clanek) =>
            clanek.kategorie === "smircikrize" &&
            clanek.podkategorie === kategorie.id
        ).length;
      }
    },
  };
</script>

<style></style>
