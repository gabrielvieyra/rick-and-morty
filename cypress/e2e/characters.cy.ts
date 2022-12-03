describe('Characters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display twenty characters', () => {
    cy.intercept({
      method: 'GET',
      url: 'https://rickandmortyapi.com/api/character',
    }).as('getCharacters');
    cy.wait('@getCharacters').its('response.body.results').should('have.length', 20);
  });
});
