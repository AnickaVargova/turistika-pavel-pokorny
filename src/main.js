import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(router);
app.mount("#app");

// Service worker management
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    if (process.env.NODE_ENV === "production") {
      // Register service worker for production
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("Service Worker registered:", registration.scope);

          // Check for updates
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker available
                console.log("New service worker available");
              }
            });
          });
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    } else {
      // Unregister service worker in development mode
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => {
          for (const registration of registrations) {
            registration
              .unregister()
              .then((success) => {
                if (success) {
                  console.log("Service Worker unregistered (development mode)");
                }
              })
              .catch((error) => {
                console.error("Service Worker unregistration failed:", error);
              });
          }
        })
        .catch((error) => {
          console.error("Error getting service worker registrations:", error);
        });
    }
  });
}
