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
          nadpis: "Smírčí kříže",
          uvodniText:
            "Tady bude uvodni text. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ignissimos suscipit fuga natus, delectus autem voluptates? Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendis  officiis, veritatis dolor ipsum impedit laudantium! Nihil?",

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

       
  };
</script>

<style></style>
