# Matthéo Termine · Pré-audit d’accessibilité RGAA

Site vitrine statique en français. Le HTML est disponible dès le chargement. Vite compile les feuilles de style et le script du formulaire.

## Développement

Prérequis : Node.js 22.12 ou version ultérieure.

```sh
npm ci
npm run dev
npm run build
```

Le dossier `out/` est généré à chaque compilation. `npm run preview` permet de vérifier le rendu du build. Pour vérifier aussi les routes sans extension, les redirections et les en-têtes de Cloudflare Pages, servir `out/` avec `wrangler pages dev out`.

## Production

Dans le projet Cloudflare Pages associé à `mattheo-termine.fr`, utiliser `npm run build` comme commande de compilation et `out` comme dossier de sortie. Si la racine Git contient le dossier `MattheoTermine`, sélectionner celui-ci comme répertoire racine dans Cloudflare Pages.

Les fichiers `public/_headers` et `public/_redirects` sont copiés dans le build. Les URLs publiques des pages HTML s’écrivent sans extension. Le sitemap et les URLs canoniques utilisent le domaine de production.

Après publication, vérifier les réponses HTTPS, les en-têtes, la redirection de `/exemples`, la page 404 et la réception d’une demande de test via Formspree.

L’offre utilise des devis sur périmètre. Les tickets affichés sont des exemples fictifs. Les tests automatiques d’accessibilité complètent les vérifications manuelles au clavier et avec des technologies d’assistance.
