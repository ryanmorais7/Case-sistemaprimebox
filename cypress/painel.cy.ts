describe("Painel", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/");
  });

  it("TC021: cards do Painel exibem valores visíveis", () => {
    cy.get('[data-cy="painel-em-carteira-valor"]').should("be.visible");
    cy.get('[data-cy="painel-pedidos-pagos-valor"]').should("be.visible");
    cy.get('[data-cy="painel-clientes-ativos-valor"]').should("be.visible");
    cy.get('[data-cy="painel-pago-mes-valor"]').should("be.visible");
  });
});
