Cypress.Commands.add('loginToAuth0', (username, password) => {
  const log = Cypress.log({
    displayName: 'AUTH0 LOGIN',
    message: [`🔐 Authenticating | ${username}`],
    // @ts-ignore
    autoEnd: false,
  })
  log.snapshot('before')

  cy.session(
    `auth0-${username}`,
    () => {
      loginViaAuth0Ui(username, password)
    },
    {
      validate: () => {
        // Validate presence of access token in localStorage.
        cy.wrap(localStorage)
          .invoke('getItem', 'authAccessToken')
          .should('exist')
      },
    }
  )

  log.snapshot('after')
  log.end()
})