import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mattheo-termine.fr'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/politique-confidentialite`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    // Note: Les sections #services, #projets, #tarifs, #contact sont des ancres
    // de la page d'accueil, pas des pages séparées. Elles ne doivent pas être
    // dans le sitemap pour éviter les erreurs "Page avec redirection" et
    // "Autre page avec balise canonique correcte"
  ]
}
