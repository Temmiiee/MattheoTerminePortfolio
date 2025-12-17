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
          
          {/* Copyright */}
          <p className="text-center text-sm text-muted-foreground">
            &copy; {currentYear} Matthéo Termine. {t('footer.rights')}
            {/* {' • '}
            <Link href="/politique-confidentialite" className="underline hover:text-primary">
              {t('footer.privacy')}
            </Link> */}
          </p>
        </div>
      </div>
    </footer>
  );
}
