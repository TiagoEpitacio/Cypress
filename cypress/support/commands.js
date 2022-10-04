import loc from './locators.cy'

Cypress.Commands.add('login', (user, password) =>{
    cy.visit('https://barrigareact.wcaquino.me')
        cy.fixture('dados').as('dadosLogin').then(()=>{
            cy.get(loc.LOGIN.USER).type(user)
            cy.get(loc.LOGIN.PASSWORD).type(password)
            cy.get(loc.LOGIN.BTN_LOGIN).click()
            cy.get(loc.MESSAGE).click().invoke('text').then((text)=>{
                const toastText = text
                expect(toastText).to.be.contain('Bem vindo')
            })
        })
})

Cypress.Commands.add('resetarConta', () => {
    cy.get(loc.MENU.CONFIGURACOES).click()
    cy.get(loc.MENU.RESETAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})