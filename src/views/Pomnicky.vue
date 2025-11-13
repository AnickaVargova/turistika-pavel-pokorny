<template>
  <Sablona :params="params" />
</template>

<script>
import Sablona from "./../components/Sablona.vue";
import { apiUrl } from "../utils/url";

export default {
  components: {
    Sablona,
  },

  data() {
    return {
      params: {
        nadpis: "Pomníčky",
        uvodniText: [
          {
            textOdstavce:
              'Rozdělení pomníků do skupin je jen orientační, některé památky by mohly patřit do více oddílů. Hranice, co je a co už není pomníček, je tenká. Rozhoduje hlavně, zda má jméno nebo alespoň datum, historie, podoba. Některé skupiny pomníků (letecké tragédie, napoleonské, lichtenštejnské) jsou na jiných webových stránkách zpracovány důkladněji, než tady. Uvádím je v\xa0odkazech. Vysvětlení zkratek:  S J V Z  = světové strany,  VSV = východoseverovýchod. Značka <i class="fa-solid fa-book-open"></i> u jména pomníčku v abecedním seznamu označuje rozsáhlejší text.',
          },
        ],
        kategoriePomnicky: [],
        stranka: "pomnicky",
        background: "pozadiPomnicky.jpg",
        transbox: "rgba(220, 224, 226, 0.2)",
        backgroundDescription: "Pozadí",
      },
      error: null,
    };
  },

  async created() {
    try {
      const response = await fetch(`${apiUrl}/pomnicky/categoryCount`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      this.params.kategoriePomnicky = data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      this.error = error.message;
    }
  },
};
</script>

<style></style>
