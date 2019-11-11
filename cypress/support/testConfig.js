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
}

export const initializeViewAndNavigateTo = route => {
  cy.viewport(viewport)
  navigateTo(route)
}

export const initializeServerAndNavigateTo = route => {
  initializeViewAndServer()
  navigateTo(route)
}
