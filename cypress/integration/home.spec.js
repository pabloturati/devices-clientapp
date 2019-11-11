import { initializeViewAndNavigateTo } from '../support/testConfig'
import routes from '../../src/projectData/routes'

describe('Visit Root (Home page)', () => {
  before(() => initializeViewAndNavigateTo(routes.home))
  it('Home page is rendered', () => {
    cy.url().should('include', routes.home)
  })
  it('Contains header', () => {
    cy.get('header')
      .should('be.visible')
      .and('has.length', 1)
      .and('have.class', 'o__header')
  })
  it('Header must contain logo, button and title', () => {
    cy.get('header')
      .children()
      .should('have.length', 2)
    cy.get('header')
      .children()
      .first()
      .should('have.class', 'o__header__titles')
      .and('have.length', 1)
    cy.get('.o__header__titles').should('have.length', 1)
    cy.get('.o__header__titles')
      .children('a')
      .should('have.length', 1)
    cy.get('div.o__header__titles').should($child => {
      expect(
        $child
          .children('a')
          .first()
          .children()
      ).to.have.length(1)
    })
  })
})
