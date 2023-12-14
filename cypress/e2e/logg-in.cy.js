describe('Login User Journey', () => {
  it('should log in through the "Get Started" button on the homepage', () => {
    cy.visit('https://auctionsphere.netlify.app/');

    // Click on the "Get Started" button on the homepage
    cy.contains('Get Started').click();

    // Perform login actions here
    // Clear the existing content inside the email input and type new values
    cy.get('input[name="email"]').clear().type("kshireee@stud.noroff.no");
    cy.get('input[name="password"]').type("slime123123");
    cy.get('button[type="submit"]').click();

  

  });
});
