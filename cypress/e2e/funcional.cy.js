/// <reference types="cypress" />

import loc from '../support/locators.cy'
import '../support/commandsContas.js'

describe('Testes funcionais da aplicação', () => {
    beforeEach(() => {
        cy.login('Tiago@hotmail.com', 'Tiago1234')
    })
    
    it('Resetar conta', () =>{
        cy.resetarApp()
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
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta do banco modificada')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação inserida com sucesso!')
        cy.get('.list-group > li').should('have.length', 7)
        cy.xpath("//span[contains(., 'Carro novo')]/following-sibling::small[contains(., '70.000,00')]").should('exist')
    })

    it('Consultar saldo', () =>{
        cy.get(loc.MENU.HOME).click()
        /*cy.xpath(loc.SALDO.FN_XP_SALDO("Conta do banco modificada")).invoke('text').then(($value) => {
            cy.log($value)
          })*/
        cy.xpath(loc.SALDO.FN_XP_SALDO("Conta do banco modificada")).should('contain', '70.000,00')
    })

    it('Excluir saldo', () =>{
        cy.get(loc.MENU.EXTRATO).click()
        cy.xpath('//span[contains(., "Carro novo")]/ancestor::div[3]//descendant::div[5]//a[2]').click()
        cy.get(loc.MESSAGE).should('contain', 'Movimentação removida com sucesso!')
    })

    it('Excluir conta', () => {
        cy.get('[data-test="menu-settings"]').click()
        cy.get('[href="/contas"]').click()
        cy.xpath("//td[.='Conta do banco modificada']/../*[2]/a[2]").click()
        cy.get(loc.MESSAGE).should('contain', 'excluída com sucesso')
    })

})