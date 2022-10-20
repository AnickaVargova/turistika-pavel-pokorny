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
          nadpis: "Pomníčky",
          uvodniText: [
            {
              textOdstavce:
                "Rozdělení pomníků do skupin je jen orientační, některé památky by mohly patřit do více oddílů. Hranice, co je a co už není pomníček, je tenká. Rozhoduje hlavně, zda má jméno nebo alespoň datum, historie, podoba. Některé skupiny pomníků (letecké tragédie, napoleonské, lichtenštejnské) jsou na jiných webových stránkách zpracovány důkladněji, než tady. Uvádím je v\xa0odkazech. Vysvětlení zkratek:  S J V Z  = světové strany,  VSV = východoseverovýchod.",
            },
          ],
          kategoriePomnicky: [],
          stranka: "pomnicky",
          background: "pozadiPomnicky.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },

    created() {

       fetch(`http://localhost:8080/pomnicky/categoryCount`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then(data => this.params.kategoriePomnicky = data);
    },
  };
</script>

<style></style>
