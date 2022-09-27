import loc from './locators.cy'

Cypress.Commands.add('acessarMenuConta', () => {
    cy.get('[data-test="menu-settings"]').click()
    cy.get('[href="/contas"]').click()
})

Cypress.Commands.add('inserirConta', conta => {
    cy.get('[data-test="nome"]').type(conta)
    cy.get('.btn').click()  
    cy.get(loc.MESSAGE).should('contain', 'inserida com sucesso')
})