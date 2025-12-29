<template>
  <div class="cestyMapCard">

    <div v-if="loading" class="mapStatus">
      <Loader />
      <p>Načítám body cest…</p>
    </div>

    <div v-else-if="error" class="mapStatus error">
      <p>{{ error }}</p>
      <small>Pokud problém přetrvá, zkuste obnovit stránku.</small>
    </div>

    <div v-else-if="!hasMarkers" class="mapStatus">
      <p>Mapová data nejsou k dispozici.</p>
      <small>Přidejte body na backendu nebo do složky na mapy.com.</small>
    </div>

    <div v-else ref="mapContainer" class="cestyMapContainer"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from "vue";
import L from "leaflet";
import { useApi } from "../composables/useApi";
import { apiUrl } from "../utils/url";
import Loader from "./Loader.vue";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import horyMlha from "../assets/horyMlha.jpg";

// Cache map data across navigations to avoid refetching when returning from detail
const MAP_CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes
let cachedMarkersStore = null;
let cachedMarkersTimestamp = 0;
let cachedViewState = null;

const cloneMarkers = (list = []) => list.map((item) => ({ ...item }));
const isMarkerCacheFresh = () =>
  cachedMarkersStore && Date.now() - cachedMarkersTimestamp < MAP_CACHE_TTL_MS;
const getCachedMarkers = () => (isMarkerCacheFresh() ? cloneMarkers(cachedMarkersStore) : null);
const setCachedMarkers = (list) => {
  cachedMarkersStore = cloneMarkers(list);
  cachedMarkersTimestamp = Date.now();
};
const setCachedViewState = (map) => {
  try {
    if (!map) return;
    const center = map.getCenter();
    const zoom = map.getZoom();
    const bounds = map.getBounds();

    cachedViewState = {
      center: [center.lat, center.lng],
      zoom,
      bounds: [
        [bounds.getSouth(), bounds.getWest()],
        [bounds.getNorth(), bounds.getEast()],
      ],
    };
  } catch (err) {
    console.warn("[CestyMap] unable to cache view state", err);
  }
};
const getCachedViewState = () => cachedViewState;

const props = defineProps({
  endpoint: {
    type: String,
    default: "/cesty/map",
  },
});

const mapContainer = ref(null);
const mapInstance = ref(null);
const markerLayer = ref(null);
const markers = ref([]);
const loading = ref(false);
const error = ref(null);

// Ensure marker icons resolve correctly when bundled by Vite
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const { get } = useApi();

const hasMarkers = computed(() => markers.value.length > 0);

const resolveLatLng = (item, index) => {
  if (typeof item.lat === "number" && typeof item.lng === "number") {
    return { lat: item.lat, lng: item.lng };
  }

  let coords = item.souradnice || item.coords || item.coordinates;
  if (coords) {
    coords = coords.split(", ")
    .map((item) => Number(item.replace(/[NE]/, "")));
  }
  if (Array.isArray(coords) && coords.length >= 2) {
    const [lat, lng] = coords;
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (Number.isFinite(latNum) && Number.isFinite(lngNum)) {
      return { lat: latNum, lng: lngNum };
    }
  }

  if (coords && typeof coords === "object") {
    const latNum = Number(coords.lat ?? coords.latitude);
    const lngNum = Number(coords.lng ?? coords.longitude);
    if (Number.isFinite(latNum) && Number.isFinite(lngNum)) {
      return { lat: latNum, lng: lngNum };
    }
  }

  return null;
};

const resolveDetailPath = (item) => {
  if (item.detailPath) return item.detailPath;
  if (item.kategorie && item.podkategorie && item.id) {
    return `/${item.kategorie}/${item.podkategorie}/${item.id}`;
  }
  // Fallback for cesty items that may have podkategorie but no kategorie set
  if (item.podkategorie && item.id) {
    return `/cesty/${item.podkategorie}/${item.id}`;
  }
  return undefined;
};

const resolveImageUrl = (item) => {
  if (item.imageUrl) return item.imageUrl;
  if (item.fotkaUvod) {
    const photo = item.fotkaUvod.trim();
    if (photo.startsWith("http")) return photo;
    return `${apiUrl}/photos/medium/${photo}`;
  }
  return horyMlha;
};

const normalizeMarkers = (rawMarkers = []) => {
  if (!Array.isArray(rawMarkers)) return [];

  return rawMarkers
    .map((item, index) => {
      if (!item) return null;
      const coords = resolveLatLng(item, index);
      if (!coords) return null;

      const detailPath = resolveDetailPath(item);
      if (!detailPath) return null;

      return {
        id: item.id ?? `${lat}-${lng}-${index}`,
        title: item.title ?? item.nazev ?? "Cesta",
        detailPath,
        lat: coords.lat,
        lng: coords.lng,
        snippet: item.snippet ?? item.perex ?? item.popis,
        category: item.category ?? item.podkategorie,
        year: item.year,
        bounds: item.bounds,
        date: item.date ?? item.datum,
        imageUrl: resolveImageUrl(item),
      };
    })
    .filter(Boolean);
};

const fetchMarkers = async () => {
  const cached = getCachedMarkers();
  if (cached?.length) {
    markers.value = cached;
    loading.value = false;
    error.value = null;
    return { fromCache: true };
  }

  loading.value = true;
  error.value = null;

  const loadCestyList = async () => {
    try {
      const articleMarkers = normalizeMarkers(await get("/cesty/1"));
      return articleMarkers;
    } catch (articleErr) {
      console.warn("[CestyMap] failed to load cesty list for map", articleErr);
      return [];
    }
  };

  try {
    const liveData = normalizeMarkers(await get(props.endpoint));
    if (liveData.length) {
      markers.value = liveData;
    } else {
      const articleMarkers = await loadCestyList();
      markers.value = articleMarkers;
      if (!articleMarkers.length) {
        error.value = "Mapová data nejsou k dispozici.";
      }
    }
  } catch (err) {
    console.error("[CestyMap] failed to load map data", err);
    const articleMarkers = await loadCestyList();
    markers.value = articleMarkers;
    if (!articleMarkers.length) {
      error.value = "Nepodařilo se načíst mapová data.";
    }
  } finally {
    if (markers.value.length) {
      setCachedMarkers(markers.value);
    }
    loading.value = false;
  }
};

const buildBoundsLatLngs = () => {
  const coords = [];

  markers.value.forEach((marker) => {
    if (marker.bounds && Array.isArray(marker.bounds) && marker.bounds.length === 2) {
      const [[southLat, westLng], [northLat, eastLng]] = marker.bounds;
      coords.push(L.latLng(southLat, westLng));
      coords.push(L.latLng(northLat, eastLng));
    } else if (marker.lat != null && marker.lng != null) {
      coords.push(L.latLng(marker.lat, marker.lng));
    }
  });

  return coords;
};

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const renderMap = async () => {
  try {
    if (!mapContainer.value) return;
    if (!markers.value.length) return;

    const cachedView = getCachedViewState();

    if (!mapInstance.value) {
      const defaultCenter = markers.value[0];
      const lat = cachedView?.center?.[0] ?? defaultCenter?.lat ?? 49.8;
      const lng = cachedView?.center?.[1] ?? defaultCenter?.lng ?? 15.5;
      const zoom = cachedView?.zoom ?? 7;

      mapInstance.value = L.map(mapContainer.value).setView([lat, lng], zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance.value);
    }

    if (!markerLayer.value) {
      markerLayer.value = L.layerGroup().addTo(mapInstance.value);
    } else {
      markerLayer.value.clearLayers();
    }

    const coordsForBounds = [];

    markers.value.forEach((marker, index) => {
      if (marker.lat == null || marker.lng == null) return;

      const popupParts = [`<strong>${escapeHtml(marker.title || "Cesta")}</strong>`];

      if (marker.date) {
        popupParts.push(`<div class="mapyCardMeta">${escapeHtml(marker.date)}</div>`);
      }

      const bodyParts = [];

      if (marker.imageUrl) {
        bodyParts.push(
          `<img class="mapyCardImage" src="${escapeHtml(marker.imageUrl)}" alt="${escapeHtml(
            marker.title || "Cesta"
          )}" loading="lazy" />`
        );
      }

      if (bodyParts.length) {
        popupParts.push(`<div class="mapyCardBody">${bodyParts.join("")}</div>`);
      }

      const cardContent = `<div class="mapyCardContent">${popupParts.join("")}</div>`;
      const clickableContent = marker.detailPath
        ? `<a class="mapyCardClickable" href="${escapeHtml(marker.detailPath)}">${cardContent}</a>`
        : cardContent;

      const popupContent = `<div>${clickableContent}</div>`;

      const leafletMarker = L.marker([marker.lat, marker.lng]);
      leafletMarker.bindPopup(popupContent, {
        closeButton: true,
        autoClose: true,
        closeOnClick: true,
      });
      markerLayer.value.addLayer(leafletMarker);
      coordsForBounds.push([marker.lat, marker.lng]);
    });

    const boundsCoords = buildBoundsLatLngs();
    const allCoords = boundsCoords.length ? boundsCoords : coordsForBounds;

    if (cachedView?.bounds) {
      mapInstance.value.fitBounds(cachedView.bounds, { padding: [12, 12] });
    } else if (allCoords.length > 1) {
      mapInstance.value.fitBounds(allCoords, { padding: [24, 24] });
    } else if (allCoords.length === 1) {
      mapInstance.value.setView(allCoords[0], 10);
    }

    await nextTick();
    mapInstance.value.invalidateSize();
  } catch (err) {
    console.error("[CestyMap] render failed", err);
  }
};

const reload = async () => {
  await fetchMarkers();
  // Wait for the map container to be rendered before initializing the map
  await nextTick();
  await renderMap();
};

onMounted(async () => {
  await reload();
});

watch(
  () => hasMarkers.value,
  async (value) => {
    if (value) {
      await nextTick();
      await renderMap();
    }
  }
);

onBeforeUnmount(() => {
  if (mapInstance.value) {
    setCachedViewState(mapInstance.value);
    mapInstance.value.remove();
  }
  mapInstance.value = null;
  markerLayer.value = null;
});
</script>

<style scoped>
.cestyMapCard {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-md);
  padding: 16px;
  margin: 20px auto 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  max-width: 900px;
}

.cestyMapContainer {
  width: 100%;
  height: 520px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
}

.mapStatus {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text-secondary);
}

.mapStatus.error {
  color: var(--danger, #b91c1c);
  flex-direction: column;
  align-items: flex-start;
}

.mapyCardBody {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 120px;
}

.mapyCardContent {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 120px;
  padding: 8px;
  box-sizing: border-box;
}

.mapyCardClickable {
  display: block;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.mapyCardClickable:hover {
  text-decoration: none;
}

.mapyCardImage {
  width: 100%;
  height: 55px;
  object-fit: cover;
  border-radius: var(--border-radius-sm);
}

.mapyCardMeta {
  color: var(--text-secondary);
  font-size: 12px;
}

:deep(.leaflet-popup-content) {
  margin: 12px 12px 8px;
  width: 125px;
}

:deep(.leaflet-popup-content-wrapper) {
  padding: 8px 0;
}

@media (max-width: 600px) {
  .cestyMapCard {
    width: 80%;
    margin: 16px auto 24px;
  }

  .cestyMapContainer {
    height: 360px;
  }
}
</style>

