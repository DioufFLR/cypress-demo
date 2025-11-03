describe('Formulaire de démo Cypress', () => {
    it('remplit le champ et vérifie la valeur', () => {
        cy.visit('https://example.cypress.io/commands/actions')

        // On cible un champ de texte
        cy.get('#email1')
            .type('diouf@test.com')
            .should('have.value', 'diouf@test.com')
    })
})