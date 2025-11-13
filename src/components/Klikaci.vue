<template>
  <span>
    <span v-for="(odkaz, index) in odkazy" :key="index">
      <span>
        <a
          v-if="getLinkUrl(odkaz)"
          :href="getLinkUrl(odkaz)"
          target="_blank"
          class="vnitrniOdkaz"
        >
          {{ odkaz.textOdkazu }}
        </a>
      </span>
      <span v-html="odkaz.zaOdkazem"></span>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    clanek: {
      type: Object,
      required: true,
    },
    kdeJsem: {
      type: String,
      required: true,
    },
  },
  computed: {
    odkazy() {
      if (!this.clanek.vnitrniOdkazy) {
        return [];
      }
      return this.clanek.vnitrniOdkazy.filter(
        (odkaz) => odkaz.odkazKde?.trim() === this.kdeJsem
      );
    },
  },
  methods: {
    getLinkUrl(odkaz) {
      if (odkaz.odkazKategorie === "url") {
        return odkaz.targetUrl;
      }
      if (odkaz.odkazPodkategorie && odkaz.vnitrniOdkaz) {
        return `/${odkaz.odkazKategorie.trim()}/${odkaz.odkazPodkategorie}/${odkaz.vnitrniOdkaz}`;
      }
      if (odkaz.odkazKategorie) {
        return `/${odkaz.odkazKategorie}`;
      }
      return null;
    },
  },
};
</script>

<style>
.vnitrniOdkaz {
  color: var(--link-color);
  text-decoration: none;
  font-weight: 600;
  border-bottom: 2px solid transparent;
  transition: var(--transition);
  padding-bottom: 1px;
}

.vnitrniOdkaz:hover,
.vnitrniOdkaz:active {
  color: var(--link-hover);
  border-bottom-color: var(--link-hover);
}
</style>
