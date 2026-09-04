import { describe, it, expect } from "vitest";
import { precoParaNumero, formatarPrecoBr, normalizarPrecoDigitado } from "./moeda";

describe("precoParaNumero", () => {
  it("converte valores simples sem separador decimal", () => {
    expect(precoParaNumero("100")).toBe(100);
  });

  it("converte valores com milhar e decimal juntos", () => {
    expect(precoParaNumero("1.234,56")).toBe(1234.56);
  });
});

describe("formatarPrecoBr", () => {
  it("formata número inteiro com casas decimais", () => {
    expect(formatarPrecoBr(100)).toBe("100,00");
  });

  it("formata número com milhar corretamente", () => {
    expect(formatarPrecoBr(1234.5)).toBe("1.234,50");
  });
});

describe("normalizarPrecoDigitado (regressão BUG-009)", () => {
  it("transforma '100' em '100,00', confirmando a correção do BUG-009", () => {
    expect(normalizarPrecoDigitado("100")).toBe("100,00");
  });

  it("retorna null para texto vazio", () => {
    expect(normalizarPrecoDigitado("")).toBeNull();
  });
});
