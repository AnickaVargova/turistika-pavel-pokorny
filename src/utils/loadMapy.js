let mapyPromise;

export const loadMapy = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Mapy.cz cannot load on the server."));
  }

  if (window.SMap && window.Loader) {
    return Promise.resolve(window.SMap);
  }

  if (mapyPromise) {
    if (window.SMap && window.Loader) {
      mapyPromise = Promise.resolve(window.SMap);
    }
    return mapyPromise;
  }

  mapyPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector('script[src="https://api.mapy.cz/loader.js"]');
    if (existing) {
      if (window.SMap && window.Loader) {
        resolve(window.SMap);
        return;
      }
      existing.addEventListener("load", () => {
        window.Loader.async = true;
        window.Loader.load(null, () => resolve(window.SMap));
        setTimeout(() => window.SMap && resolve(window.SMap), 1500);
      });
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Mapy.cz loader."))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api.mapy.cz/loader.js";
    script.async = true;
    script.onload = () => {
      window.Loader.async = true;
      window.Loader.load(null, () => resolve(window.SMap));
      setTimeout(() => window.SMap && resolve(window.SMap), 1500);
    };
    script.onerror = () => reject(new Error("Failed to load Mapy.cz loader."));
    document.head.appendChild(script);
  });

  return mapyPromise;
};



