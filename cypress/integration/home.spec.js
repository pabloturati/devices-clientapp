import { initializeViewAndNavigateTo } from '../support/testConfig'
import routes from '../../src/projectData/routes'

describe('Visit Root (Home page)', () => {
  before(() => initializeViewAndNavigateTo(routes.home))
  it('Home page is rendered', () => {
    cy.url().should('include', routes.home)
  })
  // it('Contains "description" section', () => hasDescriptionSection)
  // it('contains hero', () => {
  //   cy.get('div.p__home__title__box')
  //     .and('is.visible')
  //     .and('has.length', 1)
  // })
  // it('Contains card module', hasStackCardModule)
})
