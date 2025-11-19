"use client";

import { useConsent } from "@/contexts/ConsentContext";
import { useEffect } from "react";

export function GoogleAnalyticsConsent() {
  const { consentGiven } = useConsent();

  useEffect(() => {
    // Si l'utilisateur refuse les analytics, on désactive GA
    if (typeof window !== "undefined" && window.gtag) {
      if (consentGiven.analytics) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        });
      } else {
        window.gtag("consent", "update", {
          analytics_storage: "denied",
        });
      }
    }
  }, [consentGiven.analytics]);

  return null;
}
