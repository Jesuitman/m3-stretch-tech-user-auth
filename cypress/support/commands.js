Cypress.Commands.add('loginToAuth0', (username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    autoEnd: false,
  });
  log.snapshot('before');

  const auth0Domain = Cypress.env('auth0_domain');
  const clientId = Cypress.env('auth0_client_id');
  const redirectUri = encodeURIComponent('http://localhost:3000/');
  const scope = encodeURIComponent('openid profile email');
  const state = '1234'; // Should be dynamically generated in a real app

  cy.session(`auth0-${username}`, () => {
    const authUrl = `${auth0Domain}/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`;
    cy.visit(authUrl);

    cy.origin(auth0Domain, { args: { username, password } }, ({ username, password }) => {
      cy.get('input[name="username"]').type(username);
      cy.get('input[name="password"]').type(password);
      cy.get('button[data-action-button-primary="true"]').click();
    });
  });

  log.snapshot('after');
  log.end();
});