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
          nadpis: "Nově přidané",
          uvodniText: ["Tyto texty jsme přidali v posledních čtrnácti dnech."],
          stranka: "novepridane",
          background: "drevo.jpg",
          backgroundDescription: "Pozadí",
          transbox: "rgba(211, 214, 214, 0.8)",
        },
      };
    },

   
  };
</script>

<style></style>
