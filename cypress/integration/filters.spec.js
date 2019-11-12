import { initializeServerAndNavigateTo } from '../support/testConfig'
import routes from '../../src/projectData/routes'
import DEVICE_TYPES from '../../src/projectData/deviceTypes'

const { windows, winServer, mac } = DEVICE_TYPES
const numberRegEx = new RegExp(/[0-9]+/)

/** Function to open dropdown and select a given choice.
 *  @function
 *  @param {integer} filer - 0 = Device type filter. 1 = Sort filter.
 *  @param {integer} choice - Dropdown choice number starting from 0.
 **/
const openDropDownAndSelect = (filter, choice) => {
  // Open dropdown
  cy.get('@filters')
    .eq(filter)
    .should('have.length', 1)
    .click()
  // Select choice
  cy.get('body')
    .find('.MuiListItem-button')
    .eq(choice)
    .click()
}
const initilizePage = () => {
  initializeServerAndNavigateTo(routes.home)
  cy.wait('@getDevices')
  cy.get('div.o__controls__drop-container')
    .as('filter-container')
    .children()
    .as('filters')
  cy.get('div.o__controls')
    .children('button')
    .as('clear-button')
}

describe('Verify Operating system filter functionality', () => {
  before(initilizePage)
  beforeEach(() => {
    cy.get('div.o__controls__drop-container')
      .as('filter-container')
      .children()
      .as('filters')
    cy.get('div.o__controls')
      .children('button')
      .as('clear-button')
  })

  it('Verifies that there are two filters and one clear filter button', () => {
    cy.get('@filters')
      .children()
      .should('have.length', 2)
    cy.get('@clear-button')
      .should('have.length', 1)
      .and('have.class', 'a__base-button')
  })

  it('Test if filter selects Mac only', () => {
    openDropDownAndSelect(0, 1)
    cy.get('.a__content-label__type').each($element => {
      expect($element[0].innerHTML).to.be.equal(mac.type)
    })
  })
  it('Test if filter selects Windows PC only', () => {
    openDropDownAndSelect(0, 2)
    cy.get('.a__content-label__type').each($element => {
      expect($element[0].innerHTML).to.be.equal(windows.type)
    })
  })
  it('Test if filter selects Windows Server only', () => {
    openDropDownAndSelect(0, 3)
    cy.get('.a__content-label__type').each($element => {
      expect($element[0].innerHTML).to.be.equal(winServer.type)
    })
  })
})

describe('Verify sort system filter functionality', () => {
  beforeEach(initilizePage)

  it('Verifies that sort by system name works', () => {
    openDropDownAndSelect(1, 1)
    cy.get('.a__content-label__system_name').each(($el, index, $list) => {
      if (index > 0) {
        expect($el[0].innerHTML).to.be.greaterThan($list[index - 1].innerHTML)
      }
    })
  })
  it('Verifies that sort by highest HDD capacity works', () => {
    openDropDownAndSelect(1, 2)
    cy.get('.a__content-label__hdd_capacity').each(($el, index, $list) => {
      if (index > 0 && $el[0].innerHTML !== $list[index - 1].innerHTML) {
        const firstVal = parseInt(
          $list[index - 1].innerHTML.match(numberRegEx)[0]
        )
        const secondValue = parseInt($el[0].innerHTML.match(numberRegEx)[0])
        expect(secondValue).to.be.lessThan(firstVal)
      }
    })
  })
  it('Verifies that sort by lowest HDD capacity works', () => {
    openDropDownAndSelect(1, 3)
    cy.get('.a__content-label__hdd_capacity').each(($el, index, $list) => {
      if (index > 0 && $el[0].innerHTML !== $list[index - 1].innerHTML) {
        const firstVal = parseInt(
          $list[index - 1].innerHTML.match(numberRegEx)[0]
        )
        const secondValue = parseInt($el[0].innerHTML.match(numberRegEx)[0])
        expect(firstVal).to.be.lessThan(secondValue)
      }
    })
  })
  it('Verifies that the clear filter button works', () => {
    // Filters should initially be set to 'All' and 'None'
    cy.get('.MuiInputBase-inputSelect').each($el => {
      expect($el[0].innerHTML).to.match(/^(All|None)+/)
    })

    // Opens dropdown to random
    openDropDownAndSelect(0, Math.floor(Math.random() * 3) + 1)
    openDropDownAndSelect(1, Math.floor(Math.random() * 3) + 1)

    // Assert filter values changed
    cy.get('.MuiInputBase-inputSelect').each($el => {
      expect($el[0].innerHTML).to.not.match(/^(All|None)+/)
    })

    // Click on the filter button
    cy.get('.o__controls button')
      .should('have.length', 1)
      .click()

    // Assert filter values are back to initial
    cy.get('.MuiInputBase-inputSelect').each($el => {
      expect($el[0].innerHTML).to.match(/^(All|None)+/)
    })
  })
})
