import SignInPage from './page/signin.page'

class AuthService {

  async loginWith (orgData) {
    await SignInPage.signIn(orgData.crn, orgData.callerId, orgData.passwordValue)
  }

  async isCookiePresent (cookieName) {
    try {
      return await browser.getNamedCookie(cookieName) !== null ? "true" : "false"
    } catch (error) {
      return "false"
    }
  }
}

export default new AuthService()