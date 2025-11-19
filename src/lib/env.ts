import { z } from "zod";

const envSchema = z.object({
  // Server-side only
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().optional(),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  EMAIL_TO: z.string().email().optional(),

  // Public (client-side accessible)
  NEXT_PUBLIC_GA_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),

  // System
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

export const env = envSchema.parse(process.env);

export type Env = z.infer<typeof envSchema>;
