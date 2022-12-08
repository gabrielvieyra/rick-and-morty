import characters02 from '../fixtures/characters02.json';
import characters03 from '../fixtures/characters03.json';

describe('Pagination', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('The previous button should be disabled', () => {
    cy.get('[data-type="prev"]')
      .should('have.css', 'opacity', '0.5')
      .should('have.css', 'cursor', 'not-allowed');
  });

  it('The page should display the following twenty characters when press the button next', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character?page=2', characters02).as(
      'characters02'
    );

    cy.get('[data-type="next"]').click();
  });

  it('With the select should  be able to choose to go to a page and see a new list of twenty characters', () => {
    cy.intercept('GET', 'https://rickandmortyapi.com/api/character?page=9', characters03).as(
      'characters03'
    );

    cy.get('[name="goTo"]').select('9');
  });
});
