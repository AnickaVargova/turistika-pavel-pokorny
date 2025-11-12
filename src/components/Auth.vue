<template>
  <div id="wrapper">
    <Loader v-if="loading" />
    <div v-else id="authForm">
      <div v-if="authenticationError" id="error">
        Nesprávné uživatelské jméno nebo heslo.
      </div>
      <div class="area">
        <div class="label">Uživatelské jméno:</div>
        <input class="input" type="text" v-model="authObj.username" />
      </div>
      <div class="area">
        <label class="label">Heslo:</label>
        <input class="input" type="password" v-model="authObj.password" />
      </div>
      <div class="bottom">
        <span>Pamatovat si mě na tomto počítači?</span>
        <input type="checkbox" v-model="authObj.permanent" />
      </div>
      <button id="authButton" @click="authenticate">Odeslat</button>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../utils/url";
import Loader from "./Loader.vue";

export default {
  components: { Loader },
  data() {
    return {
      isAuthenticated: false,
      authenticationError: false,
      loading: false,
      authObj: {
        username: "",
        password: "",
        permanent: false,
      },
    };
  },
  methods: {
    async authenticate() {
      try {
        this.loading = true;
        this.authenticationError = false;

        const response = await fetch(`${apiUrl}/auth`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.authObj),
        });

        if (!response.ok) {
          throw new Error(`Authentication failed: ${response.statusText}`);
        }

        const data = await response.json();
        this.isAuthenticated = data.isAuthenticated;
        this.authenticationError = !data.isAuthenticated;
        this.$emit("authentication", this.isAuthenticated);
      } catch (error) {
        console.error("Authentication error:", error);
        this.authenticationError = true;
        this.isAuthenticated = false;
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style>
#wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lavender;
  position: absolute;
}

#authForm {
  padding: 30px;
  background-color: white;
  border: 2px solid green;
  border-radius: 10px;
}

.input {
  height: 30px;
  padding: 10px;
  border: 2px solid green;
  border-radius: 10px;
  margin: 30px;
}

.area {
  display: grid;
  grid-template-columns: 30% 70%;
}

.label {
  align-self: center;
}

.bottom {
  display: flex;
  margin-bottom: 20px;
  margin-right: 30px;
  justify-content: space-between;
}

#error {
  color: red;
}

#authButton {
  margin: 0;
  width: 100px;
  height: 50px;
  border: 2px solid darkgreen;
  background: springgreen;
  color: black;
  border-radius: 5px;
  margin: 10px;
}

#authButton:hover {
  background: lightslategrey;
}
</style>