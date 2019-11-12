import { initializeServerAndNavigateTo } from '../support/testConfig'
import routes from '../../src/projectData/routes'

describe('Visit Root (Home page)', () => {
  before(() => {
    initializeServerAndNavigateTo(routes.home)
  })
  it('Home page is rendered and API works', () => {
    cy.url().should('include', routes.home)
    cy.wait('@getDevices')
  })
  it('Contains header', () => {
    cy.get('header')
      .should('be.visible')
      .and('has.length', 1)
      .and('have.class', 'o__header')

    cy.get('header')
      .children()
      .should('have.length', 2)
    cy.get('header')
      .children()
      .first()
      .should('have.class', 'o__header__titles')
  })
  it('Header must contain link logo', () => {
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
    cy.get('div.o__header__titles')
      .children()
      .should($child => {
        expect($child.first()).to.have.attr('href', routes.home)
        expect(
          $child
            .first()
            .children()
            .first()
        )
          .to.have.length(1)
          .and.to.have.attr('src')
      })
  })
  it('Checks if there is a button to add a Device and it works', () => {
    cy.get('a.m__link-button')
      .as('link-button')
      .should('be.visible')
      .and('have.length', 1)
    cy.get('@link-button').should('have.attr', 'href', routes.add)
    cy.get('@link-button')
      .children()
      .should('have.length', 1)
    cy.get('@link-button').should('contain', 'Add')
    cy.get('@link-button').click()
    cy.url().should('include', routes.add)
  })
})
