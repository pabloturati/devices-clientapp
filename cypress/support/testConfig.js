import apiEndpoints from '../../src/projectData/apiEndpoints'

const { getDevices, postDevice, deleteDevice, updateDevice } = apiEndpoints

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
  cy.server()
  cy.route('GET', getDevices).as('getDevices')
  cy.route('POST', postDevice).as('postDevice')
  cy.route('DELETE', deleteDevice).as('deleteDevice')
  cy.route('PUT', updateDevice).as('updateDevice')
}

export const initializeViewAndNavigateTo = route => {
  cy.viewport(viewport)
  navigateTo(route)
}

export const initializeServerAndNavigateTo = route => {
  initializeViewAndServer()
  navigateTo(route)
}
