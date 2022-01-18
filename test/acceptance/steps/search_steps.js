import { When } from '@wdio/cucumber-framework'
import EligibleOrganisation from '../domain/funding/page/eligible-organisations.page'
import __ from 'hamjest'

When('Bob searches for an organisation by SBI Number {string}', async (sbiNumber) => {
  await EligibleOrganisation.searchBySbiNumber(sbiNumber)
})

When('SBI number {string} is found and returned to Bob', async (sbiNumber) => {
  await __.assertThat(sbiNumber, __.equalTo(await EligibleOrganisation.getCurrentSbiNumber()))
})