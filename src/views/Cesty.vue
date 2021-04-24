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
                "Když jsem v září 2020 promýšlel koncepci webových stránek, předpokládal jsem, že do oddílu CESTY budu dávat jen vícedenní výpravy na hory. Koronavir rozhodl jinak. Od října 2020 je u nás zákaz ubytovávání, cesty do ciziny jen ze zvláštních důvodů, od 1. března 2021 na 6 dlouhých týdnů dokonce zákaz vycestování z okresu - tvrdé opatření, zvláště pro nepokojné duše. A nikdo neví, kdy a jak to vše skončí (psáno v dubnu 2021).",
            },
            {
              textOdstavce:
                "Starší cesty než ty, co budou zde, lze najít na úvodní stránce pod tlačítkem    <span><a href='https://turistapavel.rajce.idnes.cz/' target='_blank' class='vnitrniOdkaz'>MOJE RAJČE</a></span>, kam jsem začal dávat obrázky počínaje jarem 2014. K ještě starším cestám jsem se vrátil později, až byl čas, a najdete je tamtéž s poznámkou RETRO. Je to 13 cest z let 2008 - 2015. Od roku 2007 fotím digitálním aparátem. Dřívější cesty mám zachycené na diapozitivech, bohužel je nelze jednoduše digitalizovat ve slušné kvalitě. Je to škoda, zvláště kvůli letním i zimním výpravám do rumunských Karpat 70. a 80. let 20. století.",
            },
          ],

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
          background: "horyMlha.jpg",
          backgroundDescription: "Pozadí",
        },
      };
    },
  };
</script>

<style></style>
