describe('Test our Form Input', function() {
    this.beforeEach(function() {
        cy.visit('http://localhost:3001/')
    })

    it('Check if Form is working', function() {
        // Check in Name
        cy.get('[data-cy="name"]')
        .type('Anthony')
        .should("have.value", "Anthony");
        // Check in Email
        cy.get('[data-cy="email"]')
        .type('email@email.com')
        .should("have.value", "email@email.com");
        // Check the password
        cy.get('[data-cy="password"]')
        .type('Password')
        .should('have.value', 'Password');
        // Check the check box
        cy.get('[type="checkbox"]')
        .check().should('be.checked');
        //check submit button
        cy.contains('Submit')
        .click();
    })
})