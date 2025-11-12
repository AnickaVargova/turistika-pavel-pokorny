<template>
  <div id="odkazy">
    <div id="transbox1">
      <router-link class="kontejnerDomuOnas" to="/">
        <div class="commonButton" id="domuOnas" :style="{ margin: '20px' }">
          Úvodní strana
        </div>
      </router-link>

      <h1>Sympatické weby</h1>

      <div id="oknoOdkazy">
        <div
          v-for="(odkaz, index) in odkazy"
          :key="index"
          class="odkazy"
        >
          <a :href="odkaz.adresa" target="_blank">{{ odkaz.jmeno }}</a>
          <span>{{ odkaz.popis }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import odkazy from "@/components/odkazy.js";

export default {
  data() {
    return {
      odkazy: odkazy,
    };
  },
};
</script>

<style>
:root {
  --primary-color: #2563eb;
  --primary-hover: #1d4ed8;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --link-color: #2563eb;
  --link-hover: #1d4ed8;
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --border-color: #e2e8f0;
  --border-radius: 12px;
  --border-radius-sm: 8px;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

#odkazy {
  background-image: url("./../assets/presypy.jpg");
  width: 100%;
  position: relative;
}

#domuOnas {
  padding: 0 14px;
  margin-bottom: 40px;
  width: 116px;
  height: 38px;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-hover) 100%);
  color: white;
  border: none;
  box-shadow: var(--shadow-md);
  transition: var(--transition);
}

#domuOnas:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  color: white;
}

.kontejnerDomuOnas {
  grid-column: 6/7;
  grid-row: 1/3;
  position: relative;
  z-index: 10;
}

#odkazy .commonButton {
  min-width: 0;
}

#odkazy #transbox1 {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.75) 0%, rgba(248, 250, 252, 0.65) 100%);
  backdrop-filter: blur(2px);
  min-height: 100vh;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-auto-rows: 60px;
  position: relative;
  z-index: 2;
  pointer-events: none;
}

#odkazy #transbox1 > * {
  pointer-events: auto;
}

#odkazy h1 {
  grid-column: 1/7;
  grid-row: 2/3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--text-primary);
  font-weight: 700;
  font-size: 36px;
  letter-spacing: -0.5px;
}

#oknoOdkazy {
  grid-column: 1/7;
  grid-row-start: 3;
  margin: auto;
  background-color: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 30px;
  margin-top: 50px;
  box-shadow: var(--shadow-lg);
}

#oknoOdkazy .odkazy {
  font-size: 18px;
  line-height: 1.6;
  margin-top: 20px;
  color: var(--text-secondary);
}

.odkazy a {
  margin: 0;
  margin-right: 3%;
  padding: 0;
  color: var(--link-color);
  text-decoration: none;
  font-weight: 600;
  transition: var(--transition);
  border-bottom: 2px solid transparent;
}

.odkazy a:hover,
.odkazy a:active {
  color: var(--link-hover);
  border-bottom-color: var(--link-hover);
}

#odkazy span {
  font-size: 15px;
  color: var(--text-secondary);
}

  @media (max-width: 600px) {
    #oknoOdkazy {
      grid-column: 1/7;
      grid-row-start: 3;
      margin: auto;
      background-color: rgb(240, 233, 223);
      border: 2px solid grey;
      border-radius: 10px;
      padding: 20px;
      margin-top: 40px;
    }

    #oknoOdkazy .odkazy {
      font-size: 15px;
    }

    #odkazy span {
      font-size: 15px;
    }
  }
</style>
