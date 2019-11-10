// Testing viewport
const viewport = 'iphone-6'

/**
 * Navigates the robot to the given route
 * @function
 * @param {*} route
 * @param {*} verifyCallback
 */

export const navigateTo = (route, verifyCallback) => {
  cy.visit(route)
  cy.url().should('include', route)
  if (verifyCallback) verifyCallback()
}

export const initializeViewAndServer = () => {
  cy.viewport(viewport)
  // cy.server()
  // cy.route(`${API_URL}global`).as('getApiGlobal')
  // cy.route(`${API_URL}website`).as('getApiWebsite')
  // cy.route('POST', `${API_URL}${API_ROUTES.registerBrand}`).as('registerBrand')
  // cy.route('POST', `${API_URL}${API_ROUTES.registerAgency}`).as(
  //   'registerAgency'
  // )
  // cy.route('PUT', `${API_URL}${API_ROUTES.updateAgencyRegister}/**`).as(
  //   'updateRegisterAgency'
  // )
  // cy.route('POST', `${API_URL}${API_ROUTES.influencers}`).as(
  //   'registerInfluencer'
  // )
  // cy.route(`${API_URL}${API_ROUTES.tiers}`).as('getTiers')
  // cy.route(`${API_URL}${API_ROUTES.profile}`).as('getProfile')
}

export const initializeViewAndNavigateTo = route => {
  cy.viewport(viewport)
  navigateTo(route)
}

export const initializeServerAndNavigateTo = route => {
  initializeViewAndServer()
  navigateTo(route)
}
