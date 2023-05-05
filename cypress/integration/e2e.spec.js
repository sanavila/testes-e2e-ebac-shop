/// <reference types="cypress" />
import { faker } from '@faker-js/faker'
context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    beforeEach(() => {
        cy.visit('/')
    });

    it('Deve escolher os produtos, preencher o checkout e validar a compra', () => {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.addProdutos(
          "Abominable Hoodie",
          "M",
          "Green",
          "2"
        )
        cy.addProdutos(
          "Atlas Fitness Tank",
          "S",
          "Blue",
          "3"
        )
        cy.get(':nth-child(2) > .page-numbers').click()
        cy.addProdutos(
          "Balboa Persistence Tee",
          "M",
          "Green",
          "3"
        )
        cy.addProdutos(
          "Beaumont Summit Kit",
          "S",
          "Orange",
          "1"
        )
        cy.preencherChekout(
          faker.name.firstName(),
          faker.name.lastName(),
          "EBAC",
          "Brasil",
          "R.Campeão",
          "Caucaia",
          "Ceará",
          "61642170",
          "335566998877",
          faker.internet.email()
        )
        //Resultado esperado
        cy.get('[class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"]')
        .contains('Obrigado. Seu pedido foi recebido.', { matchCase: false })
    })
})