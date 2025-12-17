import React from "react";
import { config } from "@/lib/config";

export function StructuredData() {
  // LocalBusiness structured data for local SEO
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://mattheo-termine.fr/#localbusiness",
    name: config.company.name,
    description: "Intégrateur web freelance expert en sites accessibles RGAA et optimisés SEO. Création de sites modernes, applications web et WordPress sur mesure.",
    url: "https://mattheo-termine.fr",
    telephone: "+33-6-XX-XX-XX-XX", // Replace with actual phone number
    email: config.company.email,
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
      addressLocality: "France",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "48.8566", // Paris coordinates as placeholder
      longitude: "2.3522",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    priceRange: "€€",
    image: "https://mattheo-termine.fr/images/mattheo-termine-photo.webp",
    logo: "https://mattheo-termine.fr/favicon.svg",
    sameAs: [
      config.social.linkedin,
      config.social.github,
      config.social.malt,
    ],
    founder: {
      "@type": "Person",
      name: config.company.name,
      jobTitle: config.company.title,
      url: "https://mattheo-termine.fr",
      sameAs: [
        config.social.linkedin,
        config.social.github,
        config.social.malt,
      ],
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services de développement web",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Développement Web Sur-Mesure",
            description: "Applications web modernes avec Next.js, React et TypeScript",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Solutions WordPress",
            description: "Thèmes personnalisés et plugins sur-mesure",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Accessibilité RGAA",
            description: "Conformité RGAA 4.1 et WCAG 2.1 AA garantie",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Performance & SEO",
            description: "Optimisation Core Web Vitals et stratégies SEO avancées",
          },
        },
      ],
    },
  };

  // Person structured data
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://mattheo-termine.fr/#person",
    name: config.company.name,
    jobTitle: config.company.title,
    url: "https://mattheo-termine.fr",
    email: config.company.email,
    image: "https://mattheo-termine.fr/images/mattheo-termine-photo.webp",
    sameAs: [
      config.social.linkedin,
      config.social.github,
      config.social.malt,
    ],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "WordPress",
      "Accessibility",
      "RGAA",
      "WCAG",
      "SEO",
      "Performance Optimization",
    ],
  };

  // Website structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mattheo-termine.fr/#website",
    url: "https://mattheo-termine.fr",
    name: "Matthéo Termine - Intégrateur Web Freelance",
    description: "Portfolio professionnel de Matthéo Termine, intégrateur web freelance spécialisé en accessibilité RGAA et optimisation SEO",
    publisher: {
      "@id": "https://mattheo-termine.fr/#person",
    },
    inLanguage: "fr-FR",
  };

  // Combine all structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [localBusinessData, personData, websiteData],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default StructuredData;
