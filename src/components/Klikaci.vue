<template>
  <div>
    <span v-for="(odkaz, index) in odkazy" v-bind:key="index">
      <span>{{ odkaz.predOdkazem }}</span>
      <span>
        <router-link
          v-if="$route.name === 'SmirciKrize'"
          class="vnitrniOdkaz"
          v-bind:to="
            `/smircikrize/vypraveni/${odkaz.odkazPodkategorie}/${odkaz.vnitrniOdkaz}`
          "
          >{{ odkaz.textOdkazu }}</router-link
        >
        <router-link
          v-else-if="odkaz.odkazPodkategorie && odkaz.vnitrniOdkaz"
          class="vnitrniOdkaz"
          v-bind:to="
            `/${odkaz.odkazKategorie.trim()}/${odkaz.odkazPodkategorie}/${
              odkaz.vnitrniOdkaz
            }`
          "
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
  </div>
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
