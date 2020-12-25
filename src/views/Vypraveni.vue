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
            ['Většina těchto textů vznikla jako dárky  k\xa0Vánocům pro přátele. Už skoro padesát let chodíme vždy na Štědrý den dopoledne  k\xa0Vranovským jesličkám. Začali jsme s\xa0dětmi v\xa0kočárcích, teď už i vnuci odrůstají. U jesliček se stalo zvykem podělit všechny kromě cukroví a slivovice i novoročenkami. Zdálo se mi plytké vyrobit jen fotografii s\xa0nápisem a tak jsem od devadesátých let vymýšlel tato vlastivědná vypravování. Některá jsou desítky let stará. Jejich úroveň a přínos můžete posoudit sami.          Pavel'],


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
          transbox: "rgba(187, 193, 209, 0.6)",
        },
      };
    },
  };
</script>

<style></style>
