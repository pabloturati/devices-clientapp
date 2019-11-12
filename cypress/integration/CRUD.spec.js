import {
  initializeServerAndNavigateTo,
  generateRandomUpperCaseLetters,
  randomHDDCapGenerator,
  randomDeviceChoice
} from '../support/testConfig'
import routes from '../../src/projectData/routes'
import apiEndpoints from '../../src/projectData/apiEndpoints'

// GET all Devices Tests
describe('Test data request contains devices in homepage, cards navigate to edit device and edit device updates cards', () => {
  before(() => initializeServerAndNavigateTo(routes.home))
  it('Home page is rendered and API works', () => {
    cy.url().should('include', routes.home)
    cy.wait('@getDevices')
  })

  it('Verifies a list of Devices was received and has length > 0', () => {
    cy.get('.o__device-card').then($cards => {
      expect($cards.length).to.be.greaterThan(0)
    })
  })

  it('Test if the first Device link routes to the edit page', () => {
    cy.get('.o__device-card')
      .first()
      .should('have.length', 1)
      .click()
    cy.url().should('contain', routes.edit)
  })

  it('Verifies that fields have been pre populated', () => {
    cy.get('.form-control') // System name field
      .first()
      .then($el => {
        expect($el[0].value).to.not.equal('')
      })
    cy.get('.form-control') // HD capacity field
      .eq(1)
      .then($el => {
        expect($el[0].value).to.not.equal('')
      })
  })

  it('Changes the device name and disk capacity', () => {
    // Generate random values for form fields
    const randomName = generateRandomUpperCaseLetters()
    const randomCap = randomHDDCapGenerator()
    const randomDevice = randomDeviceChoice()
    cy.server()
    cy.route('PUT', `${apiEndpoints.updateDevice}/**`).as('updateDevice')

    // Change the system name field
    cy.get('[name="o__crud-form__input__system_name"]')
      .clear()
      .type(randomName)
    // Change the system hdd capacity
    cy.get('[name="o__crud-form__input__hdd-capacity"]')
      .clear()
      .type(randomCap)
    // Change the system type
    cy.get('[name="o__crud-form__input__type"]').select(randomDevice)
    // Send the PUT request
    cy.get('[type="submit"]')
      .should('have.length', 1)
      .click()
    // Wait for request response and hit OK in modal
    cy.wait('@updateDevice')
    cy.get('.o__notify-modal__button')
      .children('button')
      .first()
      .should('have.length', 1)
      .and('be.visible')
      .click()
    // Verify reroute to homepage
    cy.url().should('contains', routes.home)

    // Get the first device card and check if changes were made
    // Validate Device type change
    cy.get('.o__device-card')
      .first()
      .find('.a__content-label__type')
      .then($el => {
        expect($el[0].innerHTML).to.equal(randomDevice)
      })
    // Validate Device name change
    cy.get('.o__device-card')
      .first()
      .find('.a__content-label__system_name')
      .then($el => {
        expect($el[0].innerHTML).to.equal(randomName)
      })
    // Validate HDD capacity change
    cy.get('.o__device-card')
      .first()
      .find('.a__content-label__hdd_capacity')
      .then($el => {
        const numericHDD = parseInt($el[0].innerHTML.match(/^(\d)+/))
        expect(numericHDD).to.equal(randomCap)
      })
  })
})
