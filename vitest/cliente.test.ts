import { describe, it, expect } from "vitest";
import { clienteSchema } from "./cliente";

describe("validação de CPF (limitação conhecida)", () => {
  it("aceita um CPF com 11 dígitos repetidos, mesmo sendo inválido na prática (sem checagem de dígito verificador)", () => {
    const resultado = clienteSchema.safeParse({
      razaoSocial: "Cliente Teste",
      telefone: "84999999999",
      cpf: "111.111.111-11",
    });
    expect(resultado.success).toBe(true);
  });
});
