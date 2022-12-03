describe('Pagination', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('The page should display the following characters', () => {
    cy.get('[data-type="next"]').click();
  });

  it('The page should display the previous characters', () => {
    cy.get('[data-type="next"]').click();
    cy.get('[data-type="prev"]').click();
  });
});
