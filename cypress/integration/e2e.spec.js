/// <reference types="cypress" />
import listaProdutos from '../fixtures/produtos.json'
import dadosCheckout from '../fixtures/dadosCheckout.json'
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve escolher os produtos, preencher o checkout e validar a compra', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos(listaProdutos)
        cy.preencherChekout(dadosCheckout)
    })
})