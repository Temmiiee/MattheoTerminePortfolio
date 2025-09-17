"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeXml, Gauge, Palette, Accessibility, CheckCircle2, Search, Rocket, PencilRuler, Download, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { StructuredData } from "@/components/StructuredData";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { WordpressIcon } from "@/components/icons/WordpressIcon";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useSequentialAnimation } from "@/hooks/use-sequential-animation";

const services = [
  {
    icon: Palette,
    title: "Création de site vitrine responsive",
    description: "Des sites web modernes et adaptatifs qui s'affichent parfaitement sur tous les appareils.",
  },
  {
    icon: WordpressIcon,
    title: "Création de sites WordPress",
    description: "Développement de thèmes et de sites sur mesure avec le CMS le plus populaire au monde.",
  },
  {
    icon: Gauge,
    title: "Optimisation SEO et performance",
    description: "Amélioration de la vitesse de chargement et du référencement pour une meilleure visibilité.",
  },
  {
    icon: Accessibility,
    title: "Accessibilité numérique (RGAA)",
    description: "Garantir que votre site est utilisable par tous, y compris les personnes en situation de handicap.",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "1. Découverte",
    description: "Nous discutons de vos objectifs, de votre cible et de vos besoins pour définir les contours de votre projet.",
  },
  {
    icon: PencilRuler,
    title: "2. Maquettage & Design",
    description: "Je conçois une maquette visuelle et un design sur-mesure qui reflètent votre identité de marque.",
  },
  {
    icon: CodeXml,
    title: "3. Développement",
    description: "Je transforme le design validé en un site web fonctionnel, performant et accessible.",
  },
  {
    icon: Rocket,
    title: "4. Déploiement",
    description: "Je m'occupe de la mise en ligne de votre site sur votre hébergement et assure son bon fonctionnement.",
  },
];

const pricingPlans = [
  {
    title: "Site Vitrine Classique",
    price: "À partir de 550€",
    description: "Site vitrine avec design basé sur un template personnalisé. Idéal pour présenter vos services et informations simplement, quelle que soit la structure du site.",
    features: [
      "Design moderne et responsive (template personnalisé)",
      "Formulaire de contact fonctionnel",
      "Optimisation SEO de base",
      "Mise en ligne sur votre hébergement",
      "Accompagnement pour la prise en main du site",
    ],
    cta: "Choisir cette offre",
    featured: false,
    link: "/devis?siteType=vitrine&designType=template",
    headerClass: "bg-pricing-basic text-pricing-basic-foreground border-b border-border"
  },
  {
    title: "Site Sur-Mesure / Landing Page",
    price: "À partir de 1150€",
    description: "Site sur-mesure ou landing page avec design unique, adapté à la complexité et aux besoins spécifiques de votre projet (structure, fonctionnalités, animations, etc.).",
    features: [
      "Design 100% sur-mesure",
      "Animations et sections personnalisées",
      "Intégration de contenu (textes, images)",
      "Optimisation SEO avancée",
      "Support prioritaire",
    ],
    cta: "Choisir cette offre",
    featured: true,
    link: "/devis?siteType=vitrine&designType=custom",
    headerClass: "bg-pricing-premium text-pricing-premium-foreground",
  },
  {
    title: "Application Web",
    price: "À partir de 2500€",
    description: "Solution complète pour les projets complexes nécessitant des fonctionnalités sur mesure (SaaS, plateforme...).",
    features: [
      "Espace utilisateur (connexion, etc.)",
      "Fonctionnalités sur-mesure",
      "Base de données",
      "Déploiement sur votre hébergement",
      "Maintenance mensuelle en option",
      "Accompagnement dédié",
    ],
    cta: "Choisir cette offre",
    featured: false,
    link: "/devis?siteType=webapp",
    headerClass: "bg-pricing-pro text-pricing-pro-foreground"
  },
  {
    title: "Solution Sur-Mesure",
    price: "Sur devis",
    description: "Un projet unique ? Discutons-en pour construire la solution parfaitement adaptée à vos ambitions.",
    features: [
      "Analyse approfondie de vos besoins",
      "Développement de fonctionnalités spécifiques",
      "Intégration de services tiers (API, etc.)",
      "Espace d'administration personnalisé",
      "Accompagnement et support dédiés",
    ],
    cta: "Demander un devis",
    featured: false,
    link: "/devis",
    headerClass: "bg-pricing-enterprise text-pricing-enterprise-foreground border-b border-border",
  },
];

// Composant d'animation simplifié et optimisé
const AnimatedSection = ({ children, className, id, ...props }: { 
  children: React.ReactNode, 
  className?: string, 
  id: string, 
  "aria-labelledby"?: string 
}) => {
  const { ref, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.2, 
    rootMargin: '-50px 0px -100px 0px' 
  });

  return (
    <section 
      id={id}
      ref={ref} 
      className={cn(
        className, 
        "transition-all duration-1000 ease-out scroll-mt-20", 
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      {...props}
    >
      {children}
    </section>
  );
};

// Composant d'animation pour les éléments individuels
const AnimatedDiv = ({ 
  children, 
  className, 
  delay = 0, 
  ...props 
}: { 
  children: React.ReactNode, 
  className?: string, 
  delay?: number 
} & React.HTMLAttributes<HTMLDivElement>) => {
  const { ref, isIntersecting } = useIntersectionObserver({ 
    threshold: 0.3, 
    rootMargin: '-30px 0px -100px 0px', 
    triggerOnce: true 
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={cn(
        "transition-all duration-800 ease-out",
        isIntersecting 
          ? "opacity-100 translate-y-0 scale-100" 
          : "opacity-0 translate-y-6 scale-95",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Composant Hero avec animations améliorées
const HeroSection = () => {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [descriptionVisible, setDescriptionVisible] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setTitleVisible(true), 200),
      setTimeout(() => setSubtitleVisible(true), 600),
      setTimeout(() => setDescriptionVisible(true), 1000),
      setTimeout(() => setButtonsVisible(true), 1400),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Titre principal avec animation lettre par lettre */}
        <h1 className={cn(
          "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000",
          titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span className="hero-title-enhanced hero-glow">
            {"Intégrateur web Freelance".split("").map((char, index) => (
              <span
                key={index}
                className={cn(
                  "inline-block transition-all duration-700 ease-out",
                  titleVisible 
                    ? "opacity-100 translate-y-0 rotate-0" 
                    : "opacity-0 translate-y-12 rotate-12"
                )}
                style={{
                  transitionDelay: `${index * 50 + 200}ms`,
                }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </span>
        </h1>

        {/* Sous-titre */}
        <p className={cn(
          "text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto transition-all duration-800",
          subtitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Création de sites web modernes, performants et accessibles pour développer votre présence en ligne
        </p>

        {/* Description */}
        <p className={cn(
          "text-lg text-muted-foreground mb-12 max-w-2xl mx-auto transition-all duration-800",
          descriptionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          Spécialisé dans le développement web sur-mesure, j&apos;accompagne les entreprises et particuliers 
          dans la création de leur identité numérique.
        </p>

        {/* Boutons */}
        <div className={cn(
          "flex flex-col sm:flex-row gap-4 justify-center transition-all duration-800",
          buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}>
          <Button asChild size="lg" className="hero-button-enhanced">
            <Link href="/devis">
              Demander un devis gratuit
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="#services">
              Découvrir mes services
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { ref: servicesRef, visibleItems: visibleServices } = useSequentialAnimation({
    itemCount: services.length,
    delay: 200,
    stagger: 150,
    threshold: 0.2,
  });

  const { ref: processRef, visibleItems: visibleProcess } = useSequentialAnimation({
    itemCount: processSteps.length,
    delay: 200,
    stagger: 200,
    threshold: 0.2,
  });

  const { ref: pricingRef, visibleItems: visiblePricing } = useSequentialAnimation({
    itemCount: pricingPlans.length,
    delay: 200,
    stagger: 150,
    threshold: 0.2,
  });

  return (
    <>
      <StructuredData />
      
      {/* Hero Section */}
      <HeroSection />

      {/* Services Section */}
      <AnimatedSection id="services" className="py-24 bg-secondary/30" aria-labelledby="services-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="services-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions web complètes adaptées à vos besoins et à votre budget
            </p>
          </div>
          
          <div ref={servicesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index} 
                  className={cn(
                    "service-card transition-all duration-700 ease-out",
                    visibleServices[index] 
                      ? "opacity-100 translate-y-0 scale-100" 
                      : "opacity-0 translate-y-8 scale-95"
                  )}
                  style={{
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <CardHeader className="text-center">
                    <div className="service-icon-container w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Process Section */}
      <AnimatedSection id="process" className="py-24" aria-labelledby="process-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="process-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mon Processus de Travail
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Une approche structurée pour garantir le succès de votre projet web
            </p>
          </div>
          
          <div ref={processRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <AnimatedDiv 
                  key={index} 
                  delay={index * 200}
                  className={cn(
                    "text-center transition-all duration-700 ease-out",
                    visibleProcess[index] 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-8"
                  )}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </AnimatedDiv>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      {/* Pricing Section */}
      <AnimatedSection id="pricing" className="py-24 bg-secondary/30" aria-labelledby="pricing-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="pricing-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Tarifs
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Des solutions adaptées à tous les budgets, de la vitrine simple à l&apos;application complexe
            </p>
          </div>
          
          <div ref={pricingRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index} 
                className={cn(
                  "relative transition-all duration-700 ease-out",
                  plan.featured && "ring-2 ring-primary shadow-lg scale-105",
                  visiblePricing[index] 
                    ? "opacity-100 translate-y-0 scale-100" 
                    : "opacity-0 translate-y-8 scale-95"
                )}
                style={{
                  transitionDelay: `${index * 150}ms`,
                }}
              >
                {plan.featured && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium">
                      Populaire
                    </span>
                  </div>
                )}
                
                <CardHeader className={plan.headerClass}>
                  <CardTitle className="text-xl">{plan.title}</CardTitle>
                  <div className="text-2xl font-bold">{plan.price}</div>
                  <CardDescription className="text-sm opacity-90">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-6">
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button asChild className="w-full" variant={plan.featured ? "default" : "outline"}>
                    <Link href={plan.link}>{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Projects Section */}
      <AnimatedSection id="projects" className="py-24" aria-labelledby="projects-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="projects-title" className="text-3xl md:text-4xl font-bold mb-4">
              Mes Réalisations
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Découvrez quelques-uns de mes projets récents
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.slice(0, 6).map((project, index) => (
              <AnimatedDiv key={project.id} delay={index * 100}>
                <ProjectCard project={project} />
              </AnimatedDiv>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/projets">
                Voir tous mes projets
              </Link>
            </Button>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact Section */}
      <AnimatedSection id="contact" className="py-24 bg-secondary/30" aria-labelledby="contact-title">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="contact-title" className="text-3xl md:text-4xl font-bold mb-4">
              Parlons de Votre Projet
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Prêt à donner vie à votre projet web ? Contactez-moi pour un devis personnalisé
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedDiv delay={200}>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Email</h3>
                    <p className="text-muted-foreground">contact@votre-domaine.fr</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Réponse rapide</h3>
                    <p className="text-muted-foreground">
                      Je réponds généralement sous 24h pour discuter de votre projet
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Download className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Devis gratuit</h3>
                    <p className="text-muted-foreground">
                      Obtenez une estimation détaillée sans engagement
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedDiv>
            
            <AnimatedDiv delay={400}>
              <ContactForm />
            </AnimatedDiv>
          </div>
        </div>
      </AnimatedSection>
    </>
  );
}