<template>
  <div>
    <span>{{ clanek.predOdkazem }}</span>
    <span
      v-if="clanek.kategorie === clanek.odkazKategorie"
      v-on:click="zobrazOdkaz(clanek.vnitrniOdkaz)"
      class="vnitrniOdkaz"
      >{{ clanek.textOdkazu }}</span
    >

    <span v-else-if="clanek.kategorie !== clanek.odkazKategorie">
      <router-link
        class="vnitrniOdkaz"
        v-bind:to="
          `/${clanek.odkazKategorie}/${clanek.podkategorie}/${clanek.vnitrniOdkaz}`
        "
        >{{ clanek.textOdkazu }}</router-link
      >
    </span>
    <span>{{ clanek.zaOdkazem }}</span>
  </div>
</template>

<script>
  import vsechnyClanky from "./../components/clanky.js";
  export default {
    props: ["clanek"],

    data() {
      return {
        clanky: vsechnyClanky.data,
      };
    },
    methods: {
      zobrazOdkaz(id) {
        this.$emit("kliknuti", id);
      },
    },
  };
</script>

<style>
  .vnitrniOdkaz {
    color: rgb(37, 161, 32);
    text-decoration: underline;
  }

  .vnitrniOdkaz:hover,
  .vnitrniOdkaz:active {
    color: rgb(121, 153, 67);
  }
</style>
