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
        nadpis: "Studánky",
        uvodniText:
          ["Tady bude uvodni text.Lorem ipsum dolor sit amet consectetur adipisicin elit. Dignissimos suscipit fuga natus, delectus autem voluptates? Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendisofficiis, veritatis dolor ipsum impedit laudantium! Nihil?"],

        kategoriePomnicky: [
          { id: 1, nazev: "Brno město" },
          { id: 2, nazev: "Brno venkov" },
          { id: 3, nazev: "Blansko" },
          { id: 4, nazev: "Vyškov" },
          { id: 5, nazev: "Břeclav" },
          { id: 6, nazev: "Znojmo" },
          { id: 7, nazev: "Třebíč" },
          { id: 8, nazev: "Žďár nad Sázavou" },
        ],
        stranka: "studanky",
        background: "studanka.jpg",
        backgroundDescription: "Foto studánky",
        }
      };
    },
  };
</script>

<style></style>
