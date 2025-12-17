'use client';

import { Linkedin, Github } from 'lucide-react';
import { config } from '@/lib/config';
import { useTranslation } from '@/hooks/useTranslation';

interface SocialLinksProps {
  className?: string;
  iconSize?: number;
  showLabels?: boolean;
}

// Icône Malt personnalisée (SVG)
const MaltIcon = ({ size = 24 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.1 13.5L18.6 12l1.5-1.5c2-2 2-5.2 0-7.2s-5.2-2-7.2 0L11.4 4.8 9.9 3.3c-2-2-5.2-2-7.2 0s-2 5.2 0 7.2l1.5 1.5-1.5 1.5c-2 2-2 5.2 0 7.2s5.2 2 7.2 0l1.5-1.5 1.5 1.5c2 2 5.2 2 7.2 0s2-5.2 0-7.2zM12 15.9l-3.9-3.9L12 8.1l3.9 3.9L12 15.9z"/>
  </svg>
);

export function SocialLinks({ className = '', iconSize = 24, showLabels = false }: SocialLinksProps) {
  const { t } = useTranslation();

  const socialPlatforms = [
    {
      name: 'LinkedIn',
      url: config.social.linkedin,
      icon: Linkedin,
      label: t('social.linkedin'),
      ariaLabel: t('social.linkedinAria'),
    },
    {
      name: 'GitHub',
      url: config.social.github,
      icon: Github,
      label: t('social.github'),
      ariaLabel: t('social.githubAria'),
    },
    {
      name: 'Malt',
      url: config.social.malt,
      icon: () => <MaltIcon size={iconSize} />,
      label: t('social.malt'),
      ariaLabel: t('social.maltAria'),
    },
  ];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialPlatforms.map((platform) => {
        const Icon = platform.icon;
        return (
          <a
            key={platform.name}
            href={platform.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
            aria-label={platform.ariaLabel}
            title={platform.label}
          >
            {showLabels ? (
              <span className="flex items-center gap-2">
                <Icon size={iconSize} />
                <span>{platform.label}</span>
              </span>
            ) : (
              <Icon size={iconSize} />
            )}
          </a>
        );
      })}
    </div>
  );
}
