// cy.loginAsHost() faz o login automaticamente antes de cada teste
// usando o comando que criamos no commands.js

describe('Painel do Anfitrião', () => {

  beforeEach(() => {
    // Em vez de repetir o login em cada teste, usamos o comando
    // customizado que criamos no commands.js
    cy.loginAsHost()
  })

  // ── ELEMENTOS DA TELA ──────────

  it('deve carregar o painel após o login', () => {
    cy.url().should('match', /painel|onboarding/)
  })

  it('deve exibir o menu lateral', () => {
    cy.contains('Geral').should('be.visible')
    cy.contains('Wi-Fi').should('be.visible')
  })

  it('deve exibir o botão Ver Guia', () => {
    cy.contains('Ver Guia').should('be.visible')
  })

  it('deve exibir o botão Sair', () => {
    cy.contains('Sair').should('be.visible')
  })

// ── NAVEGAÇÃO DO MENU ───────────
it('deve navegar para Manutenção', () => {
  cy.contains('Manutenção').click({ force: true })
  cy.get('h2').should('contain.text', 'Manutenção')
})

it('deve navegar para Aparência', () => {
  cy.contains('Aparência').click()
  cy.get('h2').should('contain.text', 'Aparência')
})

it('deve navegar para Acesso', () => {
  cy.contains('Acesso').click()
  cy.get('h2').should('contain.text', 'Acesso')
})

it('deve navegar para Geral', () => {
  cy.contains('Geral').click()
  cy.get('h2').should('contain.text', 'Configurações Gerais')
})

it('deve navegar para Reservas', () => {
  cy.contains('Reservas').click()
  cy.get('h2').should('contain.text', 'Reservas')
})

it('deve navegar para Limpeza', () => {
  cy.contains('Limpeza').click()
  cy.get('h2').should('contain.text', 'Limpeza')
})

it('deve navegar para Localização', () => {
  cy.contains('Localização').click()
  cy.get('h2').should('contain.text', 'Localização')
})

it('deve navegar para Personalização', () => {
  cy.contains('Personalização').click()
  cy.get('h2').should('contain.text', 'Personalização')
})

it('deve navegar para Wi-Fi', () => {
  cy.contains('Wi-Fi').click()
  cy.get('h2').should('contain.text', 'Wi-Fi')
})

it('deve navegar para Restaurantes', () => {
  cy.contains('Restaurantes').click()
  cy.get('h2').should('contain.text', 'Restaurantes')
})

it('deve navegar para Mercados', () => {
  cy.contains('Mercados').click()
  cy.get('h2').should('contain.text', 'Mercados')
})

it('deve navegar para Farmácias', () => {
  cy.contains('Farmácias').click()
  cy.get('h2').should('contain.text', 'Farmácias')
})

it('deve navegar para O que Fazer', () => {
  cy.contains('O que Fazer').click()
  cy.get('h2').should('contain.text', 'O que Fazer')
})

it('deve navegar para Academias', () => {
  cy.contains('Academias').click()
  cy.get('h2').should('contain.text', 'Academias')
})

it('deve navegar para Lavanderias', () => {
  cy.contains('Lavanderias').click()
  cy.get('h2').should('contain.text', 'Lavanderias')
})

it('deve navegar para Emergência', () => {
  cy.contains('Emergência').click()
  cy.get('h2').should('contain.text', 'Emergência')
})

it('deve navegar para Regras', () => {
  cy.contains('Regras').click()
  cy.get('h2').should('contain.text', 'Regras')
})
// ── SALVAR FORMULÁRIOS ──────────────────────

it('deve salvar as configurações de Wi-Fi', () => {
  cy.intercept('PATCH', '**/rest/v1/guide_content*', { body: {} }).as('save')
  cy.contains('Wi-Fi').click()
  cy.get('#w-name').clear({ force: true }).type('RedeTesteCypress', { force: true })
  cy.get('#w-pass').clear({ force: true }).type('senhaTeste123', { force: true })
  cy.contains('button', 'Salvar').click({ force: true })
 
  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})

it('deve salvar as configurações Gerais', () => {
  cy.intercept('PATCH', '**/rest/v1/hosts*', { body: {} }).as('save')
  cy.contains('Geral').click()
  cy.get('#g-propname').clear({ force: true }).type('Propriedade Teste')
  cy.contains('button', 'Salvar').click({ force: true })
  cy.wait('@save')
  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})

it('deve salvar a Localização', () => {
  cy.intercept('PATCH', '**/rest/v1/guide_content*', { body: {} }).as('save')
  cy.contains('Localização').click()
  cy.get('#p-address').clear({ force: true }).type('Rua Teste, 123 - Natal', { force: true })
  cy.contains('button', 'Salvar').click({ force: true })

  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})

it('deve salvar a Personalização', () => {
  cy.intercept('PATCH', '**/rest/v1/guide_content*', { body: {} }).as('save')
  cy.contains('Personalização').click()
  cy.get('#h-img').clear({ force: true }).type('https://picsum.photos/800/400', { force: true })
  cy.get('#h-welcome').clear({ force: true }).type('Seja bem-vindo!', { force: true })
  cy.contains('button', 'Salvar').click({ force: true })

  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})

it('deve salvar as Regras', () => {
  cy.intercept('PATCH', '**/rest/v1/guide_content*', { body: {} }).as('save')
  cy.contains('Regras').click()
  cy.get('#r-rules').clear({ force: true }).type('Não fumar\nCheck-out até 11h')
  cy.contains('button', 'Salvar').click({ force: true })
  
  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})

it('deve salvar o Acesso', () => {
  cy.intercept('PATCH', '**/rest/v1/guide_content*', { body: {} }).as('save')
  cy.get('button[onclick="showSection(\'fechadura\')"]').first().click({ force: true })

  cy.get('#access-type-picker').contains('Fechadura').click({ force: true })

  cy.get('#f-code').type('5478', { force: true })
  cy.get('#f-instructions').type('Digita o código\nPuxa a porta', { force: true })

  cy.contains('button', 'Salvar').click({ force: true })
  
  cy.get('#toast').should('contain.text', 'Salvo com sucesso!')
})
})