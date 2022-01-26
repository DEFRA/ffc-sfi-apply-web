import SignInPage from './page/signin.page'
import { mockEligibleOrganisations, mockSignIn } from '../../support/mock-utils/mockResponse'

class AuthService {
  async loginWith (orgData) {
    await SignInPage.signIn(orgData.crn, orgData.callerId, orgData.passwordValue)
    if (process.env.PR_BUILD) {
      switch (orgData.multiOrg) {
        case true:
          await mockEligibleOrganisations()
          break
        case false:
          await mockSignIn()
          break
        default:
          console.log(`Unknown callerId: ${orgData.callerId}`)
          break
      }
    }
  }

  async isCookiePresent (cookieName) {
    try {
      return await browser.getNamedCookie(cookieName) !== null ? 'true' : 'false'
    } catch (error) {
      return 'false'
    }
  }
}

export default new AuthService()
