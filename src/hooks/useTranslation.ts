'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/lib/translations';
import { useCallback } from 'react';

export function useTranslation() {
  const { language, mounted } = useLanguage();
  
  const t = useCallback((key: string) => {
    if (!mounted) return key;
    const translation = getTranslation(language, key);
    return translation;
  }, [language, mounted]);
  
  return { t, language, mounted };
}
