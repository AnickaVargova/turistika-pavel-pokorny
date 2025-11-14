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
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: absolute;
}

#authForm {
  padding: 40px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-xl);
  min-width: 400px;
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  #authForm {
    min-width: unset;
    max-width: calc(100vw - 40px);
    padding: 30px 20px;
    margin: 20px;
  }
}

.input {
  height: 44px;
  padding: 12px 16px;
  border: 2px solid var(--border-color);
  border-radius: var(--border-radius-sm);
  margin: 20px 30px;
  font-size: 15px;
  transition: var(--transition);
  background: var(--bg-secondary);
  box-sizing: border-box;
  width: calc(100% - 60px);
}

@media (max-width: 600px) {
  .input {
    margin: 8px 0;
    width: 100%;
    font-size: 16px; /* Prevents zoom on iOS */
  }
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  background: var(--bg-primary);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.area {
  display: grid;
  grid-template-columns: 30% 70%;
  gap: 10px;
}

@media (max-width: 600px) {
  .area {
    grid-template-columns: 1fr;
    gap: 8px;
  }

  .label {
    margin-bottom: 4px;
  }
}

.label {
  align-self: center;
  font-weight: 600;
  color: var(--text-primary);
}

.bottom {
  display: flex;
  margin-bottom: 24px;
  margin-right: 30px;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--text-secondary);
}

@media (max-width: 600px) {
  .bottom {
    margin-right: 0;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 8px;
  }

  .bottom span {
    font-size: 13px;
  }
}

.bottom input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: var(--primary-color);
}

#error {
  color: var(--error-color);
  background: #fee2e2;
  padding: 12px 16px;
  border-radius: var(--border-radius-sm);
  margin-bottom: 20px;
  font-size: 14px;
  border: 1px solid #fecaca;
  box-sizing: border-box;
}

@media (max-width: 600px) {
  #error {
    padding: 10px 12px;
    font-size: 13px;
    margin-bottom: 16px;
  }
}

#authButton {
  display: block;
  width: calc(100% - 60px);
  height: 48px;
  border: none;
  background: linear-gradient(
    135deg,
    var(--primary-color) 0%,
    var(--primary-hover) 100%
  );
  color: white;
  border-radius: var(--border-radius-sm);
  margin: 10px 30px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow-md);
  box-sizing: border-box;
}

@media (max-width: 600px) {
  #authButton {
    width: 100%;
    margin: 10px 0;
    height: 44px;
    font-size: 14px;
  }
}

#authButton:hover {
  box-shadow: var(--shadow-lg);
}

#authButton:active {
  transform: translateY(0);
}
</style>