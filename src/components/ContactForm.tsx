"use client";

import { useForm } from "react-hook-form";
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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, {
    message: t('contact.validation.name'),
  }),
  email: z.string().email({
    message: t('contact.validation.email'),
  }),
  message: z.string().min(10, {
    message: t('contact.validation.message'),
  }),
});

type FormData = {
  name: string;
  email: string;
  message: string;
};

async function submitAction(data: FormData) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        message: data.message,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || `Erreur HTTP: ${response.status}`);
    }

    return { success: true, message: result.message || "Message envoyé avec succès !" };
    
  } catch (error) {
    console.error('Erreur lors de l\'envoi:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Une erreur est survenue lors de l'envoi." 
    };
  }
}

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const formSchema = createFormSchema(t);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await submitAction(values);
    if (result.success) {
      toast({
        title: t('contact.successTitle'),
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        title: t('contact.errorTitle'),
        description: result.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle id="form-title" className="font-headline text-2xl">{t('contact.formTitle')}</CardTitle>
            <CardDescription>{t('contact.formDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" aria-labelledby="form-title">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t('contact.name')}</FormLabel>
                    <FormControl>
                        <Input placeholder={t('contact.placeholder.name')} {...field} />
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
                    <FormLabel>{t('contact.email')}</FormLabel>
                    <FormControl>
                        <Input placeholder={t('contact.placeholder.email')} {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>{t('contact.message')}</FormLabel>
                    <FormControl>
                        <Textarea placeholder={t('contact.placeholder.message')} className="min-h-[120px]" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                    {form.formState.isSubmitting ? t('contact.sending') : t('contact.send')}
                </Button>
            </form>
            </Form>
        </CardContent>
    </Card>
  );
}
