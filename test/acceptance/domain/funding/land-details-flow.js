
class LandDetailsFlow{
  get yesIsCorrect() { return $('#isLandCorrect') }
  get noUpdateInformation() { return $('#isLandCorrect-2') }
  get hasManagementControl() { return $('#hasManagementControl') }
  get noManagementControl() { return $('#hasManagementControl-2') }
  get submit() { return $('#submit') }

  async complete(landCoverDetails) {
    await browser.$('.app-task-list .app-task-list__task-name a[href*="/confirm-details"]').click()
    await this.#selectOption(landCoverDetails.informationCorrect, this.yesIsCorrect, this.noUpdateInformation)
    await this.#selectOption(landCoverDetails.managementControl, this.hasManagementControl, this.noManagementControl)
  }

  async #selectOption(option, element1, element2){
    true === option ? await element1.click() : await element2.click()
    await this.#continue()
  }

  async #continue(){
    await this.submit.click();
  }
}

export default new LandDetailsFlow()