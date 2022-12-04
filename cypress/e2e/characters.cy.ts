import characters from '../fixtures/characters.json';

describe('Characters', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should display a list of twenty characters', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character', characters);

    cy.get('[data-cy="character"]').should('have.length', characters.results.length);
  });
});
