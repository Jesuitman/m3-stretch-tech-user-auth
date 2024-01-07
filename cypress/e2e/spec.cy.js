// Need to login before testing
describe('API Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Fetches and displays Wikipedia page contents', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 200,
      fixture: 'wikipediaApiResponse',
    }).as('fetchContents');
    cy.wait('@fetchContents').then(({ response }) => {
      expect(response.statusCode).to.equal(200);
    });
    cy.contains('Loading...').should('not.exist');
    cy.contains('An error occurred').should('not.exist');
  });

  it('Handles error when API fails', () => {
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 500,
      body: 'Server Error',
      delayMs: 200,
    }).as('fetchError'); 
    cy.wait('@fetchError').then(({ response }) => {
      expect(response.statusCode).to.equal(500);
    cy.contains('An error occurred').should('exist');
    });
  });
});

describe('App Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 200,
      fixture: 'sampleRandomCards',
    }).as('fetchRandom');
    cy.wait('@fetchRandom');
  });

  it('Loads the app properly', () => {
    cy.get('.header-text').should('be.visible');
    cy.get('.button__login').should('be.visible');
    cy.get('.random-headline').should('be.visible');
  });

  it('Displays random controversies', () => {
    cy.get('.result-name').should('contain', '//fixture');
    cy.get('.random-headline').should('contain', 'Random Controversy');
    cy.get('.card').should('be.visible');
    cy.get('.card')
      .children()
      .first()
      .within(() => {
        cy.contains('h2', '//fixture');
        cy.contains('p', '//fixture');
        cy.contains('button', '😡Save Controversy😡');
        cy.contains('button', '🤬Save as favorite controversy🤬');
      });
  });

  //code from a cypress/auth0 tutorial
  describe('Auth0', function () {
    beforeEach(function () {
      cy.task('db:seed');
      cy.intercept('POST', '/graphql').as('createUserAccount');
      cy.loginToAuth0(
        Cypress.env('auth0_username'),
        Cypress.env('auth0_password')
      )
      cy.visit('/');
    })
  
    it('shows onboarding', function () {
      cy.contains('Get Started').should('be.visible');
    })
  })
});

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

describe('Card Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.intercept('GET', 'https://en.wikipedia.org/w/api.php?', {
      statusCode: 200,
      fixture: 'sampleRandomCards',
    }).as('fetchRandom');
    cy.wait('@fetchRandom'); 
  })

  it('Renders snippet properly', () => {
    cy.get('.card-content').should('be.visible');
    cy.get('h2').should('contain', '//fixture');
    cy.get('p').should('contain', '//fixture');
  });

  it('Handles show more/show less functionality', () => {

  });
});

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