import clearInputField from '../support/action/clearInputField'
import clickElement from '../support/action/clickElement'
import closeLastOpenedWindow from '../support/action/closeLastOpenedWindow'
import deleteCookies from '../support/action/deleteCookies'
import dragElement from '../support/action/dragElement'
import eligibleOrganisation from '../page-objects/eligible-organisation'
import focusLastOpenedWindow from '../support/action/focusLastOpenedWindow'
import handleModal from '../support/action/handleModal'
import moveTo from '../support/action/moveTo'
import navigateBack from '../support/action/navigateBack'
import pause from '../support/action/pause'
import pressButton from '../support/action/pressButton'
import scroll from '../support/action/scroll'
import selectOption from '../support/action/selectOption'
import selectOptionByIndex from '../support/action/selectOptionByIndex'
import setCookie from '../support/action/setCookie'
import setInputField from '../support/action/setInputField'
import setPromptText from '../support/action/setPromptText'
import whatFund from '../page-objects/what-fund'
import signIn from '../page-objects/login'


const { When } = require('cucumber')

When(
  /^I click the back button$/,
  navigateBack
)

When(
  /^I (click|doubleclick) on the (link|button|element) "([^"]*)?"$/,
  clickElement
)

When(
  /^I (add|set) "([^"]*)?" to the inputfield "([^"]*)?"$/,
  setInputField
)

When(
  /^I clear the inputfield "([^"]*)?"$/,
  clearInputField
)

When(
  /^I drag element "([^"]*)?" to element "([^"]*)?"$/,
  dragElement
)

When(
  /^I pause for (\d+)ms$/,
  pause
)

When(
  /^I set a cookie "([^"]*)?" with the content "([^"]*)?"$/,
  setCookie
)

When(
  /^I delete the cookie "([^"]*)?"$/,
  deleteCookies
)

When(
  /^I press "([^"]*)?"$/,
  pressButton
)

When(
  /^I (accept|dismiss) the (alertbox|confirmbox|prompt)$/,
  handleModal
)

When(
  /^I enter "([^"]*)?" into the prompt$/,
  setPromptText
)

When(
  /^I scroll to element "([^"]*)?"$/,
  scroll
)

When(
  /^I close the last opened (window|tab)$/,
  closeLastOpenedWindow
)

When(
  /^I focus the last opened (window|tab)$/,
  focusLastOpenedWindow
)

When(
  /^I select the (\d+)(st|nd|rd|th) option for element "([^"]*)?"$/,
  selectOptionByIndex
)

When(
  /^I select the option with the (name|value|text) "([^"]*)?" for element "([^"]*)?"$/,
  selectOption
)

When(
  /^I move to element "([^"]*)?"(?: with an offset of (\d+),(\d+))*$/,
  moveTo
)

When(/^I click on the soil type$/, function () {
  whatFund.clickOnArableSoil()
})

When(/^I click on the continue button$/, async () => {
  signIn.clickOnContinueButton()
})

When(/^I click on organisation start application link$/, async () => {
  eligibleOrganisation.clickOnsbi1()
})

When(/^I click on the application for the "(.*)" organisation$/, async (orgNumber) => {
  switch (orgNumber) {
    case 'first':
      eligibleOrganisation.clickOnsbi1()
      break
    case 'second':
      eligibleOrganisation.clickOnsbi2()
      break
    case 'third':
      eligibleOrganisation.clickOnsbi3()
      break
    case 'Chris Hall':
      eligibleOrganisation.clickOnsbi4()
      break
    case 'Christine Gillott':
      eligibleOrganisation.clickOnsbi5()
      break
    case 'Donald Crofts':
      eligibleOrganisation.clickOnsbi6()
      break
    case 'E THOMPSON & SON':
      eligibleOrganisation.clickOnsbi7()
      break
    case 'Edgar Zoo':
      eligibleOrganisation.clickOnsbi8()
      break
    case 'Mr J G Romeril':
      eligibleOrganisation.clickOnsbi9()
      break
    case 'FALLON, S':
      eligibleOrganisation.clickOnsbi10()
      break
    case 'FJ & LA Poole and Son':
      eligibleOrganisation.clickOnsbi11()
      break
    case 'Farm & Woodland Services':
      eligibleOrganisation.clickOnsbi12()
      break
    default:
      console.error("Unknown org number. Expected 'first' or 'second' or 'third'.")
  }
})

When(/^I click on organisation "([^"]*)?"$/, async (startApplication) => {
  if (startApplication === 'A G COLLIS') {
    eligibleOrganisation.clickOnsbi1()
    console.log(eligibleOrganisation)
  } else if (startApplication === 'AISLA JONES') {
    eligibleOrganisation.clickOnsbi2()
  } else if (startApplication === 'Browsholme Hall') {
    eligibleOrganisation.clickOnsbi3()
  } else if (startApplication === 'Chris Hall') {
    eligibleOrganisation.clickOnsbi4()
  } else if (startApplication === 'Christine Gillott') {
    eligibleOrganisation.clickOnsbi5()
  } else if (startApplication === 'Donald Crofts') {
    eligibleOrganisation.clickOnsbi6()
  } else if (startApplication === 'E THOMPSON & SON') {
    eligibleOrganisation.clickOnsbi7()
  } else if (startApplication === 'Edgar Zoo') {
    eligibleOrganisation.clickOnsbi8()
  } else if (startApplication === 'Mr J G Romeril') {
    eligibleOrganisation.clickOnsbi9()
  } else if (startApplication === 'FALLON, S') {
    eligibleOrganisation.clickOnsbi10()
  } else if (startApplication === 'FJ & LA Poole and Son') {
    eligibleOrganisation.clickOnsbi11()
  } else if (startApplication === 'FRIEND FARMS LTD') {
    eligibleOrganisation.clickOnsbi12()
  } else if (startApplication === 'Farm & Woodland Services') {
    eligibleOrganisation.clickOnsbi13()
  } else if (startApplication === 'Fraser Sheader') {
    eligibleOrganisation.clickOnsbi14()
  } else if (startApplication === 'Friend Farm Produce') {
    eligibleOrganisation.clickOnsbi15()
  } else if (startApplication === 'G M PRICHARD & SON') {
    eligibleOrganisation.clickOnsbi16()
  } else if (startApplication === 'Glynis Nicholls') {
    eligibleOrganisation.clickOnsbi17()
  } else if (startApplication === 'Graham Dare') {
    eligibleOrganisation.clickOnsbi18()
  } else if (startApplication === 'Helen Harrison') {
    eligibleOrganisation.clickOnsbi9()
  }
})

When(/^I enter crn number (.*)$/, async (crnNumber) => {
  signIn.enterCrnNumber(crnNumber)
})

When(/^I clear crn number $/, async () => {
  signIn.clearCrnNumber()
})

When(/^I enter callerId number (.*)$/, async (callerId) => {
  signIn.enterCallerIDNumber(callerId)
})

When(/^I enter password (.*)$/, async (passwordNumber) => {
  signIn.enterPassword(passwordNumber)
})

When(/^I search sbi number (.*)$/, async (sbiNumber) => {
  eligibleOrganisation.enterSbiNumber(sbiNumber)
})
