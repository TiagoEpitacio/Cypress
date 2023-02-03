import loc from './locators.cy'

///Comandos Front-end
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

Cypress.Commands.add('resetarApp', () => {
    cy.get(loc.MENU.CONFIGURACOES).click()
    cy.get(loc.MENU.RESETAR).click()
    cy.get(loc.MESSAGE).should('contain', 'Dados resetados com sucesso!')
})


///Comandos Back-end
Cypress.Commands.add('getToken', (user,password) =>{
    cy.request({
        method: 'POST',
        url: '/signin',
        body:{
            email: user,
            redirecionar: false,
            senha: password
        }
    }).its('body.token').should('not.be.empty')
        .then(token=> {
             return token
    })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('Tiago@hotmail.com','Tiago1234').then(token => {
        cy.request({
            method: 'GET',
            url:'https://barrigarest.wcaquino.me/reset',
            headers:{Authorization: `JWT ${token}`}
        }).its('status').should('be.equal', 200)
    })  
})