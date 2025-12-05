import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles de Matthéo Termine. Découvrez comment nous collectons, utilisons et protégeons vos informations conformément au RGPD.',
  keywords: [
    'politique de confidentialité',
    'RGPD',
    'protection des données',
    'vie privée',
    'cookies',
    'données personnelles',
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://mattheo-termine.fr/politique-confidentialite',
  },
  openGraph: {
    title: 'Politique de confidentialité | Matthéo Termine',
    description: 'Politique de confidentialité et protection des données personnelles conformément au RGPD.',
    url: 'https://mattheo-termine.fr/politique-confidentialite',
    type: 'website',
  },
}

export default function PolitiqueConfidentialiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
