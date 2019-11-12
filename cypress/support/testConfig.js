import apiEndpoints from '../../src/projectData/apiEndpoints'
import DEVICE_TYPES from '../../src/projectData/deviceTypes'

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
  cy.route('GET', apiEndpoints.getDevices).as('getDevices')
}

export const initializeViewAndNavigateTo = route => {
  cy.viewport(viewport)
  navigateTo(route)
}

export const initializeServerAndNavigateTo = route => {
  initializeViewAndServer()
  navigateTo(route)
}

/**
 * Random string generator
 * @function
 * @returns {string} - Random uppercase letters only string with lenght of up to 36 characters
 */

export const generateRandomUpperCaseLetters = () => {
  return Math.random()
    .toString(36)
    .replace(/[^A-Za-z]+/g, '')
    .toUpperCase()
}

/**
 * Random string generator
 * @function
 * @returns {string} - Random letters only string with lenght of up to 36 characters
 */

export const randomHDDCapGenerator = () => {
  return Math.floor(Math.random() * (50000 - 1))
}

/**
 * Random device choice
 * @function
 * @returns {string} - Random select choice
 */

export const randomDeviceChoice = () => {
  const deviceArray = Object.values(DEVICE_TYPES).map(device => device.type)
  const randomIndex = Math.floor(Math.random() * deviceArray.length)
  return deviceArray[randomIndex]
}
