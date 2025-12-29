/**
 * Aggregate GeoJSON files from a local mapy.com export folder into a marker list.
 *
 * Usage:
 *   node scripts/ingest-mapy-folder.js ./path/to/mapy-folder public/cesty-map.ingested.json
 *
 * Notes:
 * - Expects GeoJSON files; GPX is ignored unless converted beforehand.
 * - Picks the first coordinate found in the geometry as the marker position.
 * - Writes an array of markers compatible with /api/cesty/map payload.
 */

import fs from "fs";
import path from "path";

const [, , folderArg, outputArg] = process.argv;
const folder = folderArg || "./mapy-folder";
const output = outputArg || "public/cesty-map.ingested.json";

const isGeoJsonFile = (file) => file.toLowerCase().endsWith(".geojson") || file.toLowerCase().endsWith(".json");

const safeReadJson = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return JSON.parse(content);
  } catch (err) {
    console.warn(`Skipping ${filePath}: ${err.message}`);
    return null;
  }
};

const extractFirstCoord = (geometry) => {
  if (!geometry) return null;
  const { type, coordinates } = geometry;
  if (!coordinates) return null;

  const coordFromArray = (arr) => Array.isArray(arr) && arr.length >= 2
    ? { lng: Number(arr[0]), lat: Number(arr[1]) }
    : null;

  if (type === "Point") return coordFromArray(coordinates);
  if (type === "LineString") return coordFromArray(coordinates[0]);
  if (type === "Polygon") return coordFromArray(coordinates[0]?.[0]);
  if (type === "MultiLineString") return coordFromArray(coordinates[0]?.[0]);
  if (type === "MultiPolygon") return coordFromArray(coordinates[0]?.[0]?.[0]);

  return null;
};

const toMarker = (feature, fileName) => {
  const coords = extractFirstCoord(feature.geometry);
  if (!coords) return null;

  return {
    id: feature.id || fileName,
    title: feature.properties?.name || "Cesta",
    detailPath: feature.properties?.detailPath || "",
    lat: coords.lat,
    lng: coords.lng,
    snippet: feature.properties?.description || "",
    year: feature.properties?.year,
  };
};

const main = () => {
  if (!fs.existsSync(folder)) {
    console.error(`Folder not found: ${folder}`);
    process.exit(1);
  }

  const files = fs.readdirSync(folder).filter(isGeoJsonFile);
  const markers = [];

  files.forEach((file) => {
    const fullPath = path.join(folder, file);
    const json = safeReadJson(fullPath);
    if (!json) return;

    if (json.type === "FeatureCollection" && Array.isArray(json.features)) {
      json.features.forEach((feature, idx) => {
        const marker = toMarker(feature, `${file}-${idx}`);
        if (marker) markers.push(marker);
      });
    } else if (json.type === "Feature") {
      const marker = toMarker(json, file);
      if (marker) markers.push(marker);
    }
  });

  fs.writeFileSync(output, JSON.stringify(markers, null, 2));
  console.log(`Wrote ${markers.length} markers to ${output}`);
};

main();



