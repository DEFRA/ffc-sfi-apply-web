import chai from 'chai'
import { expect } from 'chai'
import Page from './page'

class eligibleOrganisation extends Page {
  //sbi number
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
  get sbi11 () { return $('//tr[1]/td[4]/a') }
  get sbi12 () { return $('//tr[2]/td[4]/a') }
  get sbi13 () { return $('//tr[3]/td[4]/a') }
  get sbi14 () { return $('//tr[4]/td[4]/a') }
  get sbi15 () { return $('//tr[5]/td[4]/a') }
  get sbi16 () { return $('//tr[6]/td[4]/a') }
  get sbi17 () { return $('//tr[7]/td[4]/a') }
  get sbi18 () { return $('//tr[8]/td[4]/a') }
  get sbi19 () { return $('//tr[9]/td[4]/a') }

  //searh sbi number element
  get sbiNumberField () { return $('#user-search') }
  get sbiNum () { return $('//tr[1]/td[2]') }   
  get sbiError () { return $('#error-message')}
  get orgsList () { return $$('div[class="govuk-grid-column-full"] tbody tr')}  
  get orgs () { return $('//*[@id="main-content"]/div[3]/div/table/tbody/tr[3]')}  
 
  open () {
    super.open('')
    browser.pause(3000)
  }
  
  // step2
  verifyOrgsListText() {  
    const orgsListText = [];
    this.orgsList.map(element => orgsListText.push(element.getText()));
    return orgsListText;
  }

  async verifySbiNumber() {
    console.log(await (await this.sbiNum).getText());
    const sbiNumber = await (await this.sbiNum).getText();
    await (await chai).expect(sbiNumber).to.not.be.empty;
    console.log(sbiNumber);
    return sbiNumber;  
  }
 
  async verifySbiErrorMessage() {
    console.log(await (await this.sbiError).getText());
    const sbiErrorText = await (await this.sbiError).getText();
    chai.expect(sbiErrorText).to.not.be.empty;
    console.log(sbiErrorText);
    return sbiErrorText;   
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
