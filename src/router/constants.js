/**
 * Route name constants
 * Centralized location for all route names used throughout the application
 */

// Long version routes (expanded view)
export const LONG_VERSION_ROUTES = [
  "PomnickyKategorieLong",
  "SmirciKrizeKategorieLong",
  "StudankyKategorieLong",
  "NovePridaneLong",
];

// Category routes (list view with tabs)
export const CATEGORY_ROUTES = [
  "PomnickyKategorie",
  "SmirciKrizeKategorie",
  "StudankyKategorie",
];

// Main routes (landing pages for each category)
export const MAIN_ROUTES = ["Pomnicky", "SmirciKrize", "Studanky"];

// New item routes (newly added items)
export const NEW_ITEM_ROUTES = ["NovyPomnicek", "NovyKriz", "NovaStudanka"];

// Article routes (vypraveni and cesty articles)
export const ARTICLE_ROUTES = [
  "NovePridane",
  "NovePridaneLong",
  "PomnickyKategorie",
  "SmirciKrizeKategorie",
  "StudankyKategorie",
  "Vypraveni",
  "Cesty",
];

// Detail routes (individual item detail pages)
export const DETAIL_ROUTES = [
  "DetailPomnicku",
  "DetailKrize",
  "DetailStudanky",
  "NovyPomnicek",
  "NovyKriz",
  "NovaStudanka",
];

// Vypraveni (stories) routes
export const VYPRAVENI_ROUTES = ["DetailVypraveni", "NoveVypraveni"];

// Cesty (journeys) routes
export const CESTY_ROUTES = ["DetailCesty", "NovaCesta"];

// Long category routes for OknoPomnicky
export const LONG_CATEGORY_ROUTES = [
  "PomnickyKategorieLong",
  "SmirciKrizeKategorieLong",
  "StudankyKategorieLong",
];

/**
 * Check if a route name is in a specific route group
 * @param {string} routeName - The route name to check
 * @param {string[]} routeGroup - The route group to check against
 * @returns {boolean}
 */
export function isRouteInGroup(routeName, routeGroup) {
  return routeGroup.includes(routeName);
}

/**
 * Get the category from a route name
 * @param {string} routeName - The route name
 * @returns {string|null} - The category name or null
 */
export function getCategoryFromRoute(routeName) {
  if (routeName.includes("Pomnicky") || routeName.includes("Pomnicek")) {
    return "pomnicky";
  }
  if (routeName.includes("Krize") || routeName.includes("Kriz")) {
    return "krize";
  }
  if (routeName.includes("Studanky") || routeName.includes("Studanka")) {
    return "studanky";
  }
  if (routeName.includes("Vypraveni")) {
    return "vypraveni";
  }
  if (routeName.includes("Cesty") || routeName.includes("Cesta")) {
    return "cesty";
  }
  return null;
}

