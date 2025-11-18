'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSelector() {
  const { language, setLanguage, mounted } = useLanguage();

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 border border-border rounded-md p-1">
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="h-8 px-3 text-xs font-medium"
        >
          FR
        </Button>
        <Button
          variant="ghost"
          size="sm"
          disabled
          className="h-8 px-3 text-xs font-medium"
        >
          EN
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 border border-border rounded-md p-1">
      <Button
        variant={language === 'fr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('fr')}
        className="h-8 px-3 text-xs font-medium"
        aria-label="Français"
        aria-pressed={language === 'fr'}
      >
        FR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="h-8 px-3 text-xs font-medium"
        aria-label="English"
        aria-pressed={language === 'en'}
      >
        EN
      </Button>
    </div>
  );
}
