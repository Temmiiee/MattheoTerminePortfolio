# Audit RGAA 4.1.2 du site de Matthéo Termine

Audit du 18 novembre 2026 sur le build local servi par l’émulateur Cloudflare Pages et sur le site publié pour les essais d’envoi. La grille couvre les 106 critères de la [méthode RGAA 4.1.2](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/). Résultat : **100 % de conformité**, soit 51 critères respectés sur 51 applicables et 55 critères sans objet.

## Périmètre et méthode

- Pages éditoriales examinées : accueil, guide pré-audit et audit, plan du site, accessibilité, mentions légales et confidentialité. La réponse 404 a aussi été examinée comme page technique hors navigation éditoriale.
- Parcours examinés : navigation avec les liens et le plan, lien d’évitement, ouverture et fermeture des tickets et de la FAQ, formulaire de devis avec saisie vide ou invalide, échec et succès simulés.
- Outils : Chromium sous Windows, clavier et pointeur, validation ciblée du HTML, inspection du DOM et du script, axe-core sur les pages et les états du formulaire, rendu sans feuilles de style, texte agrandi à 200 %, fenêtres de 320 px de large et de 256 px de haut, espacement du texte personnalisé.
- Le formulaire a aussi été vérifié sur le site publié. Formspree a accepté une demande fictive depuis l’interface avec JavaScript et la confirmation en ligne s’est affichée. Sans JavaScript, le formulaire natif a abouti à la confirmation de Formspree en français. La réception dans la boîte mail n’a pas été vérifiée.
- Sous Windows 11, NVDA 2026.3.1 avec Firefox 160.0.1 a annoncé le nom et les états réduit et développé des tickets et de la FAQ. Après un envoi à vide, il a restitué le nom du champ obligatoire, son état invalide et l’erreur associée. En simulant les réponses du service, NVDA a annoncé la progression de l’envoi, l’échec comme alerte et le message de succès. Les rôles des zones structurelles ont été vérifiés dans l’arbre d’accessibilité de Chromium.

## Corrections apportées

| Critère | Constat initial | Correction |
| --- | --- | --- |
| 12.1 | Les pages étaient accessibles via les liens de navigation, sans plan HTML ni recherche interne. | Un plan HTML indexe les pages et les sections principales. Son lien figure dans le pied de page. |
| 11.10 | La mention générale des champs obligatoires se trouvait avant le formulaire détaillé. Les champs n’avaient pas chacun une indication visible associée. | Chaque libellé indique « obligatoire ». L’exemple de format e-mail est associé au champ avant la validation. Les messages d’erreur restent associés après validation. |
| 7.5 | L’échec d’envoi et les confirmations partageaient une même zone d’annonce. | Les erreurs utilisent une zone avec `role="alert"`. La progression et le succès utilisent une zone avec `role="status"`. |

## Grille par thème

« Contrôlés » indique les critères vérifiés sur le périmètre local par l’inspection et les tests décrits. « À confirmer » indique un critère dont la conclusion exige un essai supplémentaire. « Non applicables » indique l’absence de l’élément ou de la situation visés sur les pages locales examinées.

| Thème | Contrôlés | À confirmer | Non applicables dans le périmètre local | Éléments de preuve et méthode |
| --- | --- | --- | --- | --- |
| 1. Images | — | — | 1.1 à 1.9 | Aucun élément image dans les pages rendues. La vignette Open Graph et le favicon sont des métadonnées. Le monogramme est du texte décoratif masqué aux aides techniques. |
| 2. Cadres | — | — | 2.1, 2.2 | Aucun cadre incorporé. |
| 3. Couleurs | 3.1, 3.2, 3.3 | — | — | Libellés visibles pour la gravité et les erreurs. Contrastes des textes, des contours des champs, du focus et des indicateurs d’ouverture examinés. |
| 4. Multimédia | — | — | 4.1 à 4.13 | Aucun média temporel, lecteur embarqué ou média non temporel. |
| 5. Tableaux | — | — | 5.1 à 5.8 | Aucun tableau de données ou de présentation dans les pages publiques. |
| 6. Liens | 6.1, 6.2 | — | — | Intitulés visibles, destinations compréhensibles, liens mail et téléphone nommés, lien d’évitement activable. |
| 7. Scripts | 7.1 à 7.5 | — | — | NVDA et Firefox restituent les noms, états et messages du formulaire et des accordéons. Les erreurs déplacent le focus vers le premier champ concerné après l’action d’envoi. Les états de progression et de succès et les alertes sont exposés par leurs rôles respectifs. Le parcours sans JavaScript a fonctionné en production jusqu’à la confirmation du formulaire natif. |
| 8. Éléments obligatoires | 8.1 à 8.6, 8.9 | — | 8.7, 8.8, 8.10 | Type de document HTML, titres de pages distincts, langue française, contrôle de l’imbrication et de l’unicité des identifiants et attributs. Aucun passage en langue étrangère ni changement de sens de lecture. |
| 9. Structuration | 9.1, 9.2, 9.3 | — | 9.4 | Hiérarchie des titres, structure d’en-tête et de contenu, listes ordonnées et listes de description. Les textes entre guillemets décrivent des messages fictifs de l’interface. |
| 10. Présentation | 10.1 à 10.12 | — | 10.13, 10.14 | CSS externe, contenu et ordre préservés sans CSS, grossissement du texte et contrôles de reflow et d’espacement, liens soulignés dans le texte, indicateurs de focus visibles et aucun contenu informatif réservé au survol. |
| 11. Formulaires | 11.1, 11.2, 11.4, 11.9, 11.10, 11.11, 11.13 | — | 11.3, 11.5 à 11.8, 11.12 | Libellés associés et proches des champs, champs obligatoires signalés, format d’e-mail indiqué, erreurs contextualisées, autocomplétion du nom et de l’e-mail. Demander un devis ne valide aucune transaction ni engagement. |
| 12. Navigation | 12.1 à 12.4, 12.6 à 12.9, 12.11 | — | 12.5, 12.10 | Menu et plan HTML, lien du plan au pied de chaque page éditoriale, accès à la zone principale par le premier lien clavier, ordre de tabulation et accordéons sans piège. L’arbre d’accessibilité de chaque page expose les rôles correspondant aux zones présentes, dont l’en-tête, les navigations, le contenu principal et le pied de page. |
| 13. Consultation | 13.2, 13.9, 13.11 | — | 13.1, 13.3 à 13.8, 13.10, 13.12 | Aucun nouvel onglet imposé, verrou d’orientation, raccourci à geste complexe, flash, animation, document bureautique ou action au pointeur déclenchée à l’enfoncement. Le délai réseau n’efface pas la saisie. |
