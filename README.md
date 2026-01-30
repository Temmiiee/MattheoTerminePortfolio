# Portfolio — Matthéo Termine ✅

Site statique et accessible construit pour présenter les réalisations et l'expertise RGAA.

## Développement local 🔧

- Installer les dépendances :

  npm install

- Installer les hooks git (Husky) :

  npm run prepare

- Lancer un serveur local :

  npm start

- Commandes utiles :
  - `npm run lint:html` — validation HTML
  - `npm run lint:css` — validation CSS
  - `npm run test:a11y` — tests d'accessibilité (pa11y-ci)
  - `npm run lhci` — run Lighthouse CI (upload to temporary storage)
  - `npm run format` — formater avec Prettier

## CI / CD 🚀

- GitHub Actions exécute la validation HTML/CSS, les tests d'accessibilité et Lighthouse sur chaque PR.
- Un workflow dédié **Lighthouse CI** (`.github/workflows/lighthouse.yml`) exécute des audits Lighthouse sur `push` (configurable via `budget.json`).
- Le site est déployé automatiquement sur GitHub Pages lors d'un push sur `main` (workflow `deploy.yml`).

> Remarque : mettez à jour les URLs (`example.com`) dans `index.html`, `sitemap.xml` et les métadonnées OG avant publication, et configurez `CODEOWNERS` pour la protection des branches.

## Bonnes pratiques incluses ✅

- Pré-commit & lint-staged (config incluse dans `package.json`)
- Configuration Prettier, Stylelint, HTML-validate
- Tests automatiques d'accessibilité (pa11y + Lighthouse CI)
- Templates GitHub pour issues / PRs, fichier CONTRIBUTING

## Aide & Contribuer 🤝

Voir `CONTRIBUTING.md` et `CODE_OF_CONDUCT.md`. Merci pour vos contributions !
