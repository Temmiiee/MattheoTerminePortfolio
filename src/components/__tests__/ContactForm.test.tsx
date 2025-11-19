import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "../ContactForm";

jest.mock("@/hooks/useTranslation", () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        "contact.formTitle": "Contactez-moi",
        "contact.formDescription": "Remplissez le formulaire",
        "contact.name": "Nom",
        "contact.email": "Email",
        "contact.message": "Message",
        "contact.send": "Envoyer",
        "contact.sending": "Envoi en cours...",
        "contact.placeholder.name": "Votre nom",
        "contact.placeholder.email": "votre@email.com",
        "contact.placeholder.message": "Votre message",
        "contact.validation.name": "Le nom doit contenir au moins 2 caractères",
        "contact.validation.email": "Email invalide",
        "contact.validation.message": "Le message doit contenir au moins 10 caractères",
      };
      return translations[key] || key;
    },
  }),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe("ContactForm", () => {
  it("affiche tous les champs du formulaire", () => {
    render(<ContactForm />);

    expect(screen.getByText("Contactez-moi")).toBeInTheDocument();
    expect(screen.getByLabelText("Nom")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /envoyer/i })).toBeInTheDocument();
  });

  it("affiche les erreurs de validation", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const submitButton = screen.getByRole("button", { name: /envoyer/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/le nom doit contenir au moins 2 caractères/i)).toBeInTheDocument();
    });
  });

  it("permet de remplir le formulaire", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    const nameInput = screen.getByLabelText("Nom");
    const emailInput = screen.getByLabelText("Email");
    const messageInput = screen.getByLabelText("Message");

    await user.type(nameInput, "John Doe");
    await user.type(emailInput, "john@example.com");
    await user.type(messageInput, "Ceci est un message de test");

    expect(nameInput).toHaveValue("John Doe");
    expect(emailInput).toHaveValue("john@example.com");
    expect(messageInput).toHaveValue("Ceci est un message de test");
  });
});
