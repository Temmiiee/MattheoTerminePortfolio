"use client";

import React from "react";
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

// Create Zod schema for form validation
const createFormSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(2, { message: t("contact.validation.name") }),
  email: z.string().email({ message: t("contact.validation.email") }),
  message: z.string().min(10, { message: t("contact.validation.message") }),
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

// Submit to Formspree endpoint
async function submitAction(data: FormData) {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const response = await fetch("https://formspree.io/f/mkgdlyoo", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok || result.error) {
      throw new Error(result.error || "Form submission error.");
    }

    return { success: true, message: "success" };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: error instanceof Error
        ? error.message
        : "error",
    };
  }
}

export function ContactForm() {
  const { t } = useTranslation();
  const { toast } = useToast();
  const formSchema = createFormSchema(t);
  const [formStatus, setFormStatus] = React.useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: FormData) {
    setFormStatus({ type: null, message: '' });
    const result = await submitAction(values);
    if (result.success) {
      setFormStatus({
        type: 'success',
        message: t("contact.success")
      });
      toast({
        title: t("contact.successTitle"),
        description: t("contact.success"),
      });
      form.reset();
    } else {
      setFormStatus({
        type: 'error',
        message: t("contact.error")
      });
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.error"),
        variant: "destructive",
      });
    }
  }

  return (
    <section aria-labelledby="contact-form-title" className="max-w-xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle id="contact-form-title" className="font-headline text-2xl">
            {t("contact.formTitle")}
          </CardTitle>
          <CardDescription>{t("contact.formDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Status region for form feedback */}
          <div 
            role="status" 
            aria-live="polite" 
            aria-atomic="true"
            className={`mb-4 p-3 rounded-md text-sm ${
              formStatus.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : formStatus.type === 'error'
                ? 'bg-red-50 text-red-800 border border-red-200'
                : 'sr-only'
            }`}
          >
            {formStatus.message && (
              <span>{formStatus.message}</span>
            )}
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="name">{t("contact.name")}</FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder={t("contact.placeholder.name")}
                        autoComplete="name"
                        {...field}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">{t("contact.email")}</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t("contact.placeholder.email")}
                        autoComplete="email"
                        {...field}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="message">{t("contact.message")}</FormLabel>
                    <FormControl>
                      <Textarea
                        id="message"
                        placeholder={t("contact.placeholder.message")}
                        className="min-h-[120px]"
                        {...field}
                        aria-required="true"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
                aria-busy={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? t("contact.sending") : t("contact.send")}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
