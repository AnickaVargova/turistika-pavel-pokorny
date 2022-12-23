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
