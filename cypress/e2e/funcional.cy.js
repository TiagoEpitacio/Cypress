/// <reference types="cypress" />

import loc from '../support/locators.cy'
import '../support/commandsContas.js'

describe('Testes funcionais da aplicação', () => {
    beforeEach(() => {
        cy.login('Tiago@hotmail.com', 'Tiago1234')
    })

    it('Inserir nova conta', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Conta do banco')
    })

    it('Alterar conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//td[.='Conta do banco']/../*[2]/a[1]").click()
        cy.get('[data-test="nome"]').clear().type('Conta do banco modificada')
        cy.get('.btn').click()
        cy.get(loc.MESSAGE).should('contain', 'atualizada com sucesso')
    })

    it('Não deve inserir conta repetida', () => {
        cy.acessarMenuConta()
        cy.get('[data-test="nome"]').type('Conta do banco modificada')
        cy.get('.btn').click()  
        cy.get(loc.MESSAGE).should('contain', '400')
    })


    it('Criar movimentação', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Carro novo')
        cy.get(loc.MOVIMENTACAO.VALOR).type('70000')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Tiago Jesus')
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
    })

    it('Excluir conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//td[.='Conta do banco modificada']/../*[2]/a[2]").click()
        cy.get(loc.MESSAGE).should('contain', 'excluída com sucesso')
    })

})