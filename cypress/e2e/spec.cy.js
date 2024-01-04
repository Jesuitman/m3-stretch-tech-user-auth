describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('App Component', () => {
  it('Loads the app properly', () => {
    cy.visit('/'); 
    cy.get('.header-text').should('be.visible');
    cy.get('.login-button').should('be.visible');
  });

  it('Displays footer controversies', () => {
    cy.visit('/');
    cy.get('.footer-card').should('be.visible');
    cy.get('.footer-text').should('contain', 'Random Controversy');
  });
});

describe('Wikipedia Search Component', () => {
  it('Searches for a term', () => {
    cy.visit('/');
    cy.get('input[type="text"]').type('SearchTerm{enter}');
  });

  it('Displays controversies for a search result', () => {
    cy.visit('/');
  });
});

describe('Card Component', () => {
  it('Renders snippet properly', () => {
    cy.visit('/');
    cy.get('.card-content').should('be.visible');
  });

  it('Handles show more/show less functionality', () => {
    cy.visit('/');
  });
});

describe('WikipediaPage Component', () => {
  it('Loads page content properly', () => {
    cy.visit('/article/PageTitle'); 
    cy.get('.article').should('be.visible');
  });

  it('Saves controversy properly', () => {
    cy.visit('/article/PageTitle'); 
  });
});