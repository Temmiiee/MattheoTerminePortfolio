# Architecture CSS - Documentation

## 🏗️ Structure Modulaire

Cette architecture CSS suit les meilleures pratiques de développement moderne avec une approche modulaire et maintenable.

### 📁 Organisation des Fichiers

```
src/styles/
├── tokens.css          # Variables CSS et design tokens
├── base.css            # Styles de base et typographie
├── accessibility.css   # Styles d'accessibilité et focus
├── animations.css      # Keyframes et animations
├── utilities.css       # Classes utilitaires
├── responsive.css      # Media queries et responsive
└── components/
    ├── hero.css        # Section héro
    ├── services.css    # Cartes de services
    ├── pricing.css     # Cartes de tarification
    ├── navigation.css  # Navigation et menus
    └── interactive.css # Éléments interactifs
```

## 🎨 Design Tokens

Les variables CSS sont centralisées dans `tokens.css` :

- **Couleurs** : Mode clair/sombre avec contraste optimisé
- **Espacement** : Système cohérent basé sur `--radius`
- **Couleurs spécialisées** : Cartes de tarification, graphiques

## ♿ Accessibilité

### Fonctionnalités implémentées :
- **Focus visible** : Styles de focus améliorés
- **Skip links** : Navigation au clavier
- **Contraste élevé** : Support du mode haute contraste
- **Mouvement réduit** : Respect des préférences utilisateur

### Media Queries d'accessibilité :
```css
@media (prefers-reduced-motion: reduce) { /* Animations désactivées */ }
@media (prefers-contrast: high) { /* Contraste renforcé */ }
```

## 🎬 Système d'Animation

### Animations disponibles :
- **fade-in-up/down/left/right** : Apparition avec mouvement
- **slideInUp** : Glissement vers le haut
- **fadeInScale** : Apparition avec mise à l'échelle
- **shimmer** : Effet de brillance
- **pulse-glow** : Pulsation lumineuse

### Optimisations :
- **will-change** : Optimisation GPU
- **transform3d** : Accélération matérielle
- **Respect des préférences** : Désactivation automatique si nécessaire

## 📱 Responsive Design

### Breakpoints :
- **Mobile** : < 768px
- **Tablet** : 769px - 1024px
- **Desktop** : > 1024px
- **Large** : > 1440px

### Stratégie :
- **Mobile-first** : Styles de base pour mobile
- **Progressive enhancement** : Améliorations pour écrans plus grands
- **Fluid typography** : Utilisation de `clamp()` et `vw`

## 🚀 Performance

### Optimisations appliquées :
- **CSS modulaire** : Chargement sélectif possible
- **Animations GPU** : Utilisation de `transform` et `opacity`
- **Lazy loading** : Animations déclenchées par intersection
- **Reduced motion** : Respect des préférences utilisateur

### Métriques ciblées :
- **LCP** : < 2.5s (Largest Contentful Paint)
- **FID** : < 100ms (First Input Delay)
- **CLS** : < 0.1 (Cumulative Layout Shift)

## 🔧 Maintenance

### Bonnes pratiques :
1. **Un fichier = Une responsabilité**
2. **Variables CSS** pour les valeurs réutilisées
3. **Classes utilitaires** pour les patterns communs
4. **Documentation** des animations complexes

### Ajout de nouveaux composants :
1. Créer un fichier dans `components/`
2. Importer dans `globals.css`
3. Utiliser les design tokens existants
4. Tester l'accessibilité

## 🧪 Tests

### À vérifier :
- [ ] Contraste des couleurs (WCAG AA)
- [ ] Navigation au clavier
- [ ] Animations avec `prefers-reduced-motion`
- [ ] Responsive sur tous les breakpoints
- [ ] Performance des animations

## 📚 Ressources

- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [CSS Animation Performance](https://web.dev/animations-guide/)
- [Modern CSS Architecture](https://cube.fyi/)