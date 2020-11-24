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
          nadpis: "Vyprávění",
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
            { id: 9, nazev: 2012 },
            { id: 10, nazev: 2011 },
            { id: 11, nazev: 2010 },
            { id: 12, nazev: 2009 },
            { id: 13, nazev: 2008 },
            { id: 14, nazev: 2007 },
            { id: 15, nazev: 2006 },
            { id: 16, nazev: 2005 },
            { id: 17, nazev: 2004 },
            { id: 18, nazev: 2003 },
            { id: 19, nazev: 2002 },
            { id: 20, nazev: 2001 },
            { id: 21, nazev: 2000 },
          ],
          stranka: "vypraveni",
          background: "zaveje.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },
  };
</script>

<style></style>
