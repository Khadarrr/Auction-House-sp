describe('Create Listing Journey', () => {
    it('should log in, access the profile page, and create a listing', () => {
      // Visit the site and log in
      cy.visit('https://auctionsphere.netlify.app/');
      cy.contains('Get Started').click();
      cy.get('input[name="email"]').clear().type('kshireee@stud.noroff.no');
      cy.get('input[name="password"]').type('slime123123');
      cy.get('button[type="submit"]').click();
      cy.url().should('include', '/');
  
      // Click on the avatar dropdown to open it
      cy.get('.dropdown-end.avatar').click();
  
      // Click on the "Profile" link in the avatar dropdown
      cy.contains('Profile').click();
  
      // Click on the "Create Auction" button on the profile page to open the modal
      cy.get('button:contains("Create Auction")').click();
  
      // Wait for the modal to be visible and interact with it
      cy.get('.your-modal-selector').should('be.visible');
      
      // Fill out the modal fields
      cy.get('input[name="title"]').type('Test Listing');
      cy.get('textarea[name="description"]').type('This is a test listing description.');
      cy.get('input[name="startingPrice"]').type('10');
      cy.get('input[name="endDate"]').type('2023-12-31');
      // Add any other necessary input fields
  
      // Submit the modal
      cy.get('button[type="submit"]').click();
  
      // Wait for the listing to be created and assert success message or navigate to the created listing page
      cy.contains('Listing created successfully.').should('be.visible');
      // Alternatively, you can navigate to the created listing page using its URL or other identifiers.
    });
  });
  