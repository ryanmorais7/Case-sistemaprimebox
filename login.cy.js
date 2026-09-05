// login.cy.js
// Testa a página de login do AirGuia
// Vamos do mais simples ao mais complexo, passo a passo

describe('Login', () => {

  beforeEach(() => {
    cy.visit('/login.html')
  })

  // ── ELEMENTOS DA TELA ──────────────────────────────────────────
  // Os testes mais simples -- só verificam se os elementos existem
  // na página, sem clicar em nada ou digitar nada

  it('deve exibir o campo de email', () => {
    cy.get('#email').should('be.visible')
  })

  it('deve exibir o campo de senha', () => {
    cy.get('#password').should('be.visible')
  })

  it('deve exibir o botão de entrar', () => {
    cy.get('#btn-login').should('be.visible')
  })

  // ── VALIDAÇÃO SEM REDE ─────────────────────────────────────────
  // Clica no botão sem preencher nada -- a validação acontece
  // no próprio navegador, sem chamar o Supabase

  it('deve mostrar erro ao clicar em entrar sem preencher nada', () => {
    cy.get('#btn-login').click()
    cy.get('#error-text').should('contain.text', 'Preencha e-mail e senha')
  })

  it('deve mostrar erro com senha incorreta', () => {
  cy.intercept('POST', '**/auth/v1/token*', {
    statusCode: 400,
    body: {
      error: 'invalid_grant',
      error_description: 'Invalid login credentials'
    }
  }).as('loginRequest')

  cy.get('#email').type('testecypress@gmail.com')
  cy.get('#password').type('senhaerrada')
  cy.get('#btn-login').click()

  cy.wait('@loginRequest')

  cy.get('#error-text').should('contain.text', 'E-mail ou senha incorretos.')
})

  // ── TESTE REAL CONTRA O SUPABASE ───────────────────────────────
  // Aqui a chamada vai de verdade para o Supabase
  // usando a conta de teste dedicada

it('deve fazer login e ir para o painel', () => {
  cy.get('#email').type('testecypress@gmail.com')
  cy.get('#password').type('123456')
  cy.get('#btn-login').click()

  // Aceita tanto onboarding quanto painel (sem .html)
  cy.url({ timeout: 10000 }).should('match', /painel|onboarding/)
})

})