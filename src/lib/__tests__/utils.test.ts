import { cn } from "../utils";

describe("cn utility", () => {
  it("fusionne les classes correctement", () => {
    const result = cn("text-red-500", "bg-blue-500");
    expect(result).toBe("text-red-500 bg-blue-500");
  });

  it("gère les classes conditionnelles", () => {
    const result = cn("base-class", true && "conditional-class", false && "hidden-class");
    expect(result).toContain("base-class");
    expect(result).toContain("conditional-class");
    expect(result).not.toContain("hidden-class");
  });

  it("résout les conflits Tailwind", () => {
    const result = cn("p-4", "p-8");
    expect(result).toBe("p-8");
  });

  it("gère les valeurs undefined et null", () => {
    const result = cn("base", undefined, null, "other");
    expect(result).toBe("base other");
  });
});
