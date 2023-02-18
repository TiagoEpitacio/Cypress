/// <reference types="cypress" />
describe('Testes de API', () => {
    let token
    before(() => {
        cy.getToken('Tiago@hotmail.com', 'Tiago1234')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() =>{
        cy.resetRest()
    })

    it('Deve criar uma conta', () => {
        cy.request({
            url: '/contas',
            method: 'POST',
            headers:{ Authorization: `JWT ${token}`},
            body: {
                nome: 'Conta via rest'
            } 
        }).as('response')

        cy.get('@response').then(res =>{
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Deve alterar uma conta', () =>{

        
        cy.request({
            method: 'GET',
            url:'/contas',
            headers: { Authorization: `JWT ${token}`},
            qs:{
                nome:'Conta para alterar'
            }
        }).then( res => {
          
            cy.request({
                url: `/contas/${res.body[0].id}`,
                method: 'PUT',
                headers:{ Authorization: `JWT ${token}`},
                body: {
                    nome: 'Nome da conta alterada via rest'
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 200)
    })


})