<template>
  <div v-if="zalozka.text.length" class="zalozkaSmall" @click="goToPar">
    {{ zalozka.text }}
  </div>
</template>

<script>
export default {
  props: {
    zalozka: {
      type: Object,
      required: true,
    },
  },

  methods: {
    goToPar() {
      sessionStorage.setItem("paragraphId", this.zalozka.paragraphId);
    },
  },
};
</script>

<style>
.zalozkaSmall {
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  margin-right: 8px;
  margin-bottom: 8px;
  border-radius: var(--border-radius-sm);
  background: var(--bg-accent);
  color: var(--primary-color);
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-sm);
}

.zalozkaSmall:hover {
  border-color: var(--primary-color);
  color: var(--primary-hover);
  background: var(--bg-hover);
  transform: translateY(-1px);
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 0.1);
}
</style>