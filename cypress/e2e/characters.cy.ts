import characters from '../fixtures/characters.json';

describe('Characters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display a list of twenty characters', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character', characters).as('characters');

    cy.get('[data-cy="character"]').should('have.length', characters.results.length);
  });

  it('Should show an error when it fails to fetch the list of twenty characters', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character', {
      statusCode: 404,
    }).as('error');

    cy.contains('Hubo un error y no se pudieron cargar los personajes');
  });
});
