"use client";

import { Container } from "@/components/ui/container";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PolitiqueConfidentialite() {
  const { language } = useLanguage();
  const isFr = language === 'fr';
  
  return (
    <Container className="py-16">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl font-space-grotesk font-bold mb-4">
            {isFr ? 'Politique de confidentialité' : 'Privacy Policy'}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isFr ? 'Dernière mise à jour : ' : 'Last updated: '}{new Date().toLocaleDateString(isFr ? 'fr-FR' : 'en-US')}
          </p>
        </header>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '1. Introduction' : '1. Introduction'}
            </h2>
            <p>
              {isFr 
                ? 'La présente politique de confidentialité décrit comment Matthéo Termine collecte, utilise et protège vos informations personnelles lorsque vous utilisez notre site web "mattheo-termine.fr".'
                : 'This privacy policy describes how Matthéo Termine collects, uses, and protects your personal information when you use our website "mattheo-termine.fr".'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '2. Informations collectées' : '2. Information Collected'}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isFr ? '2.1 Informations fournies volontairement' : '2.1 Voluntarily Provided Information'}
            </h3>
            <p>
              {isFr 
                ? 'Lorsque vous nous contactez via le formulaire de contact ou de devis, nous collectons les informations suivantes :'
                : 'When you contact us via the contact or quote form, we collect the following information:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{isFr ? 'Nom' : 'Name'}</li>
              <li>{isFr ? 'Adresse email' : 'Email address'}</li>
              <li>{isFr ? 'Message et détails du projet' : 'Message and project details'}</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">
              {isFr ? '2.2 Données de navigation' : '2.2 Browsing Data'}
            </h3>
            <p>
              {isFr 
                ? 'Avec votre consentement, nous collectons automatiquement certaines informations techniques :'
                : 'With your consent, we automatically collect certain technical information:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{isFr ? 'Adresse IP (anonymisée)' : 'IP address (anonymized)'}</li>
              <li>{isFr ? 'Type de navigateur et version' : 'Browser type and version'}</li>
              <li>{isFr ? 'Pages visitées et durée de visite' : 'Pages visited and visit duration'}</li>
              <li>{isFr ? 'Référent et page de sortie' : 'Referrer and exit page'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '3. Utilisation des cookies' : '3. Use of Cookies'}
            </h2>
            
            <h3 className="text-xl font-semibold mb-3">
              {isFr ? '3.1 Types de cookies utilisés' : '3.1 Types of Cookies Used'}
            </h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600 mb-2">
                  {isFr ? 'Cookies essentiels' : 'Essential Cookies'}
                </h4>
                <p className="text-sm">
                  {isFr 
                    ? 'Nécessaires au fonctionnement du site (préférences de thème, consentement aux cookies). Ces cookies ne peuvent pas être désactivés.'
                    : 'Necessary for the site to function (theme preferences, cookie consent). These cookies cannot be disabled.'
                  }
                </p>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600 mb-2">
                  {isFr ? 'Cookies analytiques' : 'Analytics Cookies'}
                </h4>
                <p className="text-sm">
                  {isFr 
                    ? 'Google Analytics nous aide à comprendre comment les visiteurs utilisent notre site. Ces données sont anonymisées et utilisées uniquement pour améliorer l\'expérience utilisateur.'
                    : 'Google Analytics helps us understand how visitors use our site. This data is anonymized and used only to improve the user experience.'
                  }
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '4. Base légale du traitement' : '4. Legal Basis for Processing'}
            </h2>
            <p>
              {isFr 
                ? 'Nous traitons vos données personnelles sur les bases légales suivantes :'
                : 'We process your personal data on the following legal bases:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>{isFr ? 'Consentement :' : 'Consent:'}</strong> {isFr ? 'pour les cookies analytiques et marketing' : 'for analytics and marketing cookies'}</li>
              <li><strong>{isFr ? 'Intérêt légitime :' : 'Legitimate interest:'}</strong> {isFr ? 'pour répondre à vos demandes de contact' : 'to respond to your contact requests'}</li>
              <li><strong>{isFr ? 'Exécution d\'un contrat :' : 'Contract execution:'}</strong> {isFr ? 'pour la réalisation de prestations' : 'for the provision of services'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '5. Partage des données' : '5. Data Sharing'}
            </h2>
            <p>
              {isFr 
                ? 'Nous ne vendons, n\'échangeons ni ne louons vos informations personnelles à des tiers. Vos données peuvent être partagées uniquement dans les cas suivants :'
                : 'We do not sell, trade, or rent your personal information to third parties. Your data may only be shared in the following cases:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>{isFr ? 'Avec votre consentement explicite' : 'With your explicit consent'}</li>
              <li>{isFr ? 'Pour se conformer à une obligation légale' : 'To comply with a legal obligation'}</li>
              <li>{isFr ? 'Avec des prestataires de services (hébergement, analytics) sous contrat de confidentialité' : 'With service providers (hosting, analytics) under confidentiality agreement'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '6. Conservation des données' : '6. Data Retention'}
            </h2>
            <p>
              {isFr 
                ? 'Nous conservons vos données personnelles pendant les durées suivantes :'
                : 'We retain your personal data for the following periods:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>{isFr ? 'Données de contact :' : 'Contact data:'}</strong> {isFr ? '3 ans après le dernier contact' : '3 years after last contact'}</li>
              <li><strong>{isFr ? 'Consentement aux cookies :' : 'Cookie consent:'}</strong> {isFr ? '1 an' : '1 year'}</li>
              <li><strong>{isFr ? 'Données analytiques :' : 'Analytics data:'}</strong> {isFr ? '26 mois maximum (Google Analytics)' : '26 months maximum (Google Analytics)'}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '7. Vos droits' : '7. Your Rights'}
            </h2>
            <p>
              {isFr 
                ? 'Conformément au RGPD, vous disposez des droits suivants :'
                : 'In accordance with GDPR, you have the following rights:'
              }
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li><strong>{isFr ? 'Droit d\'accès :' : 'Right of access:'}</strong> {isFr ? 'obtenir une copie de vos données' : 'obtain a copy of your data'}</li>
              <li><strong>{isFr ? 'Droit de rectification :' : 'Right to rectification:'}</strong> {isFr ? 'corriger des données inexactes' : 'correct inaccurate data'}</li>
              <li><strong>{isFr ? 'Droit d\'effacement :' : 'Right to erasure:'}</strong> {isFr ? 'demander la suppression de vos données' : 'request deletion of your data'}</li>
              <li><strong>{isFr ? 'Droit de portabilité :' : 'Right to data portability:'}</strong> {isFr ? 'récupérer vos données dans un format structuré' : 'retrieve your data in a structured format'}</li>
              <li><strong>{isFr ? 'Droit d\'opposition :' : 'Right to object:'}</strong> {isFr ? 'vous opposer au traitement de vos données' : 'object to the processing of your data'}</li>
              <li><strong>{isFr ? 'Retrait du consentement :' : 'Withdrawal of consent:'}</strong> {isFr ? 'retirer votre consentement à tout moment' : 'withdraw your consent at any time'}</li>
            </ul>
            <p>
              {isFr ? 'Pour exercer vos droits, contactez-nous à : ' : 'To exercise your rights, contact us at: '}
              <a href="mailto:mattheotermine104@gmail.com" className="text-primary hover:underline ml-1">
                mattheotermine104@gmail.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '8. Sécurité' : '8. Security'}
            </h2>
            <p>
              {isFr 
                ? 'Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, toute altération, divulgation ou destruction.'
                : 'We implement appropriate technical and organizational measures to protect your data against unauthorized access, alteration, disclosure, or destruction.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '9. Contact' : '9. Contact'}
            </h2>
            <p>
              {isFr 
                ? 'Pour toute question concernant cette politique de confidentialité ou le traitement de vos données personnelles, vous pouvez nous contacter :'
                : 'For any questions regarding this privacy policy or the processing of your personal data, you can contact us:'
              }
            </p>
            <div className="bg-muted p-4 rounded-lg mt-4">
              <p><strong>Matthéo Termine</strong></p>
              <p>{isFr ? 'Intégrateur Web Freelance' : 'Freelance Web Developer'}</p>
              <p>Email : mattheotermine104@gmail.com</p>
            </div>
            <p className="mt-4">
              {isFr 
                ? 'Vous avez également le droit de déposer une plainte auprès de la CNIL (Commission Nationale de l\'Informatique et des Libertés) si vous estimez que vos droits ne sont pas respectés.'
                : 'You also have the right to file a complaint with the CNIL (French Data Protection Authority) if you believe your rights are not being respected.'
              }
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {isFr ? '10. Modifications' : '10. Changes'}
            </h2>
            <p>
              {isFr 
                ? 'Cette politique de confidentialité peut être mise à jour périodiquement. Nous vous informerons de tout changement significatif en publiant la nouvelle politique sur cette page avec une date de mise à jour révisée.'
                : 'This privacy policy may be updated periodically. We will inform you of any significant changes by posting the new policy on this page with a revised update date.'
              }
            </p>
          </section>
        </div>
      </div>
    </Container>
  );
}
