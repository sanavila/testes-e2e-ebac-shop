// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("login", (usuario, senha) => {
  cy.get("#username").type(usuario);
  cy.get("#password").type(senha, { log: false });
  cy.get(".woocommerce-form > .button").click();
});

Cypress.Commands.add("addProdutos", (listaProdutos) => {
  cy.url().then((urlAnterior) => {
    var quantidadeProdutos = 0;

    listaProdutos.forEach((produto) => {
      cy.get("[class='product-block grid']").contains(produto.produto).click();
      cy.get(".button-variable-item-" + produto.tamanho).click();
      cy.get(".button-variable-item-" + produto.cor).click();
      cy.get(".input-text").clear().type(produto.quantidade);
      cy.get(".single_add_to_cart_button").click();

      quantidadeProdutos += parseInt(produto.quantidade);

      cy.url().should("not.eq", urlAnterior);
      cy.visit(urlAnterior);
    });
    cy.get(".dropdown-toggle > .mini-cart-items").should(
      "contain", quantidadeProdutos
    );
  });
});

Cypress.Commands.add("preencherChekout", (dadosCheckout) => {
  cy.get('.dropdown-toggle > .text-skin > .icon-basket').click()
  cy.get('#cart > .dropdown-menu')
    .should("be.visible")
  cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout')
    .click( )

    dadosCheckout.forEach((dados) => {
      cy.get('#billing_first_name').type(dados.nome)
      cy.get('#billing_last_name').type(dados.sobrenome)
      cy.get('#billing_company').type(dados.empresa)
      cy.get('#select2-billing_country-container')
        .click()
        .type(dados.pais + "{enter}")
      cy.get('#billing_address_1').type(dados.endereco)
      cy.get('#billing_city').type(dados.cidade)
      cy.get('#select2-billing_state-container')
        .click()
        .type(dados.estado + "{enter}")
      cy.get('#billing_postcode').type(dados.cep)
      cy.get('#billing_phone').type(dados.telefone)
      cy.get('#billing_email').type(dados.email)
      cy.get('#terms').click()
      cy.get('#place_order').click()

      cy.get('[class="woocommerce-notice woocommerce-notice--success woocommerce-thankyou-order-received"]')
        .contains('Obrigado. Seu pedido foi recebido.', { matchCase: false })
    }) 
})
