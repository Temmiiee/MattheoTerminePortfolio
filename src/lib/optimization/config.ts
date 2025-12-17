/**
 * Configuration for optimization system
 */

export interface OptimizationConfig {
  images: {
    quality: number;
    formats: string[];
    sizes: number[];
  };
  performance: {
    lcpTarget: number;
    payloadReductionTarget: number;
  };
  seo: {
    titleMaxLength: number;
    descriptionMinLength: number;
    descriptionMaxLength: number;
  };
}

export const OPTIMIZATION_CONFIG: OptimizationConfig = {
  images: {
    quality: 85,
    formats: ['webp', 'avif'],
    sizes: [320, 640, 768, 1024, 1280, 1920]
  },
  performance: {
    lcpTarget: 2.5, // seconds
    payloadReductionTarget: 400 * 1024 // 400 KiB in bytes
  },
  seo: {
    titleMaxLength: 60,
    descriptionMinLength: 150,
    descriptionMaxLength: 160
  }
};

export const IMAGE_DISPLAY_SIZES = {
  profile: { width: 272, height: 272 },
  projectThumbnail: { width: 400, height: 300 },
  projectHero: { width: 800, height: 600 }
};

export const SOCIAL_PLATFORMS = [
  'linkedin',
  'github',
  'malt'
] as const;

export const PERFORMANCE_THRESHOLDS = {
  lcp: {
    good: 2.5,
    needsImprovement: 4.0
  },
  fid: {
    good: 100,
    needsImprovement: 300
  },
  cls: {
    good: 0.1,
    needsImprovement: 0.25
  }
} as const;