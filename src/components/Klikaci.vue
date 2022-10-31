<template>
  <span>
    <span v-for="(odkaz, index) in odkazy" v-bind:key="index">
      <span>
        <span v-if="odkaz.odkazKategorie === 'url'">
          <a href="https://www.aktualne.cz/" target="_blank" class="vnitrniOdkaz">{{
           odkaz.textOdkazu
          }}</a>
        </span>  
        <router-link
           v-else-if="$route.name === 'SmirciKrize'"
          class="vnitrniOdkaz"
          v-bind:to="`/krize/vypraveni/${odkaz.odkazPodkategorie}/${odkaz.vnitrniOdkaz}`"
          >{{ odkaz.textOdkazu }}</router-link
        >
        <router-link
          v-else-if="odkaz.odkazPodkategorie && odkaz.vnitrniOdkaz"
          class="vnitrniOdkaz"
          v-bind:to="`/${odkaz.odkazKategorie.trim()}/${
            odkaz.odkazPodkategorie
          }/${odkaz.vnitrniOdkaz}`"
          >{{ odkaz.textOdkazu }}</router-link
        >
        <router-link
          v-else-if="odkaz.odkazKategorie"
          class="vnitrniOdkaz"
          v-bind:to="`/${odkaz.odkazKategorie}`"
          >{{ odkaz.textOdkazu }}</router-link
        >
      </span>
      <span v-html="odkaz.zaOdkazem">{{ odkaz.zaOdkazem }}</span>
    </span>
  </span>
</template>

<script>
export default {
  props: ["clanek", "kdeJsem"],
  data() {
    return {
      odkazy: undefined,
    };
  },
  created() {
    this.odkazy = this.clanek.vnitrniOdkazy.filter(
      (odkaz) => odkaz.odkazKde.trim() === this.kdeJsem
    );
    console.log(this.odkazy);
    console.log(this.$route.name); 
  },
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
