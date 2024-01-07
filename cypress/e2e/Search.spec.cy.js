describe('Can search for a Controversy', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/');
      cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
        statusCode: 200,
        fixture: 'sampleRandomCards',
      }).as('fetchRandom');
      cy.wait('@fetchRandom');    
      //placeholder for login flow
      cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
        statusCode: 200,
        fixture: 'wikipediaApiResponse',
      }).as('fetchContents');
      cy.wait('@fetchContents');
    });
  
    it('Searches for a term, then clears input', () => {
      cy.get('input[type="text"]').should('be.visible');
      cy.get('input[type="text"]').type('SearchTerm{enter}');
      cy.get('input[type="text"]').should('have.text', 'SearchTerm');
    });
  
    it('Displays controversies for a search result', () => {
      cy.get('.card').should('be.visible');
      cy.get('.result-name').should('contain', '');
      cy.get('.results-list')
        .children()
        .first()
        .within(() => {
          cy.contains('h2', '//fixture');
          cy.contains('p', '//fixture');
          cy.contains('button', '😡Save Controversy😡');
          cy.contains('button', '🤬Save as favorite controversy🤬');
        });
        cy.get('.results-list')
          .children()
          .last()
          .within(() => {
            cy.contains('h2', '//fixture');
            cy.contains('p', '//fixture');
            cy.contains('button', '😡Save Controversy😡');
            cy.contains('button', '🤬Save as favorite controversy🤬');
          });
    });
  });