'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { useConsent } from '@/contexts/ConsentContext';
import { useEffect, useState, useRef } from 'react';
import { getAnalyticsTracker } from '@/lib/optimization/analytics-tracker';

export function CoreWebVitalsTracking() {
  const { consentGiven, mounted } = useConsent();
  const [canTrack, setCanTrack] = useState(false);
  const trackerRef = useRef<ReturnType<typeof getAnalyticsTracker> | null>(null);

  useEffect(() => {
    if (mounted) {
      setCanTrack(consentGiven.analytics);
      
      // Initialize analytics tracker if consent is given
      if (consentGiven.analytics && !trackerRef.current) {
        trackerRef.current = getAnalyticsTracker({
          enabled: true,
          endpoint: '', // No API endpoint for static export
          reportInterval: 30000, // Report every 30 seconds
          debug: process.env.NODE_ENV === 'development'
        });
        
        // Start tracking Core Web Vitals
        trackerRef.current.trackCoreWebVitals();
      }
    }
  }, [consentGiven.analytics, mounted]);

  useReportWebVitals((metric) => {
    // Only track if consent is given and in production
    if (!canTrack || process.env.NODE_ENV !== 'production') {
      return;
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_category: 'Web Vitals',
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Note: Custom analytics endpoint not available in static export mode
    // Metrics are sent to Google Analytics instead
  });

  return null;
}
