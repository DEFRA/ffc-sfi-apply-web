import Page from './page'

class signIn extends Page {

  get crnField () { return $('#crn') }
  get callerIdField () { return $('#callerId') }
  get pwdField () { return $('#password') }
  get signin () {return $('#submit')}
  get otherSigninLink () { return $('//summary/span') }
  get ForgotPwdLink () { return $('#Forgotten your password?') }
  get otherSigninLink () { return $('//summary/span') }
  get enterLink () { return $('#enter it here') }

  open () {
    super.open('')
    browser.pause(3000)
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

export default new signIn()
