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
          nadpis: "Cesty",
          uvodniText:
            "Tady bude uvodni text.Lorem ipsum dolor sit amet consectetur adipisicin elit. Dignissimos suscipit fuga natus, delectus autem voluptates? Consequuntur vitae minus quae dignissimos aspernatur, veniam perferendisofficiis, veritatis dolor ipsum impedit laudantium! Nihil?",

          kategoriePomnicky: [
            { id: 1, nazev: 2020 },
            { id: 2, nazev: 2019 },
            { id: 3, nazev: 2018 },
            { id: 4, nazev: 2017 },
            { id: 5, nazev: 2016 },
            { id: 6, nazev: 2015 },
            { id: 7, nazev: 2014 },
            { id: 8, nazev: 2013 },
          ],
          stranka: "cesty",
          background: "cesty.jpg",
          backgroundDescription: "Foto krajiny",
        },
      };
    },
  };
</script>

<style></style>
