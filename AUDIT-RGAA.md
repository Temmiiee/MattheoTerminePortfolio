# Revue RGAA 4.1.2 du site de Matthéo Termine

Revue du 18 novembre 2026 sur le build local servi par l’émulateur Cloudflare Pages. La grille couvre les 106 critères de la [méthode RGAA 4.1.2](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/). Aucun taux de conformité n’est établi à ce stade.

## Périmètre et méthode

- Pages éditoriales examinées : accueil, guide pré-audit et audit, plan du site, accessibilité, mentions légales et confidentialité. La réponse 404 a aussi été examinée comme page technique hors navigation éditoriale.
- Parcours examinés : navigation avec les liens et le plan, lien d’évitement, ouverture et fermeture des tickets et de la FAQ, formulaire de devis avec saisie vide ou invalide, échec et succès simulés.
- Outils : Chromium sous Windows, clavier et pointeur, validation ciblée du HTML, inspection du DOM et du script, axe-core sur les pages et les états du formulaire, rendu sans feuilles de style, texte agrandi à 200 %, fenêtres de 320 px de large et de 256 px de haut, espacement du texte personnalisé.
- Le formulaire a aussi été vérifié sur le site publié. Formspree a accepté une demande fictive depuis l’interface avec JavaScript et la confirmation en ligne s’est affichée. Sans JavaScript, le formulaire natif a abouti à la confirmation de Formspree en français. La réception dans la boîte mail n’a pas été vérifiée.
- La vérification de la restitution vocale avec NVDA reste distincte des contrôles du balisage et des tests d’envoi.

## Corrections apportées

| Critère | Constat initial | Correction |
| --- | --- | --- |
| 12.1 | Les pages étaient accessibles via les liens de navigation, sans plan HTML ni recherche interne. | Un plan HTML indexe les pages et les sections principales. Son lien figure dans le pied de page. |
| 11.10 | La mention générale des champs obligatoires se trouvait avant le formulaire détaillé. Les champs n’avaient pas chacun une indication visible associée. | Chaque libellé indique « obligatoire ». L’exemple de format e-mail est associé au champ avant la validation. Les messages d’erreur restent associés après validation. |

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
| 7. Scripts | 7.2, 7.3, 7.4 | 7.1, 7.5 | — | Les tickets et la FAQ s’actionnent au clavier et au pointeur. Les erreurs déplacent le focus vers le premier champ concerné après l’action d’envoi. Les états, rôles et associations ont été inspectés dans le DOM. Le parcours sans JavaScript a fonctionné en production jusqu’à la confirmation du formulaire natif. |
| 8. Éléments obligatoires | 8.1 à 8.6, 8.9 | — | 8.7, 8.8, 8.10 | Type de document HTML, titres de pages distincts, langue française, contrôle de l’imbrication et de l’unicité des identifiants et attributs. Aucun passage en langue étrangère ni changement de sens de lecture. |
| 9. Structuration | 9.1, 9.2, 9.3 | — | 9.4 | Hiérarchie des titres, structure d’en-tête et de contenu, listes ordonnées et listes de description. Les textes entre guillemets décrivent des messages fictifs de l’interface. |
| 10. Présentation | 10.1 à 10.12 | — | 10.13, 10.14 | CSS externe, contenu et ordre préservés sans CSS, grossissement du texte et contrôles de reflow et d’espacement, liens soulignés dans le texte, indicateurs de focus visibles et aucun contenu informatif réservé au survol. |
| 11. Formulaires | 11.1, 11.2, 11.4, 11.9, 11.10, 11.11, 11.13 | — | 11.3, 11.5 à 11.8, 11.12 | Libellés associés et proches des champs, champs obligatoires signalés, format d’e-mail indiqué, erreurs contextualisées, autocomplétion du nom et de l’e-mail. Demander un devis ne valide aucune transaction ni engagement. |
| 12. Navigation | 12.1 à 12.4, 12.7 à 12.9, 12.11 | 12.6 | 12.5, 12.10 | Menu et plan HTML, lien du plan au pied de chaque page éditoriale, accès à la zone principale par le premier lien clavier, ordre de tabulation et accordéons sans piège. Les régions HTML sont présentes, leur restitution avec une aide technique reste à vérifier. |
| 13. Consultation | 13.2, 13.9, 13.11 | — | 13.1, 13.3 à 13.8, 13.10, 13.12 | Aucun nouvel onglet imposé, verrou d’orientation, raccourci à geste complexe, flash, animation, document bureautique ou action au pointeur déclenchée à l’enfoncement. Le délai réseau n’efface pas la saisie. |

## Vérifications à terminer

1. Avec une combinaison de l’[environnement de test RGAA](https://accessibilite.numerique.gouv.fr/methode/environnement-de-test/), vérifier les repères sur chaque page, les noms et états ouverts ou fermés des accordéons, la restitution des champs et erreurs, et les annonces d’envoi en cours, d’échec et de succès.
2. Confirmer la réception des deux demandes fictives dans la boîte mail du site.
3. Confirmer les statuts par critère sur l’échantillon publié avant de calculer un taux selon la [méthode d’évaluation du RGAA](https://accessibilite.numerique.gouv.fr/obligations/evaluation-conformite/).
