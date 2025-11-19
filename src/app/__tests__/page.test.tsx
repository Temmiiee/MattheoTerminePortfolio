import { render, screen } from "@testing-library/react";
import Home from "../page";

jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "hero.subtitle": "Intégrateur Web",
        "hero.description": "Je crée des sites web modernes",
        "hero.subdescription": "Performance et accessibilité",
        "hero.discover": "Découvrir",
        "about.title": "À propos",
        "about.subtitle": "Développeur passionné",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: () => ({
    ref: { current: null },
    isIntersecting: true,
  }),
}));

jest.mock("@/components/InteractiveGalaxy", () => ({
  InteractiveGalaxy: () => <div data-testid="interactive-galaxy" />,
}));

jest.mock("@/components/StructuredData", () => ({
  StructuredData: () => <div data-testid="structured-data" />,
}));

jest.mock("@/components/ProjectCard", () => ({
  ProjectCard: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock("@/components/ContactForm", () => ({
  ContactForm: () => <div data-testid="contact-form">Contact Form</div>,
}));

describe("Page d'accueil", () => {
  it("affiche le nom dans le hero", () => {
    render(<Home />);
    const heroTitle = screen.getByRole("heading", { level: 1 });
    expect(heroTitle).toBeInTheDocument();
  });

  it("affiche le composant InteractiveGalaxy", () => {
    render(<Home />);
    expect(screen.getByTestId("interactive-galaxy")).toBeInTheDocument();
  });

  it("affiche le composant StructuredData", () => {
    render(<Home />);
    expect(screen.getByTestId("structured-data")).toBeInTheDocument();
  });

  it("contient la section hero avec l'id accueil", () => {
    render(<Home />);
    const heroSection = document.querySelector("#accueil");
    expect(heroSection).toBeInTheDocument();
  });
});
