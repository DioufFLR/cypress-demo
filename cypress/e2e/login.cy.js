function login(user, pass) {
    cy.get('#username').type(user)
    cy.get('#password').type(pass, {log : false})
    cy.get('button[type="submit"]').click()
}

describe('Login', () => {
    beforeEach(() => {
        cy.visit('https://the-internet.herokuapp.com/login')
    })

    afterEach(() => {
        const testName = Cypress.currentTest.title
        cy.screenshot(testName)
    })

    it('succès -> redirection et message', () => {

        login('tomsmith', 'SuperSecretPassword!')

        cy.url().should('include', '/secure')
        cy.get('#flash')
            .should('be.visible')
            .and('contain', 'You logged into a secure area!')
    })

    it('erreur -> mauvais mot de passe', () => {

        login('tomsmith', 'MauvaisMotDePasse!')

        cy.url().should('include', '/login')
        cy.get('#flash')
            .should('be.visible')
            .and('contain', 'Your password is invalid!')
    })

    it('erreur -> mauvais username', () => {

        login('MauvaisUsername', 'SuperSecretPassword!')

        cy.url().should('include', '/login')
        cy.get('#flash')
            .should('be.visible')
            .and('contain', 'Your username is invalid!')
    })
})