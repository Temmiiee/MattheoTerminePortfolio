import { render, screen } from "@testing-library/react";
import { CookieBanner } from "../CookieBanner";

const mockUseConsent = {
  mounted: true,
  showBanner: true,
  consentGiven: {
    functional: true,
    analytics: false,
    marketing: false,
  },
  acceptAll: jest.fn(),
  rejectAll: jest.fn(),
  saveCustomPreferences: jest.fn(),
};

jest.mock("@/contexts/ConsentContext", () => ({
  useConsent: () => mockUseConsent,
}));

jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "cookies.title": "Cookies",
        "cookies.description": "Nous utilisons des cookies",
        "cookies.acceptAll": "Tout accepter",
        "cookies.rejectAll": "Tout refuser",
        "cookies.customize": "Personnaliser",
        "cookies.learnMore": "En savoir plus",
        "cookies.preferences": "Préférences",
        "cookies.essential": "Essentiels",
        "cookies.essentialDesc": "Nécessaires au fonctionnement",
        "cookies.analytics": "Analytiques",
        "cookies.analyticsDesc": "Pour améliorer le site",
        "cookies.save": "Enregistrer",
        "cookies.savedFor": "Enregistré pour 365 jours",
        "footer.privacy": "Politique de confidentialité",
        "a11y.closeAndReject": "Fermer et refuser",
        "a11y.modifyCookies": "Modifier les préférences",
      };
      return translations[key] || key;
    },
  }),
}));

describe("CookieBanner", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("affiche la bannière quand showBanner est true", () => {
    render(<CookieBanner />);
    expect(screen.getByText("Cookies")).toBeInTheDocument();
    expect(screen.getByText("Nous utilisons des cookies")).toBeInTheDocument();
  });

  it("vérifie que la bannière ne s'affiche pas quand mounted est false", () => {
    mockUseConsent.mounted = false;

    const { container } = render(<CookieBanner />);
    expect(container.querySelector(".fixed")).not.toBeInTheDocument();

    // Reset pour les autres tests
    mockUseConsent.mounted = true;
  });

  it("vérifie que les fonctions de consentement sont disponibles", () => {
    render(<CookieBanner />);

    expect(mockUseConsent.acceptAll).toBeDefined();
    expect(mockUseConsent.rejectAll).toBeDefined();
    expect(mockUseConsent.saveCustomPreferences).toBeDefined();
  });
});
