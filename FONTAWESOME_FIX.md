# Font Awesome Fix

## Issue
Font Awesome Kit was returning 403 Forbidden error:
```
GET https://kit.fontawesome.com/c0e1f3e4e0.js net::ERR_ABORTED 403 (Forbidden)
```

## Root Cause
The Font Awesome Kit ID `c0e1f3e4e0` was either:
- No longer active/valid
- Restricted to specific domains
- Associated account expired

## Solution
Replaced Font Awesome Kit with the free CDN version from cdnjs.

### Changes Made

**File: `index.html`**

**Before:**
```html
<script
  src="https://kit.fontawesome.com/c0e1f3e4e0.js"
  crossorigin="anonymous"
></script>
```

**After:**
```html
<!-- Font Awesome Free CDN -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>
```

## Icons Used in Project
Only 2 Font Awesome icons are used:
1. `fa-solid fa-book-open` - Book icon in Pomnicky.vue
2. `fa fa-bars` - Hamburger menu icon in Home.vue

Both icons are included in the free Font Awesome CDN.

## Benefits
- ✅ No 403 errors
- ✅ Free and publicly accessible
- ✅ Includes all icons needed
- ✅ Uses CSS instead of JavaScript (better performance)
- ✅ Includes integrity hash for security
- ✅ No account/kit management required

## Alternative Solutions (Not Implemented)

### Option 2: npm Package
```bash
npm install @fortawesome/fontawesome-free
```
Then import in main.js:
```js
import '@fortawesome/fontawesome-free/css/all.css'
```

### Option 3: Vue Font Awesome Component
```bash
npm install @fortawesome/vue-fontawesome @fortawesome/fontawesome-svg-core
npm install @fortawesome/free-solid-svg-icons
```

The CDN approach was chosen for simplicity and minimal changes.

