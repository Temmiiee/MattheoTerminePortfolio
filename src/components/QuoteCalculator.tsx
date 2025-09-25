"use client";
// Wrapper pour usage dans une Suspense boundary
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ====================================================================
// 1. SCHÉMA DE VALIDATION ET TYPES
// ====================================================================

const formSchema = z.object({
  siteType: z.enum(
    ["vitrine", "ecommerce", "webapp"],
    "Veuillez sélectionner un type de site."
  ),
  designType: z.enum(
    ["template", "custom"],
    "Veuillez sélectionner un type de design."
  ),
  features: z.array(z.string()).optional(),
  // MISE À JOUR : maintenance est maintenant un enum pour les options de prix
  maintenance: z.enum(["none", "monthly", "annually"]).default("none"),
  projectDescription: z.string().optional(),
  files: z.any().optional(),
  name: z.string().min(1, "Veuillez indiquer votre nom."),
  email: z
    .string()
    .email("Veuillez indiquer un email valide.")
    .min(1, "Veuillez indiquer votre email."),
  phone: z.string().optional(),
  company: z.string().default(""),
  technology: z.enum(
    ["react", "vue", "nextjs", "wordpress", "no-preference"],
    "Veuillez sélectionner une technologie."
  ),
});

export type FormValues = z.infer<typeof formSchema>;

export interface QuoteCalculatorProps {
  onFormChange?: (values: FormValues) => void;
}

// ====================================================================
// 2. DONNÉES DE PRIX ET OPTIONS
// ====================================================================

const featureOptions = [
  {
    id: "blog",
    label: "Intégration d'un blog / système d'actualités",
    price: 300,
  },
  { id: "gallery", label: "Galerie d'images / Portfolio avancé", price: 250 },
  {
    id: "newsletter",
    label: "Système d'inscription à la newsletter",
    price: 150,
  },
  {
    id: "multi-langue",
    label: "Configuration pour un site multilingue",
    price: 450,
  },
  {
    id: "analytics",
    label: "Intégration et configuration d'analytics",
    price: 80,
  },
  {
    id: "user-accounts",
    label: "Espace utilisateur / authentification",
    price: 500,
  },
  {
    id: "third-party-integration",
    label: "Intégration de service tiers (API, etc.)",
    price: 400,
  },
  {
    id: "admin-panel",
    label: "Tableau de bord administrateur",
    price: 600,
  },
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
  // NOUVEAU : Prix de maintenance mensuel et annuel
  maintenance: {
    none: 0,
    monthly: 10, // 10€ / mois
    annually: 100, // 100€ / an
  },
};

// Helper: comparaison des valeurs pertinentes (ignore files pour éviter faux positifs)
function areFormValuesEqual(a?: FormValues | null, b?: FormValues | null) {
  if (a === b) return true;
  if (!a || !b) return false;
  // comparer champs scalaires
  if (a.siteType !== b.siteType) return false;
  if (a.designType !== b.designType) return false;
  if (a.maintenance !== b.maintenance) return false;
  if (a.name !== b.name) return false;
  if (a.email !== b.email) return false;
  if (a.phone !== b.phone) return false;
  if (a.company !== b.company) return false;
  if (a.technology !== b.technology) return false;
  if ((a.projectDescription || "") !== (b.projectDescription || "")) return false;
  // features (comparer comme ensembles)
  const fa = Array.isArray(a.features) ? [...a.features].sort() : [];
  const fb = Array.isArray(b.features) ? [...b.features].sort() : [];
  if (fa.length !== fb.length) return false;
  for (let i = 0; i < fa.length; i++) {
    if (fa[i] !== fb[i]) return false;
  }
  // on ignore volontairement files (peuvent contenir objets non JSON-serializables)
  return true;
}

// util: sérialise seulement les champs pertinents pour comparaison stable
function serializeRelevant(v: FormValues) {
  const features = Array.isArray(v.features) ? [...v.features].sort() : [];
  return JSON.stringify({
    siteType: v.siteType,
    designType: v.designType,
    maintenance: v.maintenance,
    name: v.name,
    email: v.email,
    phone: v.phone ?? "",
    company: v.company ?? "",
    technology: v.technology,
    projectDescription: v.projectDescription ?? "",
    features,
    // files intentionally excluded
  });
}

// ====================================================================
// 3. COMPOSANT PRINCIPAL
// ====================================================================

export function QuoteCalculatorWrapper(
  props: Omit<QuoteCalculatorProps, "searchParams">
) {
  const searchParams = useSearchParams();
  return <QuoteCalculator {...props} searchParams={searchParams} />;
}

export const QuoteCalculator = React.memo(function QuoteCalculator({
  onFormChange,
  searchParams,
}: QuoteCalculatorProps & { searchParams?: ReturnType<typeof useSearchParams> }) {
  console.log("🎯 [QuoteCalculator] Composant rendu", { onFormChange: !!onFormChange });

  const [isDragActive, setIsDragActive] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const params = useMemo(
    () => ({
      siteType: searchParams?.get("siteType"),
      designType: searchParams?.get("designType"),
      features: searchParams?.get("features")?.split(",") || [],
      maintenance: searchParams?.get("maintenance"), // Peut être "monthly", "annually"
      technology: searchParams?.get("technology"),
    }),
    [searchParams]
  );

  const defaultValues: FormValues = {
    siteType:
      params.siteType === "vitrine" ||
      params.siteType === "ecommerce" ||
      params.siteType === "webapp"
        ? (params.siteType as FormValues["siteType"])
        : "vitrine",
    designType:
      params.designType === "template" || params.designType === "custom"
        ? (params.designType as FormValues["designType"])
        : "template",
    features: Array.isArray(params.features) ? params.features : [],
    // MISE À JOUR : Gestion des valeurs par défaut pour 'maintenance'
    maintenance:
      params.maintenance === "monthly" || params.maintenance === "annually"
        ? (params.maintenance as FormValues["maintenance"])
        : "none",
    name: "",
    email: "",
    company: "",
    phone: "",
    technology:
      params.technology === "react" ||
      params.technology === "vue" ||
      params.technology === "nextjs" ||
      params.technology === "wordpress" ||
      params.technology === "no-preference"
        ? (params.technology as FormValues["technology"])
        : "no-preference",
    projectDescription: "",
    files: undefined,
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  }) as ReturnType<typeof useForm<FormValues>>;

  // Utiliser useWatch au lieu de form.watch pour éviter les boucles infinies
  const formValues = useWatch({ control: form.control }) as FormValues;
  const isFirstRunRef = React.useRef(true);

  // stocker la dernière callback pour éviter de recréer l'effet quand la ref change
  const onFormChangeRef = React.useRef<typeof onFormChange | undefined>(onFormChange);
  React.useEffect(() => {
    onFormChangeRef.current = onFormChange;
  }, [onFormChange]);

  // dernière sérialisation envoyée au parent
  const lastSerializedRef = React.useRef<string | null>(null);

  React.useEffect(() => {
    // debug léger
    console.log("� [QuoteCalculator] useWatch déclenché", { isFirstRun: isFirstRunRef.current });

    if (!onFormChangeRef.current) {
      return;
    }

    // Ne pas appeler pendant la soumission du formulaire
    if (form.formState?.isSubmitting) {
      return;
    }

    const serialized = serializeRelevant(formValues);

    if (isFirstRunRef.current) {
      isFirstRunRef.current = false;
      lastSerializedRef.current = serialized;
      return;
    }

    if (lastSerializedRef.current === serialized) {
      // mêmes valeurs pertinentes -> éviter l'appel parent
      return;
    }

    lastSerializedRef.current = serialized;

    try {
      // appeler la callback avec l'objet actuel (types ok)
      onFormChangeRef.current(formValues);
    } catch (err) {
      console.error("[QuoteCalculator] Erreur lors de l'appel onFormChange", err);
    }
    // on ne dépend que de formValues et form.formState.isSubmitting volontairement
  }, [formValues, form.formState?.isSubmitting]);

  const onSubmit = (data: FormValues) => {
    console.log("📤 [QuoteCalculator] onSubmit appelé avec:", data);
    const devisData = {
      siteType: data.siteType,
      designType: data.designType,
      features: (data.features || []).map((f) => {
        const found = featureOptions.find((opt) => opt.id === f);
        return found ? found.label : f;
      }),
      maintenance: data.maintenance,
      technology: data.technology,
      clientInfo: {
        name: data.name,
        email: data.email,
        company: data.company,
        phone: data.phone,
      },
      projectDescription: data.projectDescription,
    };
    try {
      localStorage.setItem("devisData", JSON.stringify(devisData));
    } catch {}
    window.location.href = "/devis/validation";
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ml-12">
        <FormField
          control={form.control}
          name="siteType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">
                1. Quel type de site souhaitez-vous ?
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    console.log("🏢 [QuoteCalculator] siteType changé vers:", value);
                    field.onChange(value);
                  }}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Site Vitrine */}
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                        field.value === "vitrine" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="vitrine" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        <span className="font-bold block">Site Vitrine</span>
                        <span className="text-sm text-muted-foreground flex justify-between items-center">
                          Présenter votre activité et vos services.
                          <span className="font-semibold text-primary ml-4">({pricingModel.siteType.vitrine}€)</span>
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div
                          className={cn(
                            "w-4 h-4 rounded-full border-2 relative",
                            field.value === "vitrine" ? "border-primary bg-primary" : "border-muted-foreground"
                          )}
                        >
                          <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "vitrine" ? "opacity-100" : "opacity-0")}></div>
                        </div>
                      </div>
                    </FormItem>

                    {/* E-commerce */}
                    <FormItem
                      className={cn(
                        "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                        field.value === "ecommerce" ? "border-primary bg-primary/5" : "border-border"
                      )}
                    >
                      <FormControl>
                        <RadioGroupItem value="ecommerce" className="sr-only" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        <span className="font-bold block">E-commerce</span>
                        <span className="text-sm text-muted-foreground flex justify-between items-center">
                          Vendre des produits en ligne (base).
                          <span className="font-semibold text-primary ml-4">({pricingModel.siteType.ecommerce}€)</span>
                        </span>
                      </FormLabel>
                      <div className="ml-auto">
                        <div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "ecommerce" ? "border-primary bg-primary" : "border-muted-foreground")}>
                          <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "ecommerce" ? "opacity-100" : "opacity-0")}></div>
                        </div>
                      </div>
                    </FormItem>
                  </div>
                  {/* Application Web */}
                  <FormItem
                    className={cn(
                      "flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer",
                      field.value === "webapp" ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <FormControl>
                      <RadioGroupItem value="webapp" className="sr-only" />
                    </FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Application Web</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Projet complexe avec des fonctionnalités sur mesure (SaaS, plateforme, etc.).
                        <span className="font-semibold text-primary ml-4">({pricingModel.siteType.webapp}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "webapp" ? "border-primary bg-primary" : "border-muted-foreground")}>
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "webapp" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="designType"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-lg font-semibold">2. Quel type de design souhaitez-vous ?</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                  <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "template" ? "border-primary bg-primary/5" : "border-border")}>
                    <FormControl><RadioGroupItem value="template" className="sr-only" /></FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Design basé sur un template</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Adaptation d&apos;un design existant avec personnalisation légère.
                        <span className="font-semibold text-primary ml-4">({pricingModel.designType.template}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "template" ? "border-primary bg-primary" : "border-muted-foreground")}>
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "template" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>

                  <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "custom" ? "border-primary bg-primary/5" : "border-border")}>
                    <FormControl><RadioGroupItem value="custom" className="sr-only" /></FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">
                      <span className="font-bold block">Design sur mesure</span>
                      <span className="text-sm text-muted-foreground flex justify-between items-center">
                        Création d&apos;un design unique, adapté à vos besoins spécifiques.
                        <span className="font-semibold text-primary ml-4">({pricingModel.designType.custom}€)</span>
                      </span>
                    </FormLabel>
                    <div className="ml-auto">
                      <div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "custom" ? "border-primary bg-primary" : "border-muted-foreground")}>
                        <div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "custom" ? "opacity-100" : "opacity-0")}></div>
                      </div>
                    </div>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField control={form.control} name="features" render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel className="text-lg font-semibold">3. Fonctionnalités additionnelles</FormLabel>
              <FormDescription>Cochez toutes les fonctionnalités que vous souhaitez intégrer.</FormDescription>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featureOptions.map((item) => {
                let forcedIncluded = false;
                let displayPrice = item.price;
                let info = "";
                const currentValues = form.getValues();
                if (currentValues.siteType === "webapp" && item.id === "user-accounts") {
                  forcedIncluded = true;
                  displayPrice = 0;
                  info = "(inclus d'office)";
                }
                return (
                  <FormField key={item.id} control={form.control} name="features" render={({ field }) => (
                    <FormItem key={item.id} className={cn("flex flex-row items-start space-x-3 space-y-0 border rounded-md p-4 cursor-pointer hover:shadow-md transition-all duration-200", (field.value?.includes(item.id) || forcedIncluded) ? "border-primary bg-primary/5" : "border-border")} onClick={() => {
                      if (forcedIncluded) return;
                      const isChecked = field.value?.includes(item.id);
                      field.onChange(isChecked ? field.value?.filter((value) => value !== item.id) : [...(field.value || []), item.id]);
                    }}>
                      <FormControl>
                        <Checkbox checked={field.value?.includes(item.id) || forcedIncluded} onCheckedChange={() => {}} disabled={forcedIncluded} className="pointer-events-none" />
                      </FormControl>
                      <FormLabel className="font-normal w-full cursor-pointer">
                        <div className="flex justify-between items-start">
                          <span>{item.label}</span>
                          <span className="text-muted-foreground text-right ml-4">
                            {displayPrice}€
                            {info && (<span className="text-primary block text-xs font-semibold">{info}</span>)}
                          </span>
                        </div>
                      </FormLabel>
                    </FormItem>
                  )} /> );
              })}
            </div>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="maintenance" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">4. Maintenance & Hébergement (Optionnel)</FormLabel>
            <FormDescription>Souscrivez à l&apos;offre de maintenance pour la tranquillité d&apos;esprit.</FormDescription>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "none" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="none" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between">
                    <span className="font-bold">J&apos;installe sur votre hébergement</span>
                    <span className="text-sm text-muted-foreground ml-auto">Offert</span>
                  </FormLabel>
                  <div className="ml-auto"><div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "none" ? "border-primary bg-primary" : "border-muted-foreground")}><div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "none" ? "opacity-100" : "opacity-0")}></div></div></div>
                </FormItem>

                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "monthly" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="monthly" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between">
                    <span className="font-bold">Mensuelle</span>
                    <span className="text-sm font-semibold text-primary ml-auto">{pricingModel.maintenance.monthly}€ / mois</span>
                  </FormLabel>
                  <div className="ml-auto"><div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "monthly" ? "border-primary bg-primary" : "border-muted-foreground")}><div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "monthly" ? "opacity-100" : "opacity-0")}></div></div></div>
                </FormItem>

                <FormItem className={cn("flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === "annually" ? "border-primary bg-primary/5" : "border-border")}>
                  <FormControl><RadioGroupItem value="annually" className="sr-only" /></FormControl>
                  <FormLabel className="font-normal w-full cursor-pointer flex items-center justify-between">
                    <span className="font-bold">Annuelle (économisez 20€/an)</span>
                    <span className="text-sm font-semibold text-primary ml-auto">{pricingModel.maintenance.annually}€ / an</span>
                  </FormLabel>
                  <div className="ml-auto"><div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === "annually" ? "border-primary bg-primary" : "border-muted-foreground")}><div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === "annually" ? "opacity-100" : "opacity-0")}></div></div></div>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="technology" render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel className="text-lg font-semibold">6. Quelle technologie préférez-vous ?</FormLabel>
            <FormDescription>Si vous n&apos;avez pas de préférence, je choisirai l&apos;outil le plus adapté à votre projet.</FormDescription>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} value={field.value} className="flex flex-col space-y-2 md:grid md:grid-cols-3 md:gap-4 md:space-y-0">
                {["react","vue","nextjs","wordpress","no-preference"].map((tech) => (
                  <FormItem key={tech} className={cn("flex items-center space-x-3 space-y-0 border rounded-md p-4 hover:shadow-md transition-all duration-200 cursor-pointer", field.value === tech ? "border-primary bg-primary/5" : "border-border")}>
                    <FormControl><RadioGroupItem value={tech} className="sr-only" /></FormControl>
                    <FormLabel className="font-normal w-full cursor-pointer">{tech === "no-preference" ? "Pas de préférences" : tech.charAt(0).toUpperCase() + tech.slice(1)}</FormLabel>
                    <div className="ml-auto"><div className={cn("w-4 h-4 rounded-full border-2 relative", field.value === tech ? "border-primary bg-primary" : "border-muted-foreground")}><div className={cn("absolute inset-1 rounded-full bg-white transition-opacity duration-200", field.value === tech ? "opacity-100" : "opacity-0")}></div></div></div>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Separator />

        <div>
          <h3 className="text-lg font-semibold">7. Vos coordonnées</h3>
          <FormDescription>Ces informations sont nécessaires pour établir le devis formel.</FormDescription>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Votre nom <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} onChange={(e) => { console.log("✏️ [QuoteCalculator] Input name changé:", e.target.value); field.onChange(e); }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Votre email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input type="email" placeholder="Votre email" {...field} onChange={(e) => { console.log("📧 [QuoteCalculator] Input email changé:", e.target.value); field.onChange(e); }} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="company" render={({ field }) => (
          <FormItem>
            <FormLabel>Nom de votre entreprise (Optionnel)</FormLabel>
            <FormControl><Input placeholder="Nom de votre entreprise" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Numéro de téléphone (Optionnel)</FormLabel>
            <FormControl><Input type="tel" placeholder="Numéro de téléphone" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <Separator />

        <div>
          <h3 className="text-lg font-semibold">8. Informations complémentaires</h3>
          <FormDescription>Ces informations ne modifient pas le tarif mais m&apos;aideront à mieux comprendre votre projet.</FormDescription>
        </div>

        <FormField control={form.control} name="projectDescription" render={({ field }) => (
          <FormItem>
            <FormLabel>Décrivez votre projet</FormLabel>
            <FormControl><Textarea placeholder="Quels sont vos objectifs ? Qui est votre cible ? Avez-vous des exemples de sites que vous aimez ?" className="min-h-[150px]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="files" render={({ field }) => {
          const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsDragActive(false);
            const files = Array.from(e.dataTransfer.files);
            field.onChange(files);
            setFileNames(files.map((f) => f.name));
          };

          const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(true); };
          const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setIsDragActive(false); };
          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const files = Array.from(e.target.files ?? []);
            field.onChange(files);
            setFileNames(files.map((f) => f.name));
          };
          const handleClick = () => fileInputRef.current?.click();
          const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleClick(); } };

          return (
            <FormItem>
              <FormLabel>Charte graphique, logo, inspirations ou archive ZIP</FormLabel>
              <FormDescription>Vous pouvez téléverser jusqu&apos;à 3 fichiers (images, PDF, ZIP...). Formats acceptés : jpg, jpeg, png, gif, pdf, zip.</FormDescription>
              <FormControl>
                <div className={`transition-all duration-300 border-2 rounded-lg flex flex-col items-center justify-center py-8 px-4 cursor-pointer relative ${isDragActive ? "border-primary bg-primary/5 shadow-lg" : "border-dashed border-border bg-muted/30 hover:bg-muted/50"}`} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} onClick={handleClick} onKeyDown={handleKeyDown} tabIndex={0} role="button" aria-label="Zone de téléversement de fichiers">
                  <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className={`mb-2 ${isDragActive ? "text-primary animate-bounce" : "text-muted-foreground"}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  <span className={`text-base font-medium ${isDragActive ? "text-primary" : "text-foreground"}`}>Glissez-déposez vos fichiers ici ou cliquez pour sélectionner</span>
                  <span className="text-sm text-muted-foreground mt-1">Formats acceptés : JPG, PNG, PDF, ZIP</span>
                  <input ref={fileInputRef} type="file" multiple accept=".jpg,.jpeg,.png,.gif,.pdf,.zip" onChange={handleChange} className="sr-only" aria-hidden="true" />
                  {fileNames.length > 0 && (
                    <div className="mt-4 w-full">
                      <ul className="text-sm space-y-1">
                        {fileNames.map((name, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-foreground">
                            <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                            <span className="truncate">{name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }} />

        <button type="submit" className="w-full p-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-semibold">Obtenir mon devis</button>
      </form>
    </Form>
  );
});