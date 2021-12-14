import chai from 'chai'
//import { expect } from 'chai'
import Page from './page'

class eligibleOrganisation extends Page {

  get sbi1 () { return $('//tr[1]/td[4]/a') }
  get sbi2 () { return $('//tr[2]/td[4]/a') }
  get sbi3 () { return $('//tr[3]/td[4]/a') }
  get sbi4 () { return $('//tr[4]/td[4]/a') }
  get sbi5 () { return $('//tr[5]/td[4]/a') }
  get sbi6 () { return $('//tr[6]/td[4]/a') }
  get sbi7 () { return $('//tr[7]/td[4]/a') }
  get sbi8 () { return $('//tr[8]/td[4]/a') }
  get sbi9 () { return $('//tr[9]/td[4]/a') }
  get sbi10 () { return $('//tr[10]/td[4]/a') }
  get sbi11 () { return $('//tr[11]/td[4]/a') }
  get sbi12 () { return $('//tr[12]/td[4]/a') }
  get sbi13 () { return $('//tr[13]/td[4]/a') }
  get sbi14 () { return $('//tr[14]/td[4]/a') }
  get sbi15 () { return $('//tr[15]/td[4]/a') }
  get sbi16 () { return $('//tr[16]/td[4]/a') }
  get sbi17 () { return $('//tr[17]/td[4]/a') }
  get sbi18 () { return $('//tr[18]/td[4]/a') }
  get sbi19 () { return $('//tr[19]/td[4]/a') }

  //searh sbi number element
  get sbiNumberField () { return $('#user-search') }
  
  //get sbiNum () { return $('#main-content > div.govuk-grid-row.govuk-\!-margin-top-5 > div > table > tbody > tr > td:nth-child(2)') }
  //get sbiNum () { return $('//*[@id="main-content"]/div[3]/div/table/tbody/tr/td[2]') }
  //get sbiNum () { return $('#tbody.govuk-table__body > tr.govuk-table__row') }
  //get sbiNum () { return $('//main[@id="main-content"]/div[3]/div/table/tbody/tr/td[2]') }
  get sbiNum () { return $('//*[@id="main-content"]/div[3]/div/table/tbody/tr/td[1]') }
  get sbiError () { return $('//*[normalize-space(text()) and normalize-space(.)="Search for an organisation by SBI number"][1]/preceding::li[1]') }
  // (.//*[normalize-space(text()) and normalize-space(.)='Select the organisation to make an application for'])[1]/following::li[1]
  //#//main[@id='main-content']/div[3]/form/div/span
  //#div.govuk-form-group.govuk-form-group--error  
  //#//div/span
  //#//main[@id='main-content']/div[2]/div/ul/li
  //#div.govuk-error-summary__body
  //#ul.govuk-list.govuk-error-summary__list
 
  
 
  
  
  //get sbiNum () { return $('#tbody.govuk-table__body') }
  //#main-content>div.govuk-grid-row.govuk-\!-margin-top-5>div>table>tbody>tr>td:nth-child(2)
  
  
  open () {
    super.open('')
    browser.pause(3000)
  }

  async verifySbiNumber() {
    await (await this.sbiNum)
    sbiNumber = (await this.sbiNum).getText();
    //const sbiNum = await this.sbiNum
    //expect(sbiNum).toHaveTextContaining(message)
    chai.expect(sbiNumber).to.not.be.empty;
    console.log(sbiNumber);
    return sbiNumber;
    //await (await this.sbiNumberField).setValue(sbiNumber);   
  }

  async verifySbiErrorMessage() {
    await (await this.sbiError)
    sbiErrorText = (await this.sbiError).getText();
    //const sbiNum = await this.sbiNum
    //expect(sbiNum).toHaveTextContaining(message)
    chai.expect(sbiErrorText).to.not.be.empty;
    console.log(sbiErrorText);
    return sbiErrorText;
    //await (await this.sbiNumberField).setValue(sbiNumber);   
  }

  // async verifySbiNumber() {
  //   const sbiNum = await this.sbiNum.getText()
  //   console.log(sbiNum);
  //   return sbiNum;
  //   //await (await this.sbiNumberField).setValue(sbiNumber);
    
  // }

  //   verifySbiNumber() {
  //    const sbiNum = $('#tbody.govuk-table__body')
  //   // expect(sbiNum).toBeDisplayed()
  //    expect(sbiNum).toHaveTextContaining('106899089')
  //     //expect(sbiNum).toBeVisible()
  //   // expect(sbiNum).toExist()
  //  }

  // const pageHeader = (await $('h1.govuk-panel__title')).getText;
        // expect(pageHeader).toExist();
        // (await pageHeader).getText();
        // console.log(pageHeader.getText());
        // //await (await this.titleHeader.getText());

  

  async enterSbiNumber(sbiNumber) {
    await (await this.sbiNumberField).setValue(sbiNumber);
  }

  async enterSbiNumber(sbiNumber) {
    await (await this.sbiNumberField).setValue(sbiNumber);
  }

  async clearSbiNumber() {
    await (await this.sbiNumberField).clearValue()
  }


  async clickOnsbi1 () {
    await (await this.sbi1).click()
  }
  async clickOnsbi2 () {
    await (await this.sbi2).click()
  }
  async clickOnsbi3 () {
    await (await this.sbi3).click()
  }
  async clickOnsbi4 () {
    await (await this.sbi4).click()
  }
  async clickOnsbi5 () {
    await (await this.sbi5).click()
  }
  async clickOnsbi6 () {
    await (await this.sbi6).click()
  }
  async clickOnsbi7 () {
    await (await this.sbi7).click()
  }
  async clickOnsbi8 () {
    await (await this.sbi8).click()
  }
  async clickOnsbi9 () {
    await (await this.sbi9).click()
  }
  async clickOnsbi10 () {
    await (await this.sbi10).click()
  }
  async clickOnsbi11 () {
    await (await this.sbi11).click()
  }
  async clickOnsbi12 () {
    await (await this.sbi12).click()
  }
  async clickOnsbi13 () {
    await (await this.sbi13).click()
  }
  async clickOnsbi14 () {
    await (await this.sbi14).click()
  }
  async clickOnsbi15 () {
    await (await this.sbi15).click()
  }
  async clickOnsbi16 () {
    await (await this.sbi16).click()
  }
  async clickOnsbi17 () {
    await (await this.sbi17).click()
  }
  async clickOnsbi18 () {
    await (await this.sbi18).click()
  }
  async clickOnsbi18 () {
    await (await this.sbi18).click()
  }
  async clickOnsbi19 () {
    await (await this.sbi19).click()
  }
}

export default new eligibleOrganisation()
