<template>
  <span>
    <span v-for="(odkaz, index) in odkazy" v-bind:key="index">
      <span>
        <span v-if="odkaz.odkazKategorie === 'url'">
          <a
            v-bind:href="odkaz.targetUrl"
            target="_blank"
            class="vnitrniOdkaz"
            >{{ odkaz.textOdkazu }}</a
          >
        </span>
        <span v-else-if="odkaz.odkazPodkategorie && odkaz.vnitrniOdkaz">
          <a
            v-bind:href="`/${odkaz.odkazKategorie.trim()}/${
              odkaz.odkazPodkategorie
            }/${odkaz.vnitrniOdkaz}`"
            target="_blank"
            class="vnitrniOdkaz"
          >
            {{ odkaz.textOdkazu }}
          </a>
        </span>
        <span v-else-if="odkaz.odkazKategorie">
          <a
            v-bind:href="`/${odkaz.odkazKategorie}`"
            target="_blank"
            class="vnitrniOdkaz"
          >
            {{ odkaz.textOdkazu }}
          </a>
        </span>
      </span>
      <span v-html="odkaz.zaOdkazem"></span>
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
  },
};
</script>

<style>
.vnitrniOdkaz {
  color: rgb(59, 43, 204);
  text-decoration: underline;
  font-weight: bold;
}

.vnitrniOdkaz:hover,
.vnitrniOdkaz:active {
  color: rgb(93, 102, 143);
}
</style>
