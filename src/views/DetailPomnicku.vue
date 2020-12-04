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
          detail: true,
          background: "pozadiKapky.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },
    created(){
      for(let kategorie of this.params.kategoriePomnicky){
        kategorie.pocet = this.clanky.filter(clanek=> clanek.kategorie === "pomnicky" &&clanek.podkategorie===kategorie.id).length;
       
      }
      for(let kategorie of this.paramsKrize.kategoriePomnicky){
        kategorie.pocet = this.clanky.filter(clanek=> clanek.kategorie === "smircikrize" &&clanek.podkategorie===kategorie.id).length;
       
      }
      
    }
  };
</script>

<style></style>
