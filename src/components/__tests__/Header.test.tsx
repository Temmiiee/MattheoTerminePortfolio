import { render, screen } from "@testing-library/react";
import { Header } from "../Header";
import { usePathname } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "nav.home": "Accueil",
        "nav.projects": "Projets",
        "nav.about": "À propos",
        "nav.contact": "Contact",
      };
      return translations[key] || key;
    },
  }),
}));

describe("Header", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/");
  });

  it("affiche le logo et le nom", () => {
    render(<Header />);
    expect(screen.getByText("Matthéo Termine")).toBeInTheDocument();
  });

  it("affiche tous les liens de navigation", () => {
    render(<Header />);
    expect(screen.getAllByText("Accueil").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Projets").length).toBeGreaterThan(0);
    expect(screen.getAllByText("À propos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact").length).toBeGreaterThan(0);
  });

  it("affiche le bouton menu mobile", () => {
    render(<Header />);
    expect(screen.getByLabelText(/ouvrir le menu/i)).toBeInTheDocument();
  });
});
