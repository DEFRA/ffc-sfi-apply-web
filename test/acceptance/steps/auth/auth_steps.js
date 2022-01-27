import { Given, Then } from '@wdio/cucumber-framework'
import AuthService from '../../domain/auth/auth-service'
import { assertThat, equalTo } from 'hamjest'

Given('a farmer signs in with org details {string} {string} {string}', async (crn, callerId, passwordValue) => {
  await AuthService.loginWith({ crn, callerId, passwordValue, multiOrg: false })
})

Then('a session cookie present should be {}', async (value) => {
  const cookiePresent = await AuthService.isCookiePresent('ffc_sfi_identity')
  await assertThat('Expected Cookie <ffc_sfi_identity> to be Present', cookiePresent, equalTo(value))
})