<template>
  <Sablona v-bind:params="params" />
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
          uvodniText: [
            "Rozdělení pomníků do skupin je jen orientační, některé památky by mohly patřit do více oddílů. Hranice, co je a co už není pomníček, je tenká. Rozhoduje hlavně, zda má jméno nebo alespoň datum, historie, podoba. Některé skupiny pomníků (letecké tragédie, napoleonské, lichtenštejnské) jsou na jiných webových stránkách zpracovány důkladněji, než tady. Uvádím je v odkazech. Vysvětlení zkratek:  S J V Z  = světové strany,  VSV = východoseverovýchod.",
          ],

          kategoriePomnicky: [
            { id: 1, nazev: "Lesnický slavín", pocet: undefined },
            { id: 2, nazev: "Dopravní tragédie", pocet: undefined },
            { id: 3, nazev: "Letecké tragédie", pocet: undefined },
            { id: 4, nazev: "Napoleonské", pocet: undefined },
            { id: 5, nazev: "Válečné", pocet: undefined },
            { id: 6, nazev: "Tragédie bleskem", pocet: undefined },
            { id: 7, nazev: "Lesnické a dřevařské", pocet: undefined },
            { id: 8, nazev: "Lovecké a pytlácké", pocet: undefined },
            { id: 9, nazev: "Ostatní tragédie", pocet: undefined },
            { id: 10, nazev: "Sochy v přírodě", pocet: undefined },
            { id: 11, nazev: "Literární", pocet: undefined },
            { id: 12, nazev: "Jeskyňářské", pocet: undefined },
            { id: 13, nazev: "Trampské objekty", pocet: undefined },
            { id: 14, nazev: "Lichtenštejnské", pocet: undefined },
            { id: 15, nazev: "Sakrální", pocet: undefined },
            { id: 16, nazev: "Jiné nezařaditelné", pocet: undefined },
            { id: 17, nazev: "Zaniklé", pocet: undefined },
          ],
          stranka: "pomnicky",
          background: "pozadiPomnicky.jpg",
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
    },
  };
</script>

<style></style>
