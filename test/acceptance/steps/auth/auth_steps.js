import { Given, Then } from '@wdio/cucumber-framework'
import AuthService from '../../domain/auth/auth_service'

Given("a farmer signs in with org details {string} {string} {string}", async (crn, callerId, password) => {
  await AuthService.loginWith(crn, callerId, password)
})

Then("a session cookie present should be {string}", async (value) => {
  const cookiePresent = await AuthService.isCookiePresent('ffc_sfi_identity')
  await expect(cookiePresent).to.equal(value)
})
