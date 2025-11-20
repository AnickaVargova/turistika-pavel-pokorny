# Homepage Redesign - Testing Guide

## 🚀 Quick Start

### 1. Start Development Server

```bash
cd /Users/anna.vargova/.cursor/worktrees/turistika-pavel-pokorny/d1fuv
npm run dev
```

The server should start on `http://localhost:8081`

### 2. Open in Browser

Navigate to: `http://localhost:8081`

---

## ✅ Testing Checklist

### Visual Inspection

#### Hero Section
- [ ] Hero background image loads correctly
- [ ] Hero title is large and bold
- [ ] Hero subtitle is readable
- [ ] CTA button is prominent and clickable
- [ ] Navigation bar is visible at top
- [ ] Carousel indicators appear at bottom
- [ ] Route path animation appears on right side (desktop only)
- [ ] Info cards appear at bottom left (desktop only)

#### Carousel Functionality
- [ ] Carousel auto-advances every 5 seconds
- [ ] Clicking indicator buttons changes slides
- [ ] Slide transitions are smooth
- [ ] Text content changes with each slide
- [ ] CTA button links change with each slide

#### Categories Section
- [ ] 6 category cards are displayed
- [ ] Category counts load from API
- [ ] Loading spinners show while fetching
- [ ] Cards have hover effects
- [ ] Icons are visible and appropriate
- [ ] Cards link to correct pages

#### About Section
- [ ] Section title is visible
- [ ] Text is readable and centered
- [ ] "Více o nás" button is styled correctly
- [ ] Button links to /onas page

#### Footer
- [ ] Footer has 3 columns (desktop)
- [ ] All links are working
- [ ] Email link opens mail client
- [ ] External links open in new tab
- [ ] Toplist counter is visible

### Mobile Testing (< 900px)

#### Navigation
- [ ] Hamburger menu icon appears (top right)
- [ ] Clicking hamburger opens mobile menu
- [ ] Mobile menu slides in from right
- [ ] Menu has overlay with blur
- [ ] Clicking overlay closes menu
- [ ] Close button (X) works
- [ ] All menu links work
- [ ] Category counts show in menu

#### Layout
- [ ] Hero takes full screen
- [ ] Navigation bar is hidden
- [ ] Route path is hidden
- [ ] Info cards are hidden
- [ ] Categories show in single column
- [ ] Footer stacks vertically
- [ ] Text is readable (not too small)

### Responsive Breakpoints

Test at these widths:
- [ ] 375px (iPhone SE)
- [ ] 414px (iPhone Pro Max)
- [ ] 768px (iPad)
- [ ] 1024px (iPad Pro)
- [ ] 1366px (Laptop)
- [ ] 1920px (Desktop)

### Interaction Testing

#### Hero Section
- [ ] Click CTA button → navigates to correct page
- [ ] Click navigation links → navigates correctly
- [ ] Click carousel indicators → changes slides
- [ ] Hover over CTA button → shows hover effect
- [ ] Hover over nav links → shows underline

#### Categories
- [ ] Click category card → navigates to category
- [ ] Hover over card → elevates and shows effects
- [ ] Icon rotates slightly on hover

#### Mobile Menu
- [ ] Click hamburger → opens menu
- [ ] Click overlay → closes menu
- [ ] Click close button → closes menu
- [ ] Click menu link → navigates and closes menu
- [ ] Scroll menu if many items

### Performance Testing

#### Load Time
- [ ] Page loads in < 3 seconds
- [ ] Hero image loads quickly
- [ ] No layout shifts during load
- [ ] Category counts load asynchronously

#### Animations
- [ ] Carousel transitions are smooth (60fps)
- [ ] Route path animation is smooth
- [ ] Pin bounce animation is smooth
- [ ] Hover effects are smooth
- [ ] Mobile menu transitions are smooth

### Browser Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Accessibility Testing

#### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activates buttons/links
- [ ] Focus indicators are visible
- [ ] Tab order is logical

#### Screen Reader
- [ ] Hero section is announced correctly
- [ ] Navigation is labeled properly
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] ARIA labels are present

#### Color Contrast
- [ ] Text on hero background is readable
- [ ] Button text has sufficient contrast
- [ ] Footer text is readable
- [ ] Links are distinguishable

---

## 🐛 Common Issues & Solutions

### Issue: Hero image not loading
**Solution:** Check that `uvodniStrana.jpg` exists in `src/assets/`

### Issue: Carousel not auto-playing
**Solution:** Check browser console for errors, verify `useHeroCarousel` is imported

### Issue: Mobile menu not opening
**Solution:** Verify Font Awesome is loaded (check for hamburger icon)

### Issue: Category counts showing 0
**Solution:** Check API connection, verify CORS proxy is working

### Issue: Route path not visible
**Solution:** Check screen width > 1024px, verify SVG is rendering

### Issue: Animations are choppy
**Solution:** Check GPU acceleration, reduce motion in browser settings

---

## 📸 Screenshots to Capture

For documentation:
1. Desktop hero section (full screen)
2. Desktop categories section
3. Mobile hero with hamburger menu
4. Mobile menu open
5. Tablet layout
6. Carousel transition
7. Category card hover state
8. Footer on mobile

---

## 🔍 Developer Tools Checks

### Network Tab
- [ ] Hero image loads (200 status)
- [ ] API calls succeed (200 status)
- [ ] No 404 errors
- [ ] No CORS errors
- [ ] Font Awesome loads

### Console Tab
- [ ] No JavaScript errors
- [ ] No Vue warnings
- [ ] No missing import errors
- [ ] API responses logged correctly

### Performance Tab
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3s
- [ ] No long tasks blocking main thread

### Lighthouse Audit
Run Lighthouse and check:
- [ ] Performance score > 90
- [ ] Accessibility score > 90
- [ ] Best Practices score > 90
- [ ] SEO score > 90

---

## ✨ Expected Behavior

### On Page Load
1. Hero background image fades in
2. Hero text slides up
3. Navigation bar appears
4. Carousel starts auto-playing after 5 seconds
5. Category counts load asynchronously

### On Carousel Change
1. Background image fades to next slide
2. Text content slides up with new content
3. CTA button updates to new link
4. Active indicator updates
5. Route path updates (if different)

### On Mobile Menu Open
1. Hamburger icon animates
2. Overlay fades in with blur
3. Menu slides in from right
4. Body scroll is locked
5. Focus moves to menu

### On Category Card Hover
1. Card elevates (translateY)
2. Shadow increases
3. Icon rotates slightly
4. Arrow moves right
5. Top border expands

---

## 📝 Notes for Testers

### What to Look For
- Visual polish and attention to detail
- Smooth transitions and animations
- Responsive behavior at all sizes
- Accessibility features working
- Performance and load times

### What to Report
- Any visual glitches or misalignments
- Broken links or navigation issues
- Performance problems or lag
- Accessibility issues
- Browser-specific bugs

### Priority Levels
- **P0 (Critical):** Blocks basic functionality
- **P1 (High):** Significant UX issue
- **P2 (Medium):** Minor visual issue
- **P3 (Low):** Enhancement or nice-to-have

---

## 🎯 Success Criteria

The redesign is successful if:
- ✅ All interactive elements work correctly
- ✅ Page loads in < 3 seconds
- ✅ Responsive design works on all devices
- ✅ No console errors
- ✅ Lighthouse scores > 90
- ✅ Accessible to keyboard and screen readers
- ✅ Visually matches design intent

---

## 🚀 Ready to Test!

Start the dev server and begin testing. Report any issues with:
- Screenshot or video
- Browser and device info
- Steps to reproduce
- Expected vs actual behavior

Happy testing! 🎉

