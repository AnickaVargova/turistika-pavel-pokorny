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
        nadpis: "Studánky",
        uvodniText: [
          {
            textOdstavce:
              "Od ledna 2023 začínám přidávat i hesla studánek brněnského okolí. Na rozdíl od pomníčků jsou studánky daleko častěji mezi lidmi předmětem zájmu, hledání a bádání. Nejdůkladnějším studánkovým webem jsou <span><a href='https://www.estudanky.eu/' target='_blank' class='vnitrniOdkaz'>E-studánky</a></span>.  Ale v posledních letech tento web sklouzává k zaznamenávání nefunkčních pump na návsích a kdejakého bahniska v lese. Ty tady nenajdete. Snaha je dávat sem studánky fungující. Bohužel v posledních  suchých letech slabší prameny ztrácejí vodu a tečou jen občas.",
          },
        ],
        kategoriePomnicky: [],
        stranka: "studanky",
        background: "studanka.jpg",
        transbox: "rgba(212, 225, 233, 0.5)",
        backgroundDescription: "Foto studánky",
      },
      error: null,
    };
  },

  async created() {
    try {
      const response = await fetch(`${apiUrl}/studanky/categoryCount`, {
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
