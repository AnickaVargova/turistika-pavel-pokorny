<template>
  <div>
    <span>{{ clanek.predOdkazem }}</span>
    <span>
      <router-link
        
        class="vnitrniOdkaz"
        v-bind:to="
          `/${clanek.odkazKategorie}/${clanek.odkazPodkategorie}/${clanek.vnitrniOdkaz}`
        "
        >{{ clanek.textOdkazu }}</router-link
      >
    </span>
    <span>{{ clanek.zaOdkazem }}</span>
  </div>
</template>

<script>
  export default {
    props: ["clanek"],
   
  };
</script>

<style>
  .vnitrniOdkaz {
    color: rgb(59, 43, 204);
    text-decoration: underline;
  }

  .vnitrniOdkaz:hover,
  .vnitrniOdkaz:active {
    color: rgb(93, 102, 143);
  }
</style>
