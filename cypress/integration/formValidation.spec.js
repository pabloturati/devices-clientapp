import {
  initializeServerAndNavigateTo,
  generateRandomUpperCaseLetters,
  randomHDDCapGenerator,
  randomDeviceChoice,
  INVALID_SYSTEM_NAME
} from '../support/testConfig'
import routes from '../../src/projectData/routes'
import REGEX from '../../src/projectData/regex'

const clickSubmit = () => {
  cy.get('[type="submit"]')
    .should('be.visible')
    .and('have.length', 1)
    .click()
}

const allErrorsAreHidden = () => {
  // There should be 2 invalid feedback message and they should be hidden
  cy.get('.invalid-feedback').each($field => {
    expect($field).to.not.be.visible
  })
}

const generateInputAliases = () => {
  cy.get('[name="o__crud-form__input__system_name"]').as('device-name')
  cy.get('[name="o__crud-form__input__hdd-capacity"]').as('hdd-cap')
}

describe('Test sending and empty or incomplete form', () => {
  before(() => {
    initializeServerAndNavigateTo(routes.home)
  })

  it('Navigates to create device page', () => {
    cy.get('.m__link-button')
      .find('button')
      .should('be.visible')
      .and('have.length', 1)
      .click()
    cy.url().should('contain', routes.add)
  })

  it('Verifies that fields do not show initally any errors', () => {
    // Input fields should not have the 'is-invalid' class
    generateInputAliases()

    cy.get('@device-name').should('not.have.class', 'is-invalid')
    cy.get('@hdd-cap').should('not.have.class', 'is-invalid')

    // There should be 2 invalid feedback message and they should be hidden
    allErrorsAreHidden()
  })

  it('Tests sending an empty form', () => {
    // Click on submit
    clickSubmit()
    generateInputAliases()

    // Form should not navigate anywhere
    cy.url().should('contain', routes.add)

    // There must be errors in the
    cy.get('@device-name').should('have.class', 'is-invalid')
    cy.get('@hdd-cap').should('have.class', 'is-invalid')

    // There should be 2 invalid feedback message and they should be visible
    cy.get('.invalid-feedback')
      .should('have.length', 2)
      .each($field => {
        expect($field).to.be.visible
      })
  })

  it('Fills in just the system name input and tries sending the form', () => {
    const randomValidName = generateRandomUpperCaseLetters()

    generateInputAliases()
    cy.get('@device-name')
      .clear()
      .type(randomValidName)

    cy.get('@hdd-cap')
      .should('have.length', 1)
      .clear()

    clickSubmit()

    // Form should not navigate anywhere
    cy.url().should('contain', routes.add)

    // Verify system name field does not show error
    cy.get('@device-name').should('not.have.class', 'is-invalid')
    // Verify hdd cap field shows error
    cy.get('@hdd-cap').should('have.class', 'is-invalid')
    // There should be 2 invalid feedback message but only the second one must be visible
    cy.get('.invalid-feedback')
      .should('have.length', 2)
      .should($field => {
        expect($field.first()).to.not.be.visible
        expect($field.eq(1)).to.be.visible
      })
  })
  it('Fills in just the hdd capacity input and tries sending the form', () => {
    initializeServerAndNavigateTo(routes.add)
    generateInputAliases()

    const randomValidCap = randomHDDCapGenerator()
    cy.get('@device-name').clear()

    cy.get('@hdd-cap')
      .should('have.length', 1)
      .clear()
      .type(randomValidCap)

    clickSubmit()

    // Form should not navigate anywhere
    cy.url().should('contain', routes.add)

    // Verify system name field does not show error
    cy.get('@device-name').should('have.class', 'is-invalid')
    // Verify hdd cap field shows error
    cy.get('@hdd-cap').should('not.have.class', 'is-invalid')
    // There should be 2 invalid feedback message but only the first one must be visible
    cy.get('.invalid-feedback')
      .should('have.length', 2)
      .should($field => {
        expect($field.first()).to.be.visible
        expect($field.eq(1)).to.not.be.visible
      })
  })
})

describe('Test input validity', () => {
  before(() => {
    initializeServerAndNavigateTo(routes.home)
  })

  it('Navigates to create device page', () => {
    cy.get('.m__link-button')
      .find('button')
      .should('be.visible')
      .and('have.length', 1)
      .click()
    cy.url().should('contain', routes.add)
  })

  it('Verifies that fields do not show initally any errors', () => {
    generateInputAliases()

    // Input fields should not have the 'is-invalid' class
    cy.get('@device-name').should('not.have.class', 'is-invalid')
    cy.get('@hdd-cap').should('not.have.class', 'is-invalid')
    // Verifies that there are no error messages
    allErrorsAreHidden()
  })

  it('Adds invalid content to the fields', () => {
    generateInputAliases()

    // Generate random valid values for form fields
    const randomValidName = generateRandomUpperCaseLetters()
    const randomValidCap = randomHDDCapGenerator()
    const randomDevice = randomDeviceChoice()

    // Generate random values for form fields
    const randomInvalidName = randomValidName.toLowerCase()

    // Tests an invalid char string followed by a number string for validity.
    const randomInvalidValidCap = `${randomValidName}${randomValidCap}`

    // Randomly select a system type
    cy.get('[name="o__crud-form__input__type"]').select(randomDevice)

    // Set the first invalid system name. It should match the regex for validity.
    cy.get('@device-name').type(randomInvalidName)
    cy.get('@device-name')
      .invoke('val')
      .should('match', REGEX.deviceName)

    // Set the second invalid system name. It should match the regex for validity.
    cy.get('@device-name')
      .clear()
      .type(INVALID_SYSTEM_NAME)
    cy.get('@device-name')
      .invoke('val')
      .should('match', REGEX.deviceName)

    // Change the system hdd capacity
    cy.get('@hdd-cap')
      .type(randomValidCap)
      .clear()
      .type(randomInvalidValidCap)

    cy.get('@hdd-cap')
      .invoke('val')
      .should('match', REGEX.numbers)
  })
})
