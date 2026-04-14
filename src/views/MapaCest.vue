<template>
  <div class="mapaCestPage">
    <router-link to="/" class="commonButton" id="tlacitkoDomu"
      >ÚVODNÍ STRANA</router-link
    >
    <h1>Mapa cest</h1>
    <CestyMap />
  </div>
</template>

<script setup>
import CestyMap from "../components/CestyMap.vue";
</script>

<style scoped>
.mapaCestPage {
  min-height: 100vh;
  padding: 24px 16px 40px;
  box-sizing: border-box;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  color: var(--text-primary);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.mapaCestPage h1 {
  margin: 0;
  font-size: 34px;
  font-weight: 500;
  letter-spacing: -0.5px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

#tlacitkoDomu {
  align-self: flex-end;
  min-width: unset !important;
  width: fit-content;
  max-width: unset;
  display: inline-flex;
}
</style>

