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
            [{textOdstavce:'Většina těchto textů vznikla jako dárky  k\xa0Vánocům pro přátele. Už skoro padesát let chodíme vždy na Štědrý den dopoledne  k\xa0Vranovským jesličkám. Začali jsme s\xa0dětmi v\xa0kočárcích, teď už i vnuci odrůstají. U jesliček se stalo zvykem podělit všechny kromě cukroví a slivovice i novoročenkami. Zdálo se mi plytké vyrobit jen fotografii s\xa0nápisem a tak jsem od devadesátých let vymýšlel tato vlastivědná vypravování. Některá jsou desítky let stará. Jejich úroveň a přínos můžete posoudit sami.          Pavel'}],

          stranka: "vypraveni",
          background: "zaveje.jpg",
          backgroundDescription: "Pozadí",
          transbox: "rgba(187, 193, 209, 0.6)",
          kategoriePomnicky: []
        },
      };
    },
  };
</script>

<style></style>
