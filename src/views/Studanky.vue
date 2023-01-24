<template>
  <Sablona v-bind:params="params" />
</template>

<script>
import Sablona from "./../components/Sablona.vue";
import { apiUrl } from "../utils/url";
export default {
  components: {
    Sablona: Sablona,
  },

  data() {
    return {
      params: {
        nadpis: "Studánky",
        uvodniText: [
          {
            textOdstavce:
              "Od ledna 2023 začínám přidávat i hesla studánek brněnského okolí. Na rozdíl od pomníčků jsou studánky daleko častěji mezi lidmi předmětem zájmu, hledání a bádání. Nejdůkladnějším studánkovým webem jsou <span><a href='https://www.estudanky.eu/' target='_blank' class='vnitrniOdkaz'>E-studánky</a></span>.  Ale v posledních letech tento web sklouzává k zaznamenávání nefunkčních pump na návsích a kdejakého bahniska v lese. Ty tady nenajdete. Snaha je dávat sem studánky fungující. Bohužel v posledních  suchých letech slabší prameny ztrácejí vodu a tečou jen občas.<br>Studánky jsou zakresleny v mapě na úvodní straně <strong>fialovou</strong> kapkou. “Klasické” pomníčky jsou <strong>modré</strong>, sochy v přírodě <strong>zelené</strong>, sakrální objekty (kříže, boží muka, kapličky, křížové cesty) <strong>žluté</strong>. Smírčí kameny a trampské chaty nejsou v mapě zakresleny nijak, první z důvodů bezpečnosti, druhé kvůli ochraně soukromí.",
          },
        ],
        kategoriePomnicky: [],
        stranka: "studanky",
        background: "studanka.jpg",
        transbox: "rgba(170, 173, 201, 0.8)",
        backgroundDescription: "Foto studánky",
      },
    };
  },
  created() {
    fetch(`${apiUrl}/studanky/categoryCount`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => (this.params.kategoriePomnicky = data));
  },
};
</script>

<style></style>
