describe("Produção", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/producao");
  });

  it("TC013: agrupa itens de clientes cadastrados e não cadastrados na mesma OP", () => {
    cy.contains("Criar OP").click();

    cy.get('[data-cy="cliente-texto"]').first().type("Exemplo 6 (Casa do Colchão)");
    cy.get('[data-cy="produto-texto"]').first().type("Item OP cliente cadastrado");
    cy.get('[data-cy="criar-op-quantidade"]').first().type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').first().type("100");

    cy.get('[data-cy="criar-op-adicionar-linha"]').click();

    cy.get('[data-cy="cliente-texto"]').eq(1).type("Cliente Nao Cadastrado Teste");
    cy.get('[data-cy="produto-texto"]').eq(1).type("Item OP cliente avulso");
    cy.get('[data-cy="criar-op-quantidade"]').eq(1).type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').eq(1).type("80");

    cy.get('[data-cy="criar-op-salvar"]').click();

    cy.get('[data-cy="op-do-dia-cliente"]').should("contain", "Exemplo 6 (Casa do Colchão)");
    cy.get('[data-cy="op-do-dia-cliente"]').should("contain", "Cliente Nao Cadastrado Teste");
  });

  it("TC014: criar OP não gera Pedido formal automaticamente", () => {
    cy.visit("/pedidos");
    cy.get("tbody tr").its("length").then((totalAntes) => {
      cy.visit("/producao");
      cy.contains("Criar OP").click();

      cy.get('[data-cy="cliente-texto"]').first().type("Exemplo 6 (Casa do Colchão)");
      cy.get('[data-cy="produto-texto"]').first().type("Item OP sem pedido");
      cy.get('[data-cy="criar-op-quantidade"]').first().type("1");
      cy.get('[data-cy="criar-op-preco-unitario"]').first().type("100");
      cy.get('[data-cy="criar-op-salvar"]').click();

      cy.visit("/pedidos");
      cy.get("tbody tr").its("length").should("eq", totalAntes);
    });
  });

  it("TC015: respeita a ordem de digitação dos itens na OP do dia", () => {
    cy.contains("Criar OP").click();

    cy.get('[data-cy="cliente-texto"]').first().type("Ordem Teste");
    cy.get('[data-cy="produto-texto"]').first().type("Item Ordem A");
    cy.get('[data-cy="criar-op-quantidade"]').first().type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').first().type("10");

    cy.get('[data-cy="criar-op-adicionar-linha"]').click();
    cy.get('[data-cy="cliente-texto"]').eq(1).type("Ordem Teste");
    cy.get('[data-cy="produto-texto"]').eq(1).type("Item Ordem B");
    cy.get('[data-cy="criar-op-quantidade"]').eq(1).type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').eq(1).type("10");

    cy.get('[data-cy="criar-op-adicionar-linha"]').click();
    cy.get('[data-cy="cliente-texto"]').eq(2).type("Ordem Teste");
    cy.get('[data-cy="produto-texto"]').eq(2).type("Item Ordem C");
    cy.get('[data-cy="criar-op-quantidade"]').eq(2).type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').eq(2).type("10");

    cy.get('[data-cy="criar-op-salvar"]').click();

    cy.get('[data-cy="op-do-dia-produto"]').eq(0).should("contain", "Item Ordem A");
    cy.get('[data-cy="op-do-dia-produto"]').eq(1).should("contain", "Item Ordem B");
    cy.get('[data-cy="op-do-dia-produto"]').eq(2).should("contain", "Item Ordem C");
  });

  it("TC016: cria uma OP passo a passo, do início ao fim", () => {
    cy.contains("Criar OP").click();

    cy.get('[data-cy="cliente-texto"]').first().type("Exemplo 6 (Casa do Colchão)");
    cy.get('[data-cy="produto-texto"]').first().type("Item passo a passo");
    cy.get('[data-cy="criar-op-quantidade"]').first().type("3");
    cy.get('[data-cy="criar-op-preco-unitario"]').first().type("120");
    cy.get('[data-cy="criar-op-salvar"]').click();

    cy.get('[data-cy="producao-ir-para-hoje"]').click();
    cy.url().should("match", /\/producao\/\d{4}\/\d{2}\/\d{2}$/);

    cy.get('[data-cy="op-do-dia-produto"]').should("contain", "Item passo a passo");
    cy.get('[data-cy="op-do-dia-quantidade"]').should("contain", "3");
    cy.get('[data-cy="op-do-dia-preco-unitario"]').should("contain", "120");
  });

  it("TC017: abre a impressão de uma OP", () => {
    cy.contains("Criar OP").click();
    cy.get('[data-cy="cliente-texto"]').first().type("Exemplo 6 (Casa do Colchão)");
    cy.get('[data-cy="produto-texto"]').first().type("Item para imprimir");
    cy.get('[data-cy="criar-op-quantidade"]').first().type("1");
    cy.get('[data-cy="criar-op-preco-unitario"]').first().type("50");
    cy.get('[data-cy="criar-op-salvar"]').click();

    cy.get('[data-cy="producao-ir-para-hoje"]').click();

    cy.get('[data-cy="op-do-dia-imprimir"]')
      .first()
      .should("have.attr", "href")
      .and("include", "/producao/imprimir-op/");
  });

  it("TC018: cria OP a partir do card de um dia na agenda semanal", () => {
    cy.get('[data-cy="agenda-criar-op-btn"]').first().click();

    cy.url().should("include", "/producao/nova");
    cy.url().then((url) => {
      const data = new URL(url).searchParams.get("data");
      const [ano, mes, dia] = data.split("-");

      cy.get('[data-cy="cliente-texto"]').first().type("Exemplo 6 (Casa do Colchão)");
      cy.get('[data-cy="produto-texto"]').first().type("Item via agenda semanal");
      cy.get('[data-cy="criar-op-quantidade"]').first().type("1");
      cy.get('[data-cy="criar-op-preco-unitario"]').first().type("40");
      cy.get('[data-cy="criar-op-salvar"]').click();

      cy.visit(`/producao/${ano}/${mes}/${dia}`);
      cy.get('[data-cy="op-do-dia-produto"]').should("contain", "Item via agenda semanal");
    });
  });
});
