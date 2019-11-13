import {
  initializeServerAndNavigateTo,
  generateRandomUpperCaseLetters,
  randomHDDCapGenerator,
  randomDeviceChoice
} from '../support/testConfig'
import routes from '../../src/projectData/routes'
import apiEndpoints from '../../src/projectData/apiEndpoints'

const { deleteDevice, getDevices, updateDevice, postDevice } = apiEndpoints

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
    const randomValidName = generateRandomUpperCaseLetters()
    const randomValidCap = randomHDDCapGenerator()
    const randomDevice = randomDeviceChoice()
    cy.server()
    cy.route('PUT', `${updateDevice}/**`).as('updateDevice')

    // Change the system name field
    cy.get('[name="o__crud-form__input__system_name"]')
      .clear()
      .type(randomValidName)
    // Change the system hdd capacity
    cy.get('[name="o__crud-form__input__hdd-capacity"]')
      .clear()
      .type(randomValidCap)
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
        expect($el[0].innerHTML).to.equal(randomValidName)
      })
    // Validate HDD capacity change
    cy.get('.o__device-card')
      .first()
      .find('.a__content-label__hdd_capacity')
      .then($el => {
        const numericHDD = parseInt($el[0].innerHTML.match(/^(\d)+/))
        expect(numericHDD).to.equal(randomValidCap)
      })
  })
})

describe('Validates DELETE', () => {
  before(() => initializeServerAndNavigateTo(routes.home))
  it('Home page is rendered and API works', () => {
    cy.url().should('include', routes.home)
    cy.wait('@getDevices')
  })
  it('Saves the initial number of devices, deletes the first item and compares with the new number of devices', () => {
    // Initialize server
    cy.server()
    cy.route('DELETE', `${deleteDevice}/*`).as('deleteDevice')

    // Get card count, save it and click on the first card
    let initialNumCards
    cy.get('.o__device-card')
      .should('be.visible')
      .then($cards => {
        initialNumCards = $cards.length
        expect(initialNumCards).to.be.greaterThan(0)
      })
      .first()
      .click()
    // Verify that it navigated to the edit page
    cy.url().should('contain', routes.edit)
    cy.get('.p__crud-page')
      .children('button')
      .should('be.visible')
      .and('have.length', 1)
      .click()
    // Confirm delete item
    cy.get('.o__confirm-modal__container__button-box')
      .children('button')
      .eq(1)
      .should('be.visible')
      .and('have.length', 1)
      .click()
    // Wait for server resposne and acknowledge delete success
    cy.wait('@deleteDevice')
    cy.get('.o__notify-modal__button')
      .children('button')
      .should('be.visible')
      .click()
    // Expect automatic navigation to homepage
    cy.url().should('contain', routes.home)
    // Get number of cards and compare it to the previous amount to make sure one was removed
    cy.get('.o__device-card')
      .should('be.visible')
      .then($cards => {
        expect($cards.length).to.be.lessThan(initialNumCards)
      })
  })
})

describe('Test device creation', () => {
  before(() => {
    initializeServerAndNavigateTo(routes.home)
  })

  it('Home page is rendered and API works', () => {
    cy.url().should('include', routes.home)
    cy.wait('@getDevices')
  })

  it('Navigates to create device page', () => {
    cy.get('.m__link-button')
      .find('button')
      .should('be.visible')
      .and('have.length', 1)
      .click()
    cy.url().should('contain', routes.add)
  })

  it('Populates new data to create device form and sends request', () => {
    // Generate random values for form fields
    const randomValidName = generateRandomUpperCaseLetters()
    const randomValidCap = randomHDDCapGenerator()
    const randomDevice = randomDeviceChoice()

    cy.server()
    cy.route('POST', postDevice).as('postDevice')
    cy.route('GET', getDevices).as('getDevices')

    // Change the system name field
    cy.get('[name="o__crud-form__input__system_name"]').type(randomValidName)
    // Change the system hdd capacity
    cy.get('[name="o__crud-form__input__hdd-capacity"]').type(randomValidCap)
    // Change the system type
    cy.get('[name="o__crud-form__input__type"]').select(randomDevice)

    // Send the POST request
    cy.get('[type="submit"]')
      .should('have.length', 1)
      .click()
    // Wait for request response and hit OK in modal
    cy.wait('@postDevice')
    cy.get('.o__notify-modal__button')
      .children('button')
      .should('be.visible')
      .click()

    cy.wait('@getDevices')
    cy.url().should('contain', routes.home)

    // Search the loaded devices to see if the newly created device exists
    cy.get('.a__content-label__system_name').contains(randomValidName)
  })
})
