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
          "Tady bude uvodni text.Lorem ipsum dolor sit amet consectetur adipisicin elit. Dignissimos suscipit fuga natus, delectus autem voluptates? Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendisofficiis, veritatis dolor ipsum impedit laudantium! Nihil?",

        kategoriePomnicky: [
          { id: 1, nazev: "Lesnický slavín" },
          { id: 2, nazev: "Dopravní tragédie" },
          { id: 3, nazev: "Letecké tragédie" },
          { id: 4, nazev: "Napoleonské" },
          { id: 5, nazev: "Válečné" },
          { id: 6, nazev: "Tragédie bleskem" },
          { id: 7, nazev: "Lesnické tragédie" },
          { id: 8, nazev: "Lovecké a pytlácké tragédie" },
          { id: 9, nazev: "Ostatní tragédie" },
          { id: 10, nazev: "Sochy v přírodě" },
          { id: 11, nazev: "Literární" },
          { id: 12, nazev: "Jeskyňářské" },
          { id: 13, nazev: "Trampské objekty" },
          { id: 14, nazev: "Liechtensteinské" },
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
