# Vite Migration Fixes

## Issue: `require is not defined` Error

### Problem
After migrating from Vue CLI to Vite, the application was throwing errors:
```
ReferenceError: require is not defined
```

This occurred because Vite uses ES modules and doesn't support CommonJS `require()` syntax.

### Root Cause
Three files were using `require()` to dynamically import images from the assets folder:
1. `src/components/Sablona.vue` - Line 5
2. `src/views/Onas.vue` - Line 32
3. `src/views/Fotodetail.vue` - Line 84

### Solution
Replaced `require()` with Vite's dynamic import syntax using `new URL()`:

**Before (Vue CLI / Webpack):**
```javascript
:src="require(`./../assets/${imageName}`)"
```

**After (Vite):**
```javascript
:src="getImageUrl(imageName)"

// In script:
const getImageUrl = (imageName) => {
  return new URL(`../assets/${imageName}`, import.meta.url).href;
};
```

### Files Fixed

#### 1. `src/components/Sablona.vue`
- **Line 5**: Changed template to use `getImageUrl()` function
- **Line 240**: Added `getImageUrl()` helper function

#### 2. `src/views/Onas.vue`
- **Line 32**: Changed template to use `getImageUrl()` function
- **Line 78**: Added `getImageUrl()` helper function
- **Bonus**: Converted from Options API to Composition API

#### 3. `src/views/Fotodetail.vue`
- **Line 84**: Changed computed property to use `new URL()` directly

### How Vite Handles Assets

Vite uses different strategies for asset handling:

1. **Static Assets**: Use `new URL(path, import.meta.url).href`
2. **Public Folder**: Reference directly as `/filename.ext`
3. **API URLs**: Continue using string concatenation

### Verification

Run this command to verify no `require()` calls remain:
```bash
grep -r "require(" src/
# Should return: No matches found
```

### Testing

After these fixes:
- ✅ All pages load without errors
- ✅ Background images display correctly
- ✅ Photo galleries work
- ✅ Dynamic image loading functions properly

### Additional Benefits

While fixing these issues, we also:
- Converted `Onas.vue` to Composition API
- Improved code consistency across the codebase
- Updated security vulnerabilities (Vite 5.1.6 → 6.0.7)

### References

- [Vite Static Asset Handling](https://vitejs.dev/guide/assets.html)
- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)

---

## Issue 2: `data.filter is not a function`

### Problem
When clicking on individual items, the application threw errors:
```
TypeError: data.filter is not a function
at filterTestItems (useArticles.js:22:17)
```

### Root Cause
The `fetchArticles` composable in `useArticles.js` was trying to call `.filter()` on data that could be either:
1. An array (for list views like category pages)
2. A single object (for detail views like individual items)

When the API returns a single item, it's an object, not an array, causing `.filter()` to fail.

### Solution
Updated `src/composables/useArticles.js` to:
1. Check if data is an array before filtering
2. Support both `isSingle` and `isSingleItem` parameter names

**Before:**
```javascript
const fetchArticles = async (endpoint, options = {}) => {
  const data = await get(endpoint);
  if (options.isSingle) {
    // handle single item
  } else {
    let filtered = filterTestItems(data); // ❌ Fails if data is not an array
  }
};
```

**After:**
```javascript
const fetchArticles = async (endpoint, options = {}) => {
  const data = await get(endpoint);
  const isSingleItem = options.isSingle || options.isSingleItem; // Support both names
  
  if (isSingleItem) {
    // handle single item
  } else {
    const dataArray = Array.isArray(data) ? data : []; // ✅ Ensure it's an array
    let filtered = filterTestItems(dataArray);
  }
};
```

### Benefits
- ✅ Handles both single objects and arrays gracefully
- ✅ Supports both `isSingle` and `isSingleItem` parameter names for backward compatibility
- ✅ Prevents runtime errors when API returns unexpected data types
- ✅ Works correctly with all three components that use it:
  - `Detail.vue` (uses `isSingleItem: true`)
  - `OknoPomnicky.vue` (uses `isSingleItem` variable)
  - `OknoClanky.vue` (no parameter, defaults to array handling)

### Testing
After this fix:
- ✅ List views (category pages) load correctly
- ✅ Detail views (individual items) load correctly
- ✅ No more `filter is not a function` errors

---

## Issue 3: OknoPomnicky Not Displaying Single Items

### Problem
When clicking on an item in `AbecedniSeznam` (alphabetical list), the detail page would load data correctly but the `OknoPomnicky` component wouldn't display anything.

### Root Cause
The `useArticles` composable stores data in two different places:
- **Single items** → `article.value` (when `isSingleItem: true`)
- **Multiple items** → `articles.value` (when `isSingleItem: false`)

`OknoPomnicky` was only checking `articles` (aliased as `mojeClanky`), so when a single item was loaded into `article`, the component thought there was no data to display.

The `showContent` computed property checked:
```javascript
mojeClanky.value.length  // This was 0 for single items!
```

### Solution
Updated `OknoPomnicky.vue` to:
1. Destructure both `article` and `articles` from `useArticles()`
2. Create a computed property that combines them into a single array

**Before:**
```javascript
const { articles: mojeClanky, loading, error, fetchArticles } = useArticles();

const showContent = computed(() => {
  return (
    !loading.value &&
    mojeClanky.value.length &&  // ❌ Always 0 for single items
    // ...
  );
});
```

**After:**
```javascript
const { articles, article, loading, error, fetchArticles } = useArticles();

// Combine single article and articles array into one array for display
const mojeClanky = computed(() => {
  if (article.value) {
    return [article.value];  // ✅ Wrap single item in array
  }
  return articles.value || [];
});

const showContent = computed(() => {
  return (
    !loading.value &&
    mojeClanky.value.length &&  // ✅ Now works for both cases
    // ...
  );
});
```

### Benefits
- ✅ Detail pages (single items) now display correctly
- ✅ List pages (multiple items) continue to work
- ✅ Consistent interface - `mojeClanky` is always an array
- ✅ No changes needed to template code

### Testing
After this fix:
- ✅ Clicking items in alphabetical list shows detail page
- ✅ Category list views still work
- ✅ Both single and multiple item views render correctly

---

## Issue 4: Detail Component Null Reference Error

### Problem
When clicking on articles in "Vypraveni" or "Cesty", the Detail component would throw an error:
```
TypeError: Cannot read properties of null (reading 'nazev')
at Detail.vue:26:27
```

### Root Cause
The template had a race condition:
```vue
<Loader v-if="loading" />
<div v-else id="detailOkno">
  <h1>{{ detailClanku.nazev }}</h1>  <!-- ❌ detailClanku could be null -->
```

When `loading` becomes `false`, the template tries to render the content, but `detailClanku` (which is `article.value` from `useArticles`) might still be `null` if:
- The API call failed
- The item was filtered out (test item in production)
- The data hasn't been set yet

### Solution
Added a null check to the template condition:

**Before:**
```vue
<Loader v-if="loading" />
<div v-else id="detailOkno">
  <h1>{{ detailClanku.nazev }}</h1>
```

**After:**
```vue
<Loader v-if="loading" />
<div v-else-if="detailClanku" id="detailOkno">
  <h1>{{ detailClanku.nazev }}</h1>
```

### Benefits
- ✅ No more null reference errors
- ✅ Handles edge cases gracefully (filtered items, API errors)
- ✅ Component only renders when data is actually available
- ✅ Better user experience - shows loader until data is ready

### Testing
After this fix:
- ✅ Clicking on "Vypraveni" articles loads detail page correctly
- ✅ Clicking on "Cesty" articles loads detail page correctly
- ✅ No console errors when navigating to detail pages
- ✅ Handles missing/filtered items gracefully

---

## Issue 5: "Rozbalit vše" (Expand All) Causing 400 Error

### Problem
When clicking the "Rozbalit vše" (Expand All) button, the application would throw an error:
```
GET https://hrobecky.ddns.net/pomnicky/14/undefined 400 (Bad Request)
```

### Root Cause
Two issues were causing this problem:

1. **Incorrect route classification**: The `DETAIL_ROUTES` constant incorrectly included "Long" routes:
   ```javascript
   export const DETAIL_ROUTES = [
     "PomnickyKategorieLong",  // ❌ This is NOT a detail route!
     "SmirciKrizeKategorieLong",  // ❌ No id parameter
     "StudankyKategorieLong",  // ❌ No id parameter
     "NovePridaneLong",  // ❌ No id parameter
     // ...
   ];
   ```
   
   When `fetchData` checked `DETAIL_ROUTES.includes(routeName.value)`, it matched first and tried to build an endpoint with `route.params.id`, which was `undefined` for long routes.

2. **Missing route change watcher**: `OknoPomnicky` only fetched data in `onMounted`, so when the route changed from `/pomnicky/14` to `/pomnicky/14/long`, no refetch occurred.

### Solution

Three changes were needed:

**1. Fixed route constants** (`src/router/constants.js`):
```javascript
// Before
export const DETAIL_ROUTES = [
  "PomnickyKategorieLong",  // ❌ Wrong!
  "DetailPomnicku",
  // ...
];

// After
export const DETAIL_ROUTES = [
  "DetailPomnicku",  // ✅ Only actual detail routes
  "DetailKrize",
  "DetailStudanky",
  "NovyPomnicek",
  "NovyKriz",
  "NovaStudanka",
];
```

**2. Added route watcher** (`src/components/OknoPomnicky.vue`):
```javascript
// Watch for route changes to refetch data
watch(
  () => route.params,
  async () => {
    await fetchData();
  },
  { deep: true }
);
```

**3. Updated visibility conditions** to include long routes:

In `OknoPomnicky.vue`:
```javascript
// Before
const showContent = computed(() => {
  return (
    !loading.value &&
    mojeClanky.value.length &&
    (DETAIL_ROUTES.includes(routeName.value) ||  // ❌ Missing long routes
      routeName.value === "NovePridane" ||
      !props.zalozky)
  );
});

// After
const showContent = computed(() => {
  return (
    !loading.value &&
    mojeClanky.value.length &&
    (DETAIL_ROUTES.includes(routeName.value) ||
      LONG_CATEGORY_ROUTES.includes(routeName.value) ||  // ✅ Added
      routeName.value === "NovePridane" ||
      routeName.value === "NovePridaneLong" ||  // ✅ Added
      !props.zalozky)
  );
});
```

In `Sablona.vue`:
```javascript
// Before
const showOknoPomnicky = computed(() => {
  return DETAIL_ROUTES.includes(routeName.value);  // ❌ Missing long routes
});

// After
const showOknoPomnicky = computed(() => {
  return (
    DETAIL_ROUTES.includes(routeName.value) ||
    LONG_CATEGORY_ROUTES.includes(routeName.value) ||  // ✅ Added
    routeName.value === "NovePridaneLong"  // ✅ Added
  );
});
```

### Route Structure Clarification
- **Detail routes** (single item): `/pomnicky/14/123` → has `id` parameter
- **Long category routes** (all items): `/pomnicky/14/long` → NO `id` parameter
- **Category routes** (tabs view): `/pomnicky/14` → NO `id` parameter

### Benefits
- ✅ "Rozbalit vše" button now works correctly
- ✅ Route changes trigger proper data refetch
- ✅ No more `undefined` in API URLs
- ✅ Correct endpoint construction for each route type
- ✅ Clearer separation between detail and list routes

### Testing
After this fix:
- ✅ Click "Rozbalit vše" to expand all items in a category
- ✅ Click "Zkrácená verze" to collapse back to tab view
- ✅ Navigate between categories while in expanded view
- ✅ All route transitions work smoothly

---

**Status**: ✅ All Vite compatibility issues resolved
**Date**: November 2025
**Impact**: Critical - Application now works correctly with Vite

