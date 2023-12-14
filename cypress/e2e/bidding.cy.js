describe('Bidding Journey', () => {
    it('should log in through the "Get Started" button on the homepage and make a final bid', () => {
      cy.visit('https://auctionsphere.netlify.app/');
  
      // Click on the "Get Started" button on the homepage
      cy.contains('Get Started').click();
  
      // Perform login actions here
      cy.get('input[name="email"]').clear().type("kshireee@stud.noroff.no");
      cy.get('input[name="password"]').type("slime123123");
      cy.get('button[type="submit"]').click();
  
      // Wait for the login to complete
      cy.url().should("include", "/");
  
      // Scroll down multiple times to make sure the bid card is visible
      cy.scrollTo('bottom');
      cy.scrollTo('bottom');
      cy.scrollTo('bottom');
    
      // Find the bid button on the card and click it
      cy.get('.card-actions button.btn-primary').first().click();
  
      // Handle the bid amount input
      const bidAmount = '1'; // Replace with the actual bid amount
      cy.get('.bid-input-container input[type="text"]').type(bidAmount);
  
      // Press the "Final Bid" button
      cy.get('.bid-input-container button.btn-ghost').click();
  

    });
  });
  