# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static portfolio website for Abdessamad Benali (Webben Digital), a PHP/Symfony senior consultant. The site is built with vanilla HTML/CSS/JavaScript with zero external framework dependencies. It's deployed on GitHub Pages at https://webbendigital.fr/.

## Development Commands

```bash
# Run all linters
npm run lint

# Run individual linters
npm run lint:html    # HTMLHint for HTML validation
npm run lint:css     # Stylelint for CSS validation
npm run lint:js      # ESLint for JavaScript validation
```

## Architecture

### File Structure
- `index.html` - Main landing page (single-page application style with anchor navigation)
- `confidential-policies.html` - Privacy policy page
- `css/styles.css` - All styles (CSS custom properties for theming)
- `js/main.js` - Navigation, smooth scrolling, footer year
- `js/carousel.js` - Reusable carousel component for logos and testimonials
- `js/banner.js` - Cookie consent banner with Google Analytics integration
- `logos/` - Client logo images
- `doc/` - Comprehensive project documentation (in French)

### Key Components

**Carousel System** (`js/carousel.js`):
- Reusable `createCarousel()` function that instantiates carousel components
- Two instances: logos carousel (3 visible items) and testimonials carousel (1 visible item)
- Supports keyboard navigation (arrow keys), pagination dots, and prev/next buttons
- Returns a destroy method for cleanup

**Cookie Consent** (`js/banner.js`):
- GDPR-compliant cookie banner for Google Analytics
- Default consent: all denied until user accepts
- Stores consent in `wb_ga_consent` cookie (180 days)
- Only enables `analytics_storage` on accept; ad storage always denied

**Navigation** (`js/main.js`):
- Mobile hamburger menu with keyboard support (Escape to close)
- Smooth scrolling for anchor links
- Auto-closes menu on scroll or link click

### CSS Architecture
- CSS custom properties (`--color-*`, `--spacing-*`, etc.) for theming
- Mobile-first responsive design with breakpoints at 640px and 768px
- Gradient backgrounds and soft shadows for visual depth
- Accent color: `#00a5b8` (teal/cyan)

## Git Workflow

- `main` - Production branch (deployed to GitHub Pages)
- `develop` - Feature development branch
- Current status: Phase 1 improvements completed on `develop`, ready to merge to `main`

## Important Notes

- The site is entirely in French - maintain language consistency
- Sensitive data (email, phone) in structured data is marked as `***PROTECTED***`
- Google Analytics tracking ID: `G-93D0N6B8JM`
- No build step required - static files are served directly
- All JavaScript uses vanilla ES6+ with no external dependencies

## Documentation

The `doc/` folder contains extensive project documentation in French:
- `START_HERE.md` - Quick start guide
- `EXECUTIVE_SUMMARY.md` - Summary of recent changes
- `ROADMAP.md` - Planned phases 2 and 3
- `RAPPORT_FINAL.md` - Final checklist and statistics