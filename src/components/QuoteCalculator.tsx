
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState, useMemo, useEffect } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSearchParams } from "next/navigation";

const formSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce", "webapp"], {
    required_error: "Veuillez sélectionner un type de site.",
  }),
  designType: z.enum(["template", "custom"], {
      required_error: "Veuillez sélectionner un type de design.",
  }),
  wordpress: z.boolean().default(false).optional(),
  features: z.array(z.string()).optional(),
  maintenance: z.boolean().default(false).optional(),
  projectDescription: z.string().optional(),
  files: z.any().optional(),
  name: z.string().min(1, 'Veuillez indiquer votre nom.'),
  email: z.string().email('Veuillez indiquer un email valide.').min(1, 'Veuillez indiquer votre email.'),
  phone: z.string().optional(),
  company: z.string().optional().default(''),
  technology: z.enum(["react", "vue", "nextjs", "twig", "no-preference"], {
    required_error: "Veuillez sélectionner une technologie.",
  }),
  pages: z.number().min(1, { message: "Veuillez indiquer le nombre de pages estimé." }),
});

type FormValues = z.infer<typeof formSchema>;

const featureOptions = [
  { id: "blog", label: "Intégration d'un blog / système d'actualités", price: 300 },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
  { id: "newsletter", label: "Système d'inscription à la newsletter", price: 150 },
  { id: "multi-langue", label: "Configuration pour un site multilingue", price: 450 },
  { id: "ecommerce-variations", label: "Variations de produits (pour E-commerce)", price: 300 },
  { id: "analytics", label: "Intégration et configuration d'analytics", price: 80 },
  { id: "user-accounts", label: "Espace utilisateur / authentification", price: 500 },
  { id: "third-party-integration", label: "Intégration de service tiers (API, etc.)", price: 400 },
  { id: "admin-panel", label: "Tableau de bord administrateur simple", price: 600 },
];
const pricingModel = {
  siteType: {
    vitrine: 350,
    ecommerce: 1200,
    webapp: 2500,
  },
  designType: {
    template: 200,
    custom: 800,
  },
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
  maintenance: 49,
};


export function QuoteCalculator() {
  const searchParams = useSearchParams();
  const params = useMemo(() => ({
    siteType: searchParams.get('siteType'),
    pages: searchParams.get('pages'),
    designType: searchParams.get('designType'),
    features: searchParams.get('features')?.split(',') || [],
    maintenance: searchParams.get('maintenance'),
    technology: searchParams.get('technology'),
  }), [searchParams]);

  const defaultValues = useMemo(() => ({
    siteType: params.siteType === 'vitrine' || params.siteType === 'ecommerce' || params.siteType === 'webapp' ? params.siteType : undefined,
    designType: params.designType === 'template' || params.designType === 'custom' ? params.designType : undefined,
    wordpress: false,
    features: params.features,
    maintenance: params.maintenance === 'true',
    name: "",
    email: "",
    company: "",
    phone: "",
    technology: params.technology === 'react' || params.technology === 'vue' || params.technology === 'nextjs' || params.technology === 'twig' || params.technology === 'no-preference' ? params.technology : undefined,
    projectDescription: "",
    pages: params.pages ? parseInt(params.pages) : 1,
  }), [params]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);


  const watchedValues = form.watch();

  const { total: totalPrice, maintenanceCost, details } = useMemo(() => {
    const parsedData = formSchema.safeParse(watchedValues);
    if (!parsedData.success) {
      return { total: null, maintenanceCost: 0, details: {} };
    }
    const finalData = parsedData.data;

    let base = 0;
    const details: Record<string, number> = {};
    
    if (finalData.siteType) {
      const price = pricingModel.siteType[finalData.siteType];
      base += price;
      details[`Site ${finalData.siteType}`] = price;
    }
    if(finalData.designType) {
        const price = pricingModel.designType[finalData.designType];
        base += price;
        details[`Design ${finalData.designType}`] = price;
    }

    let featurePrice = 0;
    if (finalData.features) {
      finalData.features.forEach((featureId) => {
        if (featureId === 'ecommerce-variations' && finalData.siteType !== 'ecommerce') return; // Exclude ecommerce-variations if siteType is not ecommerce
         const feature = featureOptions.find(f => f.id === featureId);
        if (feature) {
          featurePrice += feature.price;
          details[feature.label] = feature.price;
        }
      });
    }

    const maintenance = finalData.maintenance ? pricingModel.maintenance : 0;
    if (maintenance > 0) {
      details["Maintenance & Hébergement"] = maintenance;
    }
    
    // Multiply base price by the number of pages (minimum 1)
    const numberOfPages = finalData.pages && finalData.pages > 0 ? finalData.pages : 1;
    base *= numberOfPages;
    if (numberOfPages > 1) {
        details["Nombre de pages"] = base; // Show the total price for pages in details
    } else if (finalData.siteType) details[`Site ${finalData.siteType}`] = base; // If only one page, keep the original site type price in details

    return { total: base + featurePrice, maintenanceCost: maintenance, details };
  }, [watchedValues]);

  const onSubmit = (data: FormValues) => {
    // Préparer les données du devis
    const devisData = {
      name: data.name,
      email: data.email,
      company: data.company,
      phone: data.phone,
      siteType: data.siteType,
      pages: data.pages,
      features: data.features || [],
      technology: data.technology,
      wordpress: data.wordpress,
      clientInfo: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
      },
      projectDescription: data.projectDescription,
      total: totalPrice,
      maintenanceCost: maintenanceCost,
      details: details
    };
    
    // TODO: Calculate final price based on pages and other factors here
    // Sauvegarder les données dans localStorage pour la page de validation
    localStorage.setItem('devisData', JSON.stringify(devisData));

    // Rediriger vers la page de validation
    window.location.href = '/devis/validation';
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="siteType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">1. Quel type de site souhaitez-vous ?</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="vitrine" />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                            <span className="font-bold block">Site Vitrine</span>
                            <span className="text-sm text-muted-foreground">Présenter votre activité et vos services.</span>
                        </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                        <FormControl>
                            <RadioGroupItem value="ecommerce" />
                        </FormControl>
                        <FormLabel className="font-normal w-full">
                            <span className="font-bold block">E-commerce</span>
                            <span className="text-sm text-muted-foreground">Vendre des produits en ligne (base).</span>
                        </FormLabel>
                        </FormItem>
                    </div>
                     <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="webapp" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Application Web</span>
                        <span className="text-sm text-muted-foreground">Projet complexe avec des fonctionnalités sur mesure (SaaS, plateforme, etc.).</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           <FormField
              control={form.control}
              name="wordpress"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="wordpress-checkbox"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel htmlFor="wordpress-checkbox" className="font-normal">
                      Je souhaite que le site soit développé sur WordPress.
                    </FormLabel>
                    <FormDescription>
                      Cette information est à titre indicatif et n'impacte pas le devis.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

           <FormField
            control={form.control}
            name="designType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">2. Quelle est la complexité du design ?</FormLabel>
                 <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="template" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Basé sur un modèle</span>
                        <span className="text-sm text-muted-foreground">Adaptation d'un design existant (plus rapide).</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="custom" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Design Sur Mesure</span>
                        <span className="text-sm text-muted-foreground">Création d'un design unique à partir de zéro.</span>
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="features"
            render={({ field }) => (
              <FormItem>
                 <div className="mb-4">
                    <FormLabel className="text-lg font-semibold">3. Fonctionnalités additionnelles</FormLabel>
                    <FormDescription>
                        Cochez toutes les fonctionnalités que vous souhaitez intégrer.
                    </FormDescription>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featureOptions.map((item) => (
                  <FormField
                    key={item.id}
                    // Only show ecommerce-variations if siteType is ecommerce
                    // style={{ display: item.id === 'ecommerce-variations' && watchedValues.siteType !== 'ecommerce' ? 'none' : 'flex' }}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...(field.value || []), item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal w-full">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))
                .filter(item => !(item.key === 'ecommerce-variations' && watchedValues.siteType !== 'ecommerce'))}
                </div>
                 {watchedValues.siteType !== 'ecommerce' && watchedValues.features?.includes('ecommerce-variations') && (
                    <p className="text-sm text-red-500 mt-2">La fonctionnalité "Variations de produits" n'est pertinente que pour un site E-commerce et a été retirée de l'estimation.</p>)}
                <FormMessage />
              </FormItem>
            )}
          />

           <FormField
              control={form.control}
              name="maintenance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-semibold">
                      4. Maintenance & Hébergement (Optionnel)
                    </FormLabel>
                    <FormDescription>
                      Souscrire à l'offre de maintenance mensuelle pour la tranquillité d'esprit.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />


          <FormField
            control={form.control}
            name="pages"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">5. Nombre de pages estimé (minimum 1)</FormLabel>
                <FormDescription>
                  Indiquez le nombre approximatif de pages que vous souhaitez pour votre site.
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    {...field} // Spread field props first
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : parseInt(e.target.value))}
                    min="1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="technology"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">6. Quelle technologie préférez-vous ?</FormLabel>
                <FormDescription>
                    Si vous n'avez pas de préférence, je choisirai l'outil le plus adapté à votre projet.
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="flex flex-col space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="react" /></FormControl>
                      <FormLabel className="font-normal w-full">React</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="vue" /></FormControl>
                      <FormLabel className="font-normal w-full">Vue</FormLabel>
                    </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="nextjs" /></FormControl>
                      <FormLabel className="font-normal w-full">Next.js</FormLabel>
                    </FormItem>
                     <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="twig" /></FormControl>
                      <FormLabel className="font-normal w-full">Twig</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl><RadioGroupItem value="no-preference" /></FormControl>
                      <FormLabel className="font-normal w-full">Pas de préférences</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           <Separator />

            {/* New section for contact information */}
            <div>
                <h3 className="text-lg font-semibold">7. Vos coordonnées</h3>
               <FormDescription>
                    Ces informations sont nécessaires pour établir le devis formel.
                </FormDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
             <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Votre nom <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                    <Input placeholder="Votre nom" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

             <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Votre email <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                    <Input type="email" placeholder="Votre email" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            </div>
             <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Nom de votre entreprise (Optionnel)</FormLabel>
                    <FormControl>
                    <Input placeholder="Nom de votre entreprise" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Numéro de téléphone (Optionnel)</FormLabel>
                    <FormControl>
                    <Input type="tel" placeholder="Numéro de téléphone" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <Separator />

            <div>
                <h3 className="text-lg font-semibold">8. Informations complémentaires</h3>
                <FormDescription>
                    Ces informations ne modifient pas le tarif mais m'aideront à mieux comprendre votre projet.
                </FormDescription>
            </div>

            <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Décrivez votre projet</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="Quels sont vos objectifs ? Qui est votre cible ? Avez-vous des exemples de sites que vous aimez ?"
                        className="min-h-[150px]"
                        {...field}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="files"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Charte graphique, logo, ou inspirations</FormLabel>
                     <FormDescription>
                        Vous pouvez téléverser jusqu'à 3 fichiers (images, PDF...).
                    </FormDescription>
                    <FormControl>
                    <Input type="file" multiple {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="mt-8 py-6">
                <h3 className="text-2xl font-bold font-headline text-center">Estimation du devis</h3>
                <div className="mt-4 bg-secondary p-6 rounded-lg text-center">
                    {totalPrice !== null && (watchedValues.siteType && watchedValues.designType) ? (
                        <>
                        <p className="text-4xl font-bold text-primary">{totalPrice} € <span className="text-lg font-normal text-muted-foreground">HT</span></p>
                        {maintenanceCost > 0 && (
                            <p className="text-xl font-semibold text-primary mt-2">+ {maintenanceCost} € / mois</p>
                        )}
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                            Cette estimation est à titre indicatif. Elle évolue en fonction de vos choix.
                        </p>
                        <Button type="submit" size="lg" className="mt-6">
                            Valider le devis
                        </Button>
                        </>
                    ) : (
                        <p className="text-lg text-muted-foreground px-4">Veuillez remplir les options ci-dessus pour obtenir une estimation.</p>
                    )}
                </div>
              </div>
        </form>
      </Form>
    </div>
  );
}
