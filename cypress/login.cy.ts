// Credenciais em cypress.env.json (fora do Git, ver .gitignore). Ambiente
// "teste" (https://sistemaprimebox-teste.vercel.app, ver baseUrl em
// cypress.config.ts), atrás do Deployment Protection da Vercel, o bypass
// automático está em cypress/support/commands.ts (overwrite de cy.visit).

describe("Login", () => {
  it("TC001: faz login e chega no Painel", () => {
    cy.login();
    cy.get('[data-cy="painel-heading"]').should("contain", "Painel");
  });

  it("TC002: mostra erro com senha incorreta", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-email"]').type(Cypress.env("email"));
    cy.get('[data-cy="login-password"]').type("senha-errada-qualquer");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-error-message"]').should("be.visible");
    cy.url().should("include", "/login");
  });

  it("TC003: mostra erro com email não cadastrado", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-email"]').type("usuario-invalido@primebox.local");
    cy.get('[data-cy="login-password"]').type("qualquer-senha-123");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-error-message"]').should("be.visible");
  });

  it("TC004: bloqueia envio com campos vazios", () => {
    cy.visit("/login");
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="login-email"]:invalid').should("exist");
  });

  it("TC005: mantém sessão ativa após recarregar a página", () => {
    cy.login();
    cy.reload();
    cy.get('[data-cy="painel-heading"]').should("contain", "Painel");
  });
});
