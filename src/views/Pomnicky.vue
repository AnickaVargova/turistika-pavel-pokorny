<template>
  <Sablona :params="params" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import Sablona from "./../components/Sablona.vue";
import { useArticles } from "../composables/useArticles";

const { fetchCategoryCount } = useArticles();

const params = ref({
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
});

onMounted(async () => {
  const data = await fetchCategoryCount("pomnicky");
  params.value.kategoriePomnicky = data;
});
</script>

<style></style>
