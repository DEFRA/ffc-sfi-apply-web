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


import { When } from '@wdio/cucumber-framework'

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
    case 'forthOrganisation':
      eligibleOrganisation.clickOnsbi4()
      break
    case 'fifthOrganisation':
      eligibleOrganisation.clickOnsbi5()
      break
    case 'sixthOrganisation':
      eligibleOrganisation.clickOnsbi6()
      break
    case 'seventhOrganisation':
      eligibleOrganisation.clickOnsbi7()
      break
    case 'eighthOrganisation':
      eligibleOrganisation.clickOnsbi8()
      break
    case 'ninthOrganisation':
      eligibleOrganisation.clickOnsbi9()
      break
    case 'tenthOrganisation':
      eligibleOrganisation.clickOnsbi10()
      break
    case 'elevenOrganisation':
      eligibleOrganisation.clickOnsbi11()
      break
    case 'TwelveOrganisation':
      eligibleOrganisation.clickOnsbi12()
      break
    case 'ThirteehOrganisation':
        eligibleOrganisation.clickOnsbi3()
      break
    case 'FourteenOrganisation':
        eligibleOrganisation.clickOnsbi4()
      break
    case 'FifteenOrganisation':
        eligibleOrganisation.clickOnsbi5()
      break
    case 'SixteenOrganisation':
        eligibleOrganisation.clickOnsbi6()
      break
    case 'seventeenOrganisation':
        eligibleOrganisation.clickOnsbi7()
      break
    case 'eighteenOrganisation':
        eligibleOrganisation.clickOnsbi8()
      break
    case 'nineteenOrganisation':
        eligibleOrganisation.clickOnsbi9()
      break  
    default:
      console.error("Unknown org number. Expected 'first' or 'second' or 'third'.")
  }
})

When(/^I enter crn number (.*)$/, async (crnNumber) => {
  await signIn.enterCrnNumber(crnNumber)
})

When(/^I clear crn number $/, async () => {
  await signIn.clearCrnNumber()
})

When(/^I enter password (.*)$/, async (passwordNumber) => {
  await signIn.enterPassword(passwordNumber)
})

When(/^I search sbi number (.*)$/, async (sbiNumber) => {
  await eligibleOrganisation.enterSbiNumber(sbiNumber)
})
