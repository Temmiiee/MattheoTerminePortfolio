'use client';

import { useTranslation } from "@/hooks/useTranslation";
import { SocialLinks } from "@/components/SocialLinks";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation();
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Social Links */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm font-medium text-foreground">{t('social.followMe')}</p>
            <SocialLinks iconSize={20} />
          </div>
          
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a 
              href="/sitemap.xml" 
              className="text-muted-foreground hover:text-primary underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('footer.sitemap')}
            </a>
          </div>
          
          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Matthéo Termine. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
