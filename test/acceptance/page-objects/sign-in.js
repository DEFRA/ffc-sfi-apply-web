import Page from './page'

class signIn extends Page {

  /**
      * define elements
      */
   
  get crnField () { return $('#crn') }    
  get callerIdField () { return $('#callerId') }
  get pwdField () { return $('#password') }   
  get signin () {return $('#submit')}
  get otherSigninLink () { return $('//summary/span') }    
  get ForgotPwdLink () { return $('#Forgotten your password?') }
  get otherSigninLink () { return $('//summary/span') }    
  get enterLink () { return $('#enter it here') }

  /**
       * define or overwrite page methods
       */

  open () {
    super.open('')
    browser.pause(3000)
  }
  /**
       * your page specific methods
       */

  

     async enterCrnNumber(crnNumber) {
     //await (await this.crnField).clearValue();
     await (await this.crnField).setValue(crnNumber);                    
    }

  async clearCrnNumber() {
    await (await this.crnField).clearValue()                  
  }
 
  // async clearCrnNumber() {
  // const elem = await $('#crn')
  // //await elem.setValue('test123')
  // await elem.clearValue()
  // }
  

  async enterCallerIDNumber(callerId) {
  await (await this.callerIdField).setValue(callerId);                    
  }

  async enterPassword(passwordNumber) {
  await (await this.pwdField).setValue(passwordNumber);                    
  }


//    async enterBpsValue(amount) {
//     await (await this.inputBPSValue).setValue(amount);                    
// }

// When(/^I enter BPS payment value (.*)$/, async (amount) => {
// // BspPage.enterBpsValue(amount);
// });
   
  async clickOnContinueButton () {
    await (await this.signin).click()
  }
}

export default new signIn()
