import { Given, When, Then } from '@wdio/cucumber-framework'
import AuthService from '../../domain/auth/auth-service'
import ApplyJourney from '../../domain/funding/apply-journey'
import { eligibleMultipleOrg, eligibleSingleOrg } from '../../fixtures/users'
import EligibleOrganisation from '../../domain/funding/page/eligible-organisations.page'
import { waitForLoginPageToDisappear } from '../../domain/element-utils/wait-util'
import __ from 'hamjest'

Given( "Bob has management control of only one eligible organisation", async function () {
  await AuthService.loginWith(eligibleSingleOrg.auth)
})

Given('Bob has management control of more than one eligible organisation', async function () {
  await AuthService.loginWith(eligibleMultipleOrg.auth)
});

When( "Bob applies for farming fund", async function () {
  await ApplyJourney.apply(eligibleSingleOrg)
});

When( 'Bob applies for farming fund for any of his organisation', async function () {

  await waitForLoginPageToDisappear()
  await EligibleOrganisation.selectRandomOrganisation()
  await ApplyJourney.apply(eligibleMultipleOrg)
});

Then( 'the following section(s) should show as status', async (dataTable) => {
  const sections = dataTable.hashes()
  await __.assertThat(await ApplyJourney.applicationStatusFor(sections), __.equalTo(sections))
});


