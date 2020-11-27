<template>
  <Sablona v-bind:params="params"/>
</template>

<script>
  import Sablona from "./../components/Sablona.vue";
  export default {
    components: {
      Sablona: Sablona,
    },

    data() {
      return {
        params:{
        nadpis: "Pomníčky",
        uvodniText:
          'Rozdělení pomníků do skupin je jen orientační, některé památky by mohly patřit do více oddílů. Hranice, co je a co už není pomníček, je tenká. Rozhoduje hlavně, zda má jméno, nebo alespoň datum, historie, podoba. Některé skupiny pomníků (letecké tragédie, napoleonské, lichtenštejnské) jsou na jiných webových stránkách zpracovány důkladněji, než tady. Uvádím je v odkazech. Vysvětlení zkratek:  S J V Z  = světové strany,  VSV = východoseverovýchod.',

        kategoriePomnicky: [
          { id: 1, nazev: "Lesnický slavín" },
          { id: 2, nazev: "Dopravní tragédie" },
          { id: 3, nazev: "Letecké tragédie" },
          { id: 4, nazev: "Napoleonské" },
          { id: 5, nazev: "Válečné" },
          { id: 6, nazev: "Tragédie bleskem" },
          { id: 7, nazev: "Lesnické a dřevařské" },
          { id: 8, nazev: "Lovecké a pytlácké" },
          { id: 9, nazev: "Ostatní tragédie" },
          { id: 10, nazev: "Sochy v přírodě" },
          { id: 11, nazev: "Literární" },
          { id: 12, nazev: "Jeskyňářské" },
          { id: 13, nazev: "Trampské objekty" },
          { id: 14, nazev: "Lichtenštejnské" },
          { id: 15, nazev: "Církevní" },
          { id: 16, nazev: "Jiné nezařaditelné" },
          { id: 17, nazev: "Zaniklé" },
        ],
        stranka: "pomnicky",
        background: "pozadiPomnicky.jpg",
        backgroundDescription:"Pozadí",
      
        }
      };
    },
  };
</script>

<style></style>
