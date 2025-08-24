/// <reference types="cypress" />

Cypress.Commands.add('addBun', (bun) => {
  cy.get('[data-cy="bun-ingredient"]')
        .contains(bun)
        .parent()  
        .contains("Добавить")
        .click();
});

Cypress.Commands.add('addMain', (main) => {
  cy.get('[data-cy="main-ingredient"]')
        .contains(main)
        .parent()  
        .contains("Добавить")
        .click();
});

Cypress.Commands.add('addSauce', (sauce) => {
  cy.get('[data-cy="sauce-ingredient"]')
        .contains(sauce)
        .parent()  
        .contains("Добавить")
        .click();
});


declare namespace Cypress {
  interface Chainable {
    addBun(bun: string): Chainable<void>;
    addMain(main: string): Chainable<void>;
    addSauce(sause: string): Chainable<void>;
  }
}
