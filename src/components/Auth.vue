<template>
  <div id="wrapper">
    <Loader v-if="loading"/>
    <div id="authForm" v-else>
      <div id="error" v-if="authenticationError">
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
      <button id="authButton" v-on:click="authenticate">Odeslat</button>
    </div>
  </div>
</template>

<script>
import { apiUrl } from "../utils/url";
import Loader from "../components/Loader.vue";
export default {
  components: { Loader},
  data() {
    return {
      isAuthenticated: false,
      authenticationError: false,
      loading: false,
      authObj: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    authenticate() {
      this.loading = true;
      setTimeout(
      () => {
      fetch(`${apiUrl}/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.authObj),
      })
        .then((res) => res.json())
        .then((data) => {
          this.isAuthenticated = data.isAuthenticated;
          this.authenticationError = data.isAuthenticated ? false : true;
          this.loading = false;
          this.$emit("authentication", this.isAuthenticated);
        })}, 2000);
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