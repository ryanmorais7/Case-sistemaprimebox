describe("Pedidos", () => {
  const CLIENTE_TESTE = "Exemplo 6 (Casa do Colchão)";

  beforeEach(() => {
    cy.login();
    cy.visit("/pedidos");
  });

  it("TC007: cria pedido com todos os campos válidos", () => {
    cy.get('[data-cy="pedidos-novo-btn"]').click();
    cy.url().should("include", "/pedidos/novo");

    cy.get('[data-cy="pedido-cliente"]').click();
    cy.contains(CLIENTE_TESTE).click();
    cy.get('[data-cy="produto-texto"]').first().type("Item de teste automatizado");
    cy.get('[data-cy="pedido-item-quantidade"]').first().type("2");
    cy.get('[data-cy="pedido-item-valor"]').first().type("100");
    cy.get('[data-cy="pedido-salvar"]').click();

    cy.url().should("include", "/pedidos");
    cy.contains(CLIENTE_TESTE).should("be.visible");
  });

  it("TC008: bloqueia salvar sem preencher cliente, produto e valor", () => {
    cy.get('[data-cy="pedidos-novo-btn"]').click();
    cy.get('[data-cy="pedido-salvar"]').click();

    cy.get('[data-cy="pedido-cliente-erro"]').should("be.visible");
    cy.get('[data-cy="pedido-item-produto-erro"]').should("be.visible");
    cy.get('[data-cy="pedido-item-valor-erro"]').should("be.visible");
  });

  it("TC009: rejeita quantidade zero ou negativa", () => {
    cy.get('[data-cy="pedidos-novo-btn"]').click();

    cy.get('[data-cy="pedido-cliente"]').click();
    cy.contains(CLIENTE_TESTE).click();
    cy.get('[data-cy="produto-texto"]').first().type("Item de teste automatizado");
    cy.get('[data-cy="pedido-item-quantidade"]').first().clear().type("0");
    cy.get('[data-cy="pedido-item-valor"]').first().type("100");
    cy.get('[data-cy="pedido-salvar"]').click();

    cy.get('[data-cy="pedido-item-quantidade"]:invalid').should("exist");
  });

  it("TC010: bloqueia dois itens com o mesmo produto no mesmo pedido", () => {
    cy.get('[data-cy="pedidos-novo-btn"]').click();

    cy.get('[data-cy="pedido-cliente"]').click();
    cy.contains(CLIENTE_TESTE).click();

    cy.get('[data-cy="produto-texto"]').eq(0).type("Item duplicado teste");
    cy.get('[data-cy="pedido-item-quantidade"]').eq(0).type("1");
    cy.get('[data-cy="pedido-item-valor"]').eq(0).type("50");

    cy.contains("Adicionar item").click();
    cy.get('[data-cy="produto-texto"]').eq(1).type("Item duplicado teste");
    cy.get('[data-cy="pedido-item-quantidade"]').eq(1).type("1");
    cy.get('[data-cy="pedido-item-valor"]').eq(1).type("50");

    cy.get('[data-cy="pedido-salvar"]').click();
    cy.get('[data-cy="pedido-itens-erro"]').should("be.visible");
  });

  it("TC011: filtra pedidos por status Pago", () => {
    cy.get('[data-cy="pedidos-aba-pagos"]').click();
    cy.get("tbody").should("not.contain", "Em carteira");
    cy.get("tbody").should("contain", "Pago");
  });

  it("TC012: marca um pedido como pago", () => {
    cy.get('[data-cy="pedidos-novo-btn"]').click();
    cy.get('[data-cy="pedido-cliente"]').click();
    cy.contains(CLIENTE_TESTE).click();
    cy.get('[data-cy="produto-texto"]').first().type("Item para marcar pago");
    cy.get('[data-cy="pedido-item-quantidade"]').first().type("1");
    cy.get('[data-cy="pedido-item-valor"]').first().type("50");
    cy.get('[data-cy="pedido-salvar"]').click();

    cy.get('[data-cy="pedido-marcar-pago-btn"]').first().click();
    cy.contains("Pago").should("be.visible");
  });
});
