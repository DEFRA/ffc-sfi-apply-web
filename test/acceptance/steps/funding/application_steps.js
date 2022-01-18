import { Given, When, Then } from '@wdio/cucumber-framework'
import AuthService from '../../domain/auth/auth-service'
import ApplyJourney from '../../domain/funding/apply-journey'
import { eligibleMultipleOrg, eligibleSingleOrg } from '../../fixtures/users'
import EligibleOrganisation from '../../domain/funding/page/eligible-organisations.page'
import __ from 'hamjest'

Given( "Bob has management control of only one eligible organisation", async () => {
  await AuthService.loginWith(eligibleSingleOrg.auth)
})

Given('Bob has management control of more than one eligible organisation', async () => {
  await AuthService.loginWith(eligibleMultipleOrg.auth)
});

When( "Bob applies for farming fund", async () => {
  await ApplyJourney.apply(eligibleSingleOrg)
});

When( 'Bob applies for farming fund for any of his organisation', async () => {
  await EligibleOrganisation.selectRandomOrganisation()
  await ApplyJourney.apply(eligibleMultipleOrg)
});

Then( 'the following section(s) should show as status', async (dataTable) => {
  const sections = dataTable.hashes()
  await __.assertThat(await ApplyJourney.applicationStatusFor(sections), __.equalTo(sections))
});


