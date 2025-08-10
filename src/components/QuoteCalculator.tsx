
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
import { useState, useMemo } from "react";
import { Separator } from "./ui/separator";

const formSchema = z.object({
  siteType: z.enum(["vitrine", "ecommerce", "sur-mesure"], {
    required_error: "Veuillez sélectionner un type de site.",
  }),
  pageCount: z.enum(["1-3", "4-10", "10+"], {
    required_error: "Veuillez sélectionner un nombre de pages.",
  }),
  features: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const featureOptions = [
  { id: "blog", label: "Blog / Actualités", price: 250 },
  { id: "gallery", label: "Galerie d'images / Portfolio", price: 150 },
  { id: "newsletter", label: "Inscription à la newsletter", price: 100 },
  { id: "multi-langue", label: "Site multilingue", price: 400 },
  { id: "analytics", label: "Intégration d'analytics", price: 50 },
];

const pricingModel = {
  siteType: {
    vitrine: 400,
    ecommerce: 1500,
    "sur-mesure": 2000,
  },
  pageCount: {
    "1-3": 100,
    "4-10": 400,
    "10+": 700,
  },
  features: featureOptions.reduce((acc, feature) => {
    acc[feature.id] = feature.price;
    return acc;
  }, {} as Record<string, number>),
};

export function QuoteCalculator() {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      features: [],
    },
  });

  const calculatePrice = (data: FormValues) => {
    let total = 0;
    if (data.siteType) {
      total += pricingModel.siteType[data.siteType];
    }
    if (data.pageCount) {
      total += pricingModel.pageCount[data.pageCount];
    }
    if (data.features) {
      data.features.forEach((featureId) => {
        total += pricingModel.features[featureId] || 0;
      });
    }
    return total;
  };
  
  const watchedValues = form.watch();

  useMemo(() => {
    const { success } = formSchema.safeParse(watchedValues);
    if(success) {
      const price = calculatePrice(watchedValues);
      setTotalPrice(price);
    } else {
      setTotalPrice(null);
    }

  }, [watchedValues, formSchema]);


  function onSubmit(values: FormValues) {
    const price = calculatePrice(values);
    setTotalPrice(price);
    console.log("Final Quote Data:", { ...values, estimatedPrice: price });
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <FormField
            control={form.control}
            name="siteType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">1. Type de site</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="vitrine" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">Site Vitrine</span>
                        <span className="text-sm text-muted-foreground">Présenter votre activité, vos services.</span>
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0 flex-1 border rounded-md p-4 has-[:checked]:border-primary">
                      <FormControl>
                        <RadioGroupItem value="ecommerce" />
                      </FormControl>
                      <FormLabel className="font-normal w-full">
                        <span className="font-bold block">E-commerce</span>
                        <span className="text-sm text-muted-foreground">Vendre des produits en ligne.</span>
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
            name="pageCount"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-lg font-semibold">2. Nombre de pages</FormLabel>
                <FormDescription>
                  Combien de pages uniques estimez-vous nécessaires (ex: Accueil, À propos, Contact, etc.) ?
                </FormDescription>
                <FormControl>
                    <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                    >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="1-3" /></FormControl>
                            <FormLabel className="font-normal">1 à 3 pages</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="4-10" /></FormControl>
                            <FormLabel className="font-normal">4 à 10 pages</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl><RadioGroupItem value="10+" /></FormControl>
                            <FormLabel className="font-normal">Plus de 10 pages</FormLabel>
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
            render={() => (
              <FormItem>
                 <div className="mb-4">
                    <FormLabel className="text-lg font-semibold">3. Fonctionnalités additionnelles</FormLabel>
                    <FormDescription>
                        Cochez toutes les fonctionnalités que vous souhaitez intégrer.
                    </FormDescription>
                </div>
                <div className="space-y-2">
                {featureOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="features"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
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
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      
      <Separator />

      <div className="mt-8">
        <h3 className="text-2xl font-bold font-headline text-center">Estimation du devis</h3>
        <div className="mt-4 bg-secondary p-6 rounded-lg text-center">
            {totalPrice !== null ? (
                <>
                <p className="text-4xl font-bold text-primary">{totalPrice} € <span className="text-lg font-normal text-muted-foreground">HT</span></p>
                <p className="text-muted-foreground mt-2">
                    Cette estimation est fournie à titre indicatif. Un devis détaillé vous sera fourni après discussion de votre projet.
                </p>
                 <Button asChild size="lg" className="mt-6">
                    <Link href="#contact">Contacter pour un devis final</Link>
                </Button>
                </>
            ) : (
                <p className="text-lg text-muted-foreground">Veuillez remplir les options ci-dessus pour obtenir une estimation.</p>
            )}
        </div>
      </div>
    </div>
  );
}
