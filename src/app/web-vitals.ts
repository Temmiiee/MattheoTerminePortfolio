"use client";

import { useReportWebVitals } from "next/web-vitals";

export function WebVitals() {
  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "production") {
      // Send to analytics
      const body = JSON.stringify({
        name: metric.name,
        value: metric.value,
        rating: metric.rating,
        delta: metric.delta,
        id: metric.id,
      });

      // Send to Google Analytics if available
      if (window.gtag) {
        window.gtag("event", metric.name, {
          value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
          event_category: "Web Vitals",
          event_label: metric.id,
          non_interaction: true,
        });
      }

      // You can also send to your own analytics endpoint
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/analytics", body);
      }
    }
  });

  return null;
}
