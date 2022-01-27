import Page from '../../page'

class SignInPage extends Page {

  get crnField () { return $('#crn') }
  get callerIdField () { return $('#callerId') }
  get passwordField () { return $('#password') }
  get signin () {return $('#submit')}
  get otherSigninLink () { return $('//summary/span') }
  get ForgotPwdLink () { return $('#Forgotten your password?') }
  get otherSigninLink () { return $('//summary/span') }
  get enterLink () { return $('#enter it here') }

  async open () {
    await super.open('/login')
  }

  async signIn(crn, callerId, password){
    await this.open()
    await this.crnField.setValue(crn)
    await this.callerIdField.setValue(callerId)
    await this.passwordField.setValue(password)

    await this.signin.click()
  }

  async enterCrnNumber(crnNumber) {
    await (await this.crnField).setValue(crnNumber);
  }

  async clearCrnNumber() {
    await (await this.crnField).clearValue()
  }

  async enterCallerIDNumber(callerId) {
    await (await this.callerIdField).setValue(callerId);
  }

  async enterPassword(passwordNumber) {
    await (await this.pwdField).setValue(passwordNumber);
  }

  async clickOnContinueButton () {
    await (await this.signin).click()
  }
}

export default new SignInPage()
