describe('Can search for a Controversy', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/w/api.php?action=query&list=search**', { fixture: 'initialSearch.json' }).as('initialSearch');
        cy.intercept('GET', '**/w/api.php?action=parse&prop=sections**', { fixture: 'sectionsRequest.json' }).as('sectionsRequest');
        cy.intercept('GET', '**/w/api.php?action=parse&format=json**', { fixture: 'controversiesRequest.json' }).as('controversiesRequest');
    
        cy.visit('http://localhost:3000/');
        cy.wait('@initialSearch');
        cy.wait('@sectionsRequest');
        cy.wait('@controversiesRequest');
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