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


    it('Não deve permitir criar uma conta com mesmo nome', () =>{

        cy.request({
            url:'/contas',
            method: 'POST',
            headers: {Authorization : `JWT ${token}`},
            body: {
                nome: 'Conta mesmo nome'
            }, 
            failOnStatusCode: false

        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    }) 

    it('Devo inserir uma movimentação', () =>{
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                url:'/transacoes',
                headers: {Authorization : `JWT ${token}`},
                body: {
                    conta_id: contaId,
                    data_transacao: "12/11/2010",
                    data_pagamento: "13/11/2010",
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }

            }).as('response')
        })
        cy.get('@response').its('body.id').should('exist')
        cy.get('@response').its('status').should('be.equal', 201)
    }) 

    it('Devo validar o saldoda conta', () =>{
        cy.request({
            url: '/saldo',
            method: 'GET',
            headers: { Authorization: `JWT ${token}`,}
        }).then(res =>{
            let saldoConta = null
            res.body.forEach(c =>{
                if(c.conta === 'Conta para saldo') saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })
    })


    
})