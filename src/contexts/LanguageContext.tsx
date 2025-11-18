'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  mounted: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

const LANGUAGE_STORAGE_KEY = 'preferred-language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Charger la langue sauvegardée ou détecter la langue du navigateur
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language;
      if (savedLanguage && (savedLanguage === 'fr' || savedLanguage === 'en')) {
        setLanguageState(savedLanguage);
      } else {
        // Détecter la langue du navigateur
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith('en')) {
          setLanguageState('en');
        } else {
          setLanguageState('fr');
        }
      }
    }
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      // Mettre à jour l'attribut lang du HTML
      document.documentElement.lang = lang;
    }
  }, []);

  const t = useCallback((key: string): string => {
    // Import dynamique pour éviter les problèmes de dépendances circulaires
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const translations = require('@/lib/translations');
    return translations.getTranslation(language, key);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, mounted }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Retourner des valeurs par défaut pendant le SSR
    return {
      language: 'fr' as Language,
      setLanguage: () => {},
      t: (key: string) => key,
      mounted: false,
    };
  }
  return context;
}
