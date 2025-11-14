// Service Worker for image and API caching
const CACHE_NAME = "turistika-images-v1";
const IMAGE_CACHE_NAME = "turistika-images-cache-v1";
const API_CACHE_NAME = "turistika-api-cache-v1";

// Images from API that should be cached
const IMAGE_PATTERNS = [
  /\/photos\/small\//,
  /\/photos\/medium\//,
  /\/photos\/large\//,
];

// API endpoints that should be cached
const API_PATTERNS = [
  /\/pomnicky/,
  /\/krize/,
  /\/studanky/,
  /\/vypraveni/,
  /\/cesty/,
  /\/novePridane/,
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return (
              name !== CACHE_NAME &&
              name !== IMAGE_CACHE_NAME &&
              name !== API_CACHE_NAME
            );
          })
          .map((name) => {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          })
      );
    })
  );
  return self.clients.claim(); // Take control of all pages immediately
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip cross-origin requests (except API)
  if (
    url.origin !== self.location.origin &&
    !url.href.includes("hrobecky.ddns.net")
  ) {
    return;
  }

  // Handle image requests - Cache First strategy
  if (IMAGE_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE_NAME));
    return;
  }

  // Handle API requests - Network First with fallback
  if (API_PATTERNS.some((pattern) => pattern.test(url.pathname))) {
    event.respondWith(networkFirstStrategy(request, API_CACHE_NAME));
    return;
  }

  // Handle static assets - Cache First
  if (
    url.pathname.endsWith(".js") ||
    url.pathname.endsWith(".css") ||
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".jpeg") ||
    url.pathname.endsWith(".webp") ||
    url.pathname.endsWith(".svg")
  ) {
    event.respondWith(cacheFirstStrategy(request, CACHE_NAME));
    return;
  }
});

// Cache First strategy - good for images and static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    // Check cache first
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // If not in cache, fetch from network
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Clone response and cache it
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    console.error("Cache First strategy failed:", error);
    // Fallback to network
    return fetch(request);
  }
}

// Network First strategy - good for API data
async function networkFirstStrategy(request, cacheName) {
  try {
    // Try network first
    const networkResponse = await fetch(request);

    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(cacheName);
      const responseClone = networkResponse.clone();
      cache.put(request, responseClone);
    }

    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    console.log("Network failed, trying cache:", error);
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Both failed, return error response
    return new Response("Offline - no cached data available", {
      status: 503,
      statusText: "Service Unavailable",
    });
  }
}
