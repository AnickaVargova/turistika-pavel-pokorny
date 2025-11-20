# Quick Start Guide - Vue 3 Migration

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Vue 3.4.21
- Vue Router 4.3.0
- Vite 6.0.7
- @vitejs/plugin-vue 5.2.1

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:8081**

Vite provides instant hot module replacement (HMR) - changes appear immediately!

### 3. Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

### 4. Preview Production Build

```bash
npm run preview
```

## Key Differences from Vue 2

### Development Experience

**Before (Vue CLI):**
- Slow startup (~10-15 seconds)
- Slow rebuilds (~5-10 seconds)
- `npm run serve`

**After (Vite):**
- Instant startup (~1 second)
- Instant HMR (~100ms)
- `npm run dev`

### Code Changes

**Before (Options API):**
```vue
<script>
export default {
  data() {
    return { count: 0 }
  },
  methods: {
    increment() {
      this.count++
    }
  }
}
</script>
```

**After (Composition API):**
```vue
<script setup>
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}
</script>
```

### Environment Variables

**Before:**
```js
process.env.NODE_ENV === 'production'
```

**After:**
```js
import.meta.env.PROD
```

## New Composables

The migration introduced reusable composables in `src/composables/`:

### useArticles()
```js
import { useArticles } from '@/composables/useArticles'

const { articles, loading, error, fetchArticles } = useArticles()
await fetchArticles('/pomnicky')
```

### useScrollPosition()
```js
import { useScrollPosition } from '@/composables/useScrollPosition'

const { scrollToTop, restoreScrollPosition } = useScrollPosition()
scrollToTop()
```

### useApi()
```js
import { useApi } from '@/composables/useApi'

const { get, loading, error } = useApi()
const data = await get('/endpoint')
```

### useCategoryStats()
```js
import { useCategoryStats } from '@/composables/useCategoryStats'

const { counts, loading, fetchAllCounts } = useCategoryStats()
await fetchAllCounts()
```

## Route Constants

All route names are now centralized in `src/router/constants.js`:

```js
import { LONG_VERSION_ROUTES, DETAIL_ROUTES } from '@/router/constants'

if (DETAIL_ROUTES.includes(routeName)) {
  // Handle detail route
}
```

## Troubleshooting

### Port Already in Use

If port 8081 is busy:
```bash
npm run dev -- --port 8082
```

### Clear Cache

If you see strange errors:
```bash
rm -rf node_modules dist .vite
npm install
npm run dev
```

### Service Worker Issues (Development)

Service workers are automatically unregistered in development mode. If you have issues:
1. Open DevTools
2. Go to Application > Service Workers
3. Click "Unregister"

### Build Errors

If the build fails:
1. Check for TypeScript errors (even though we're using JS)
2. Ensure all imports are correct
3. Run `npm run dev` first to catch errors early

## Common Tasks

### Add a New Component

```vue
<!-- src/components/MyComponent.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('Hello Vue 3!')
</script>
```

### Add a New Route

```js
// src/router/index.js
{
  path: '/my-page',
  name: 'MyPage',
  component: () => import('../views/MyPage.vue')
}
```

### Fetch Data

```vue
<script setup>
import { onMounted } from 'vue'
import { useArticles } from '@/composables/useArticles'

const { articles, loading, fetchArticles } = useArticles()

onMounted(async () => {
  await fetchArticles('/my-endpoint')
})
</script>
```

## Performance Tips

### 1. Use Lazy Loading
Components are already lazy-loaded in the router:
```js
component: () => import('../views/MyView.vue')
```

### 2. API Caching
The `apiCache.js` utility automatically caches GET requests for 5 minutes.

### 3. Image Optimization
Use responsive images with srcset:
```html
<img
  :src="`${apiUrl}/photos/small/${photo}`"
  :srcset="`${apiUrl}/photos/small/${photo} 300w, 
           ${apiUrl}/photos/medium/${photo} 600w`"
  sizes="(max-width: 600px) 100vw, 50vw"
  loading="lazy"
/>
```

## Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run serve        # Alias for dev

# Production
npm run build        # Build for production
npm run build:dev    # Build in development mode
npm run build:prod   # Build in production mode
npm run preview      # Preview production build
npm run start        # Build and serve production

# Debugging
npm run dev -- --debug    # Enable debug mode
npm run dev -- --host     # Expose to network
```

## IDE Setup

### VS Code Extensions (Recommended)

1. **Volar** - Vue 3 language support (replaces Vetur)
2. **ESLint** - Code linting
3. **Prettier** - Code formatting

### Disable Vetur

If you have Vetur installed, disable it for this workspace:
1. Search for "Vetur" in extensions
2. Click "Disable (Workspace)"

## Need Help?

- **Vue 3 Docs**: https://vuejs.org/guide/introduction.html
- **Vite Docs**: https://vitejs.dev/guide/
- **Vue Router 4 Docs**: https://router.vuejs.org/guide/
- **Composition API**: https://vuejs.org/guide/extras/composition-api-faq.html

## Migration Checklist

- [x] Dependencies updated
- [x] Build system migrated to Vite
- [x] Router migrated to Vue Router 4
- [x] All components converted to Composition API
- [x] Composables created for shared logic
- [x] Route constants centralized
- [x] Environment variables updated
- [ ] **Run `npm install`**
- [ ] **Test development server**
- [ ] **Test all routes**
- [ ] **Test production build**

---

**Ready to start!** Run `npm install && npm run dev` and open http://localhost:8081

