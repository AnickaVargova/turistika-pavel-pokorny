# Cesty map endpoint (marker payload)

Endpoint: `/api/cesty/map`

Purpose: supply coordinates for all Cesty routes so the frontend can render a unified map with popups linking to each article.

## Response shape

An array of markers:

```json
[
  {
    "id": "string|number",               // unique marker id
    "title": "text shown in popup header",
    "detailPath": "/cesty/:podkategorie/:id", // link to article detail
    "lat": 49.12345,                     // WGS84 latitude
    "lng": 15.12345,                     // WGS84 longitude
    "snippet": "optional short text",
    "category": "optional category/podkategorie",
    "year": 2024,                        // optional year for filtering
    "bounds": [[southLat, westLng], [northLat, eastLng]] // optional fit-to-view override
  }
]
```

Notes:
- `lat`/`lng` are required for rendering a marker.
- `detailPath` should be a frontend-relative URL pointing to the Cesty detail route.
- `bounds` is optional; if provided for a marker, the frontend uses it to fit the route; otherwise it computes bounds from all markers.
- The endpoint should set appropriate CORS and caching headers.

## Optional ingestion from mapy.com folder

- Export GPX/GeoJSON from the mapy.com folder of routes.
- Reduce each route to a representative coordinate (start point or centroid) and emit it in the marker payload above.
- Expose the aggregated marker array through `/api/cesty/map`.
- A helper script is available: `node scripts/ingest-mapy-folder.js ./path/to/folder public/cesty-map.ingested.json`.

