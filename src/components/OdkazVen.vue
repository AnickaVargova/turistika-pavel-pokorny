<template>
  <div>
    <span>{{ clanek.predOdkazem }}</span>
    <span
      ><a href="clanek.vnitrniOdkaz">{{ clanek.textOdkazu }}</a></span
    >
    <span>{{ clanek.zaOdkazem }}</span>
  </div>
</template>

<script>
  export default {
       props: ["clanek"],
  };
</script>

<style></style>
