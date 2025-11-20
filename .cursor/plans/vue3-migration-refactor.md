# Vue 3 Migration and Architecture Refactoring Plan

**Overview:** Comprehensive refactoring to migrate from Vue 2 to Vue 3 with Composition API, modernize the codebase architecture, improve code organization, and enhance maintainability.

---

## Current State Analysis

This is a Vue 2 tourism/heritage website with:
- 775-line monolithic `Sablona.vue` component with complex routing logic
- Duplicate data fetching patterns across components
- Route name constants scattered in multiple files
- Mixed concerns (UI, data fetching, routing logic)
- Vue 2 Options API throughout

---

## Phase 1: Dependency Updates and Build Configuration

**Update to Vue 3 ecosystem:**
- Migrate `package.json` dependencies: Vue 2.6 → Vue 3.4+, Vue Router 3 → Vue Router 4
- Update build tools: `@vue/cli-service` → Vite for faster builds
- Add TypeScript support (optional but recommended)
- Update `vue.config.js` → `vite.config.js`

**Key files:** `package.json`, build config files

---

## Phase 2: Core Architecture - Composition API Migration

**Migrate key components to Composition API:**
- `App.vue` - Convert authentication logic to composables
- `Sablona.vue` (775 lines) - Break down into smaller composables:
  - `useRouteConfig.js` - Route name constants and computed properties
  - `useNavigation.js` - Button visibility and navigation logic
  - `useCategoryStyles.js` - Dynamic styling logic
- `Home.vue` - Extract data fetching into `useCategoryStats.js` composable
- `Detail.vue`, `OknoPomnicky.vue`, `OknoClanky.vue` - Use shared `useArticleFetch.js` composable

**Key pattern:** Replace Options API (`data()`, `computed`, `methods`) with Composition API (`ref()`, `computed()`, functions)

---

## Phase 3: State Management and Data Layer

**Create centralized composables:**
- `composables/useApi.js` - Unified API client wrapping `apiCache.js`
- `composables/useArticles.js` - Shared article fetching/filtering logic
- `composables/useRouteHelpers.js` - Consolidate route name constants from all components
- `composables/useScrollPosition.js` - Extract scroll restoration logic

**Benefits:** Eliminate duplicate `filterTestItems()`, `restoreScrollPosition()`, `fetchArticles()` methods across 6+ components

---

## Phase 4: Component Decomposition

**Break down `Sablona.vue` (775 lines → ~200 lines):**
- Extract `NavigationButtons.vue` - Category navigation sidebar
- Extract `PageHeader.vue` - Title and ABC list
- Extract `ActionButtons.vue` - Top-right buttons (Home, Up, Expand)
- Keep `Sablona.vue` as layout orchestrator

**Simplify other large components:**
- `OknoPomnicky.vue` (620 lines) - Extract `ArticleTable.vue` for table rendering
- `Detail.vue` (623 lines) - Extract `ArticleGallery.vue`, `ArticleContent.vue`

---

## Phase 5: Router Migration

**Update to Vue Router 4:**
- Migrate router syntax: `new VueRouter()` → `createRouter()`
- Update route definitions for Vue 3
- Consolidate route name constants into `router/constants.js`
- Update navigation guards if any

**Key file:** `src/router/index.js`

---

## Phase 6: CSS and Styling Improvements

**Modernize styling:**
- Extract repeated CSS variables to centralized theme file
- Convert inline styles to CSS modules where appropriate
- Consolidate duplicate button styles (`.commonButton` appears in 3+ files)
- Optimize responsive breakpoints

---

## Phase 7: Testing and Validation

**Ensure functionality:**
- Test all routes and navigation flows
- Verify API caching still works correctly
- Test authentication flow
- Validate responsive design on mobile/tablet
- Check service worker compatibility with Vue 3

---

## Key Benefits

1. **Performance:** Vue 3's reactivity system is 2-3x faster
2. **Bundle size:** Tree-shaking reduces bundle by ~30%
3. **Maintainability:** Composables eliminate 200+ lines of duplicate code
4. **Developer experience:** Composition API provides better TypeScript support and code reuse
5. **Modern tooling:** Vite provides instant HMR vs 5-10s rebuilds

---

## Risk Mitigation

- Keep Vue 2 version in git branch for rollback
- Migrate incrementally (can run Vue 3 with Options API initially)
- Test thoroughly after each phase
- Service worker may need updates for Vite build output

---

## Implementation Todos

### Phase 1: Setup
- [ ] **update-dependencies** - Update package.json to Vue 3, Vue Router 4, and Vite
- [ ] **setup-vite** - Create vite.config.js and migrate from vue.config.js
- [ ] **migrate-main-entry** - Update main.js to Vue 3 createApp syntax
- [ ] **migrate-router** - Convert router to Vue Router 4 with createRouter

### Phase 2-3: Composables Foundation
- [ ] **create-composables-structure** - Create composables/ directory and base composable files
- [ ] **extract-route-constants** - Consolidate route name constants into router/constants.js
- [ ] **create-api-composable** - Create useApi.js composable wrapping apiCache
- [ ] **create-articles-composable** - Create useArticles.js with shared fetch/filter logic

### Phase 4: Component Migration
- [ ] **migrate-app-vue** - Convert App.vue to Composition API
- [ ] **migrate-home-vue** - Convert Home.vue to Composition API with useCategoryStats
- [ ] **decompose-sablona** - Break Sablona.vue into smaller components and composables
- [ ] **migrate-detail-vue** - Convert Detail.vue to Composition API and extract sub-components
- [ ] **migrate-okno-components** - Convert OknoPomnicky and OknoClanky to Composition API
- [ ] **migrate-remaining-components** - Convert remaining components to Composition API

### Phase 5-7: Polish & Testing
- [ ] **consolidate-styles** - Extract common CSS variables and button styles
- [ ] **test-migration** - Comprehensive testing of all routes and functionality

---

## Notes

This is a high-impact refactoring that will modernize the entire codebase. The migration can be done incrementally - Vue 3 supports the Options API, so components can be migrated one at a time while maintaining functionality.

