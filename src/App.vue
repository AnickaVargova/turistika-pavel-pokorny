<template>
  <body>
    <Auth
      @authentication="handleAuthentication"
      v-if="!authenticated && origin === testUrl"
    />
    <router-view :key="$route.fullPath" v-else />
  </body>
</template>

<script>
import Auth from "./components/Auth.vue";
import { apiUrl, testUrl } from "./utils/url";

export default {
  components: { Auth },
  data() {
    return {
      authenticated: origin === testUrl ? false : true,
      testUrl,
      origin: window.location.origin,
    };
  },

  methods: {
    handleAuthentication(value) {
      if (value) {
        this.authenticated = true;
      }
    },
  },
  created() {
    if (this.origin === this.testUrl) {
      fetch(`${apiUrl}/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.authenticated = data.isAuthenticated;
        });
    }
  },
};
</script>

<style>
:root {
  /* Colors */
  --primary-color: #375597;
  --primary-hover: #4d6dc8;
  --secondary-color: #64748b;
  --error-color: #ef4444;
  --link-color: #2563eb;
  --link-hover: #1d4ed8;

  /* Button Colors */
  --button-text-color: rgb(228, 231, 236);
  --button-text-hover: #ffffff;

  /* Text Colors */
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-accent: #2563eb;

  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --bg-accent: #f1f5f9;
  --bg-hover: #f8fafc;

  /* Borders */
  --border-color: #e2e8f0;
  --border-radius: 12px;
  --border-radius-sm: 8px;

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);

  /* Transitions */
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

body {
  font-family: "Libre Baskerville", serif;
  margin: 0;
}

h1 {
  font-family: "Libre Baskerville", serif;
  font-weight: 500;
  font-size: 35px;
  margin-top: 40px;
  text-align: center;
  color: #2c3e50;
}

.podnadpis {
  font-family: "Patrick Hand", cursive;
  text-align: center;
  color: #2c3e50;
}

h2 {
  font-size: 24px;
  font-weight: 550;
}

.special {
  color: #672d73;
}

.podnadpis {
  margin: 40px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
