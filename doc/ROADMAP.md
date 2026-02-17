# 🎯 Checklist & Roadmap

## ✅ Phase 1 - CRITIQUE (Branche: develop) - COMPLÉTÉE

- [x] Masquer données sensibles (email/tel) dans schema.org
- [x] Améliorer gestion des cookies (encoding, try/catch)
- [x] Vérifier gtag avant appel Google Analytics
- [x] Ajouter gestion d'erreurs robuste (JS modules)
- [x] Navigation clavier pour carousels (Arrow keys)
- [x] Scroll smooth sur les ancres
- [x] Menu mobile ferme au scroll/Escape
- [x] JSDoc documentation sur tous les fichiers JS
- [x] Validation DOM robuste dans tous les modules
- [x] Tests manuels (clavier, mobile, sans JS)

**Status**: ✅ PRÊT POUR MERGE → main  
**Commit**: `e8338b0`

---

## ⏳ Phase 2 - IMPORTANT (À planifier après Phase 1)

### A. Refactoring & Architecture
- [ ] Créer `js/carousel-config.js` (découpler sélecteurs CSS)
- [ ] Créer `css/_carousels.scss` ou `_carousels.css` (consolider CSS)
- [ ] Créer `css/_base.css` et `css/_components.css` (organiser CSS)
- [ ] Refactoriser banner.js pour réutilisabilité

**Effort**: ~4h  
**Bénéfice**: Code maintenable, pas de duplication

### B. Performance - Images
- [ ] Ajouter lazy-loading sur `.logo-item` et logos
- [ ] Ajouter `srcset` pour images responsive
- [ ] Créer WebP versions avec PNG fallback
- [ ] Optimiser taille des images (compression)

**Effort**: ~3h  
**Bénéfice**: Temps de chargement -30%, mobile optimisé

### C. Accessibilité - Carousels
- [ ] Ajouter `role="region"` et `aria-label` sur carousels
- [ ] Ajouter `aria-live="polite"` pour slide announcements
- [ ] Tester avec screen reader (NVDA/JAWS)
- [ ] Vérifier contraste texte/fond sur dots

**Effort**: ~2h  
**Bénéfice**: WCAG AAA compliant, SEO+, usabilité

### D. SEO & Metadata
- [ ] Ajouter `structured-data` pour testimonials (Review schema)
- [ ] Ajouter `canonical` tags (déjà bon mais vérifier)
- [ ] Optimiser Open Graph images (larger, better format)
- [ ] Ajouter breadcrumbs JSON-LD

**Effort**: ~1h  
**Bénéfice**: SEO ranking +10%, rich snippets

### E. Testing
- [ ] Créer test suite pour `createCarousel()`
- [ ] Créer test suite pour `cookieUtils`
- [ ] Tester compatibilité navigateurs (IE11 si pertinent)
- [ ] Tests manuels cross-browser (mobile, tablet, desktop)

**Effort**: ~5h  
**Bénéfice**: Confiance, régression détectée, documentation

**Total Phase 2**: ~15h  
**Priorité**: HIGH (surtout Images + Accessibilité)

---

## 🚀 Phase 3 - OPTIONNEL (Nice-to-have)

### A. Tooling & Build
- [ ] Setup Vite (bundler, dev server, minification)
- [ ] Ajouter TypeScript (type safety)
- [ ] Ajouter Prettier (code formatting)
- [ ] Ajouter ESLint (code quality)
- [ ] Setup GitHub Actions CI/CD

**Effort**: ~6h  
**Bénéfice**: DX amélioré, qualité code, automation

### B. Dark Mode
- [ ] Ajouter CSS vars pour dark mode
- [ ] Implémenter `@media (prefers-color-scheme: dark)`
- [ ] Ajouter toggle UI (optionnel)
- [ ] Tester contraste en dark mode

**Effort**: ~2h  
**Bénéfice**: UX moderne, A11y+, engagement

### C. Contact Form
- [ ] Créer formulaire frontend (validation JS)
- [ ] Setup backend API (Node.js / PHP)
- [ ] Intégrer validation back-end
- [ ] Ajouter ReCAPTCHA v3
- [ ] Email notifications

**Effort**: ~8h  
**Bénéfice**: Lead generation, engagement

### D. Analytics & Monitoring
- [ ] Setup Sentry (error tracking)
- [ ] Setup Segment (event tracking)
- [ ] Créer dashboard Google Analytics
- [ ] Setup uptime monitoring

**Effort**: ~3h  
**Bénéfice**: Visibilité, alertes, data

### E. Documentation
- [ ] Créer README pour contributors
- [ ] Créer ARCHITECTURE.md
- [ ] Créer DEPLOYMENT.md (GitHub Pages setup)
- [ ] Créer CONTRIBUTING.md (guidelines)

**Effort**: ~2h  
**Bénéfice**: Collaboration, onboarding

**Total Phase 3**: ~21h  
**Priorité**: LOW (nice-to-have, pas bloquant)

---

## 📅 Timeline suggérée

### Semaine 1
- [x] Phase 1 (critique) - FAIT
- [ ] Review & test Phase 1
- [ ] Merge develop → main
- [ ] Deploy to production

### Semaine 2-3
- [ ] Lancer Phase 2A (refactoring)
- [ ] Lancer Phase 2B (images)
- [ ] Tests & validation

### Semaine 4
- [ ] Phase 2C (accessibility) & 2E (testing)
- [ ] Merge Phase 2 → main
- [ ] Deploy v2.0

### Semaine 5+
- [ ] Phase 3 as-needed (priorité métier)

---

## 🔥 Quick Wins (Rapide, High Impact)

Si on a juste 2-3h, faire ces trucs:

1. **Lazy loading images** (30 min)
   ```html
   <img loading="lazy" src="..." />
   ```
   **Impact**: Performance, mobile UX

2. **Ajouter srcset** (30 min)
   ```html
   <img srcset="small.png 320w, medium.png 640w" />
   ```
   **Impact**: Responsive images

3. **Dark mode CSS** (1h)
   ```css
   @media (prefers-color-scheme: dark) { ... }
   ```
   **Impact**: Modern look, A11y

4. **ARIA labels sur carousels** (30 min)
   ```html
   <div role="region" aria-label="Client references">
   ```
   **Impact**: Accessibility, SEO

5. **Setup Prettier** (30 min)
   ```bash
   npm install --save-dev prettier
   npm run format
   ```
   **Impact**: Code quality, consistency

---

## 🛠️ Commands utiles

```bash
# Voir les changements de la branche develop
git diff main develop

# Merger develop dans main (APRÈS tests)
git checkout main
git merge develop --no-ff -m "Merge: Phase 1 critical improvements"

# Créer branche Phase 2
git checkout -b feature/phase-2-refactor develop

# Voir logs de la branche
git log develop --oneline -10

# Stash changes temporairement
git stash

# Voir statut
git status

# Voir branches
git branch -a
```

---

## ✨ Conclusion

**Phase 1** = Foundation solide ✅  
**Phase 2** = Production ready 🚀  
**Phase 3** = Premium experience 💎

Bon courage! 🎉
