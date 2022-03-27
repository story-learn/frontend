// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

Cypress.Commands.add("getInputByPlaceholder", (placeholder) => {
    cy.get(`[placeholder="${placeholder}"]`);
});
