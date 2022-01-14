import SignInPage from './signin.page'

export default class AuthService {

  static async loginWith (crn, callerId, password) {
    await SignInPage.signIn(crn, callerId, password)
  }

  static async isCookiePresent (cookieName) {
    try {
      return await browser.getNamedCookie(cookieName) !== null ? "true" : "false"
    } catch (error) {
      console.log(error)
      return "false"
    }
  }
}