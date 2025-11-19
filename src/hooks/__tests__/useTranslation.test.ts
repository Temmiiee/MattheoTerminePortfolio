import { renderHook } from "@testing-library/react";
import { useTranslation } from "../useTranslation";

jest.mock("@/contexts/LanguageContext", () => ({
  useLanguage: () => ({
    language: "fr",
    mounted: true,
  }),
}));

jest.mock("@/lib/translations", () => ({
  getTranslation: (lang: string, key: string) => {
    const translations: Record<string, Record<string, string>> = {
      fr: {
        "test.key": "Valeur de test",
        "test.hello": "Bonjour",
      },
      en: {
        "test.key": "Test value",
        "test.hello": "Hello",
      },
    };
    return translations[lang]?.[key] || key;
  },
}));

describe("useTranslation", () => {
  it("retourne la fonction t et les propriétés", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t).toBeDefined();
    expect(result.current.language).toBe("fr");
    expect(result.current.mounted).toBe(true);
  });

  it("traduit correctement une clé", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("test.key")).toBe("Valeur de test");
    expect(result.current.t("test.hello")).toBe("Bonjour");
  });

  it("retourne la clé si la traduction n'existe pas", () => {
    const { result } = renderHook(() => useTranslation());

    expect(result.current.t("nonexistent.key")).toBe("nonexistent.key");
  });
});
