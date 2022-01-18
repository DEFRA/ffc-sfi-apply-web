import { selectRadioButton } from '../element-utils/select'

class LandDetailsFlow {
  get yesIsCorrect () { return $('#isLandCorrect') }

  get noUpdateInformation () { return $('#isLandCorrect-2') }

  get hasManagementControl () { return $('#hasManagementControl') }

  get noManagementControl () { return $('#hasManagementControl-2') }

  get submit () { return $('#submit') }

  async complete (landCoverDetails) {
    await selectRadioButton(landCoverDetails.informationCorrect, this.yesIsCorrect, this.noUpdateInformation)
    await this.#continue()
    await selectRadioButton(landCoverDetails.managementControl, this.hasManagementControl, this.noManagementControl)
    await this.#continue()
  }

  async #continue () {
    await this.submit.click()
  }

}

export default new LandDetailsFlow()