/**
 * Type definitions for website optimization system
 */

export interface ImageAsset {
  originalPath: string;
  optimizedPath: string;
  displaySizes: DisplaySize[];
  format: 'webp' | 'avif' | 'jpeg';
  quality: number;
  savings: number;
}

export interface DisplaySize {
  width: number;
  height: number;
  breakpoint?: string;
}

export interface OptimizationResult {
  originalSize: number;
  optimizedSize: number;
  savings: number;
  processedFiles: string[];
}

export interface ResponsiveImageSet {
  srcset: string;
  sizes: string;
  src: string;
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export interface BlockingResourceAnalysis {
  cssFiles: ResourceInfo[];
  jsFiles: ResourceInfo[];
  totalBlockingTime: number;
  criticalPath: string[];
}

export interface ResourceInfo {
  path: string;
  size: number;
  loadTime: number;
  blocking: boolean;
}

export interface PerformanceReport {
  metrics: CoreWebVitals;
  blockingAnalysis: BlockingResourceAnalysis;
  recommendations: string[];
  timestamp: Date;
}

export interface PageSEO {
  title: string; // max 60 chars
  description: string; // 150-160 chars
  keywords: string[];
  canonicalUrl: string;
  structuredData: StructuredDataSchema;
  socialMeta: SocialMetaTags;
}

export interface BusinessData {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  socialProfiles: SocialProfile[];
}

export interface SocialProfile {
  platform: string;
  url: string;
}

export interface SocialMetaTags {
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
}

export interface StructuredDataSchema {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

export interface MetaTagSet {
  title: string;
  description: string;
  canonical: string;
  openGraph: Record<string, string>;
  twitter: Record<string, string>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}