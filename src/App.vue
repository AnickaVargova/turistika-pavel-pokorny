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
        credentials: 'include', 
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
body {
  font-family: "Libre Baskerville", serif;
  margin: 0;
}

h1,
.podnadpis {
  font-family: "Patrick Hand", cursive;
  text-align: center;
  color: #2c3e50;
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
