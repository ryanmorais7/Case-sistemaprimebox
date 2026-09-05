describe('Landing Page', () => {

  // Antes de cada teste, abre a página inicial
  beforeEach(() => {
    cy.visit('/')
  })

  it('deve exibir o título principal', () => {
    cy.contains('AirGuia').should('be.visible')
  })

  it('deve exibir o menu de navegação', () => {
    cy.contains('Planos').should('be.visible')
  })

  it('deve ter um botão de call to action', () => {
    cy.contains('Criar meu guia grátis').should('be.visible')
  })
it('deve ter links para login e cadastro', () => {
  cy.contains('Entrar').should('be.visible')
  cy.contains('Criar meu guia grátis').should('be.visible')
})

   //─ SEÇÕES DA PÁGINA ─

  it('deve exibir a seção de funcionalidades', () => {
    cy.contains('Funcionalidades').should('exist')
  })

  it('deve exibir a seção de planos', () => {
    cy.contains('Planos').should('exist')
  })

  it('deve exibir pelo menos um card de plano', () => {
    cy.get('.plan-card').should('have.length.at.least', 1)
  })

  // ── LINKS E REDIRECIONAMENTOS ───

  it('o botão Entrar deve levar para a página de login', () => {
    cy.contains('Entrar').click()
    cy.url().should('include', '/login')
  })

  it('o botão Criar meu guia grátis deve levar para o cadastro', () => {
    cy.contains('Criar meu guia grátis').click()
    // Ajusta conforme para onde o botão redireciona
    cy.url().should('include', '/cadastro')
  })

  // ── RESPONSIVIDADE MOBILE ────

  it('deve funcionar em tela mobile', () => {
    // Simula um iPhone 
    cy.viewport('iphone-x')
    cy.contains('AirGuia').should('be.visible')
    cy.contains('Criar meu guia grátis').should('be.visible')
  })

  it('deve funcionar em tablet', () => {
    cy.viewport('ipad-2')
    cy.contains('AirGuia').should('be.visible')
  })

  // ── META TESTES ───────

  it('deve ter title da página definido', () => {
    cy.title().should('not.be.empty')
  })

  it('deve ter meta description', () => {
    cy.get('meta[name="description"]')
      .should('exist')
      .and('have.attr', 'content')
  })


})