describe('UserView Component', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
        statusCode: 200,
        fixture: 'sampleRandomCards',
      }).as('fetchRandom');
      cy.wait('@fetchRandom'); 
      //login flow placeholder
      cy.get('#profile').should('be.visible');
      cy.get('.favoriteButton').click();
      cy.get('.saveButton').click();
      cy.get('#profile').click();
      cy.visit('http://localhost:3000/Profile');
    });
  
    it('Loads page content properly', () => {
      cy.get('.filter-buttons').should('be.visible');
      cy.get('.filter-buttons').should('have.descendants', 'button');
      // cy.get('.article').should('be.visible');
    });
  
    it('Shows all saved controversies on profile page load', () => {
      cy.get('.card-content').should('be.visible');
      cy.get('h2').should('contain', '//fixture');
      cy.get('p').should('contain', '//fixture');
    });
  
    it('Should show favorited cards', () => {
      cy.get('');
    });
  
    it('Should return to show all saved', () => {
      cy.get('');
    });
  
    it('Should return to the main page on header click', () => {
      cy.get('');
      cy.get('').click();
    })
  });