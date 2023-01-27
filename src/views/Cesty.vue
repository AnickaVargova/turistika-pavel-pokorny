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
        uvodniText: [
          {
            textOdstavce:
              "Snažíme se vybírat si méně obvyklé cesty a oblasti, do kterých se často nejezdí, nebo aspoň směřujeme do známých míst jindy a jinak než je zvykem. Ne vždy se nám to daří. Posuďte sami.",
          },
          {
            textOdstavce:
              "Starší cesty než ty, co jsou zde, lze najít na úvodní stránce pod tlačítkem <span><a href='https://turistapavel.rajce.idnes.cz/' target='_blank' class='vnitrniOdkaz'>MOJE RAJČE</a></span> kde jsem začal dávat obrázky počínaje jarem 2014. K ještě starším cestám jsem se vrátil později, až byl čas, a najdete je tamtéž s poznámkou RETRO. Je to 13 cest z let 2008 - 2015.",
          },
        ],
        stranka: "cesty",
        background: "horyMlha.jpg",
        backgroundDescription: "Pozadí",
      },
    };
  },
};
</script>

<style></style>
