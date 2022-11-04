<template>
  <Sablona v-bind:params="params" />
</template>

<script>
  import Sablona from "./../components/Sablona.vue";
  export default {
    components: {
      Sablona: Sablona,
    },

    data() {
      return {
        params: {
          nadpis: "Naposled přidané",
          uvodniText: [""],
          stranka: "novepridane",
          background: "drevo.jpg",
          backgroundDescription: "Pozadí",
          transbox: "rgba(211, 214, 214, 0.8)",
          kategoriePomnicky: []
        },
      };
    }

   
  };
</script>

<style></style>
