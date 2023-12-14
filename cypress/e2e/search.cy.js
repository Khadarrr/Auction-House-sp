describe('Search Listings', () => {
    it('should search listings after opening the avatar dropdown', () => {
      cy.visit('https://auctionsphere.netlify.app/');
  
      // Click on the avatar dropdown to open it
      cy.get('.dropdown-end.avatar').click();
  
      // Click on the "Listings" link in the avatar dropdown
      cy.contains('Listings').click();
  
      // Wait for the Listings page to load (adjust the URL or content check based on your application)
      cy.url().should('include', '/listings');
    
  
      // Scroll to the navigation bar to make the search input visible
      cy.scrollTo('top');
  
      // Type into the search input on the Listings page
      const searchTerm = 'test'; // Replace with the actual search term
      cy.get('input[type="text"]').clear().type(searchTerm);
  
    
    
    });
  });
  