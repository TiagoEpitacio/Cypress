/// <reference types="cypress" />

describe('Testes funcionais da aplicação', () => {
    beforeEach(() => {
        cy.visit('https://barrigareact.wcaquino.me')
        cy.fixture('dados').as('dadosLogin').then(()=>{
            cy.get('[data-test="email"]').type('Tiago@hotmail.com')
            cy.get('[data-test="passwd"]').type('Tiago1234')
            cy.get('.btn').click()
            cy.get('.toast-message').click().invoke('text').then((text)=>{
                const toastText = text
                expect(toastText).to.be.contain('Bem vindo')
            })
        })
    })

    it('Inserir nova conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta do banco')
        cy.get('.btn').click()  
        cy.get('.toast-message').should('contain', 'inserida com sucesso')
    })

    it('Alterar conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//td[.='Conta do banco']/../*[2]/a[1]").click()
        cy.get('[data-test="nome"]').clear().type('Conta do banco modificada')
        cy.get('.btn').click()
        cy.get('.toast-message').should('contain', 'atualizada com sucesso')
    })

    it('Inserir nova conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.get('[data-test="nome"]').type('Conta do banco modificada')
        cy.get('.btn').click()  
        cy.get('.toast-message').should('contain', '400')
    })



})