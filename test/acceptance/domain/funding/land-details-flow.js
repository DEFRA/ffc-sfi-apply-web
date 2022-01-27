import { selectRadioButton } from '../../support/element-utils/select'

class LandDetailsFlow {
  get #yesIsCorrect () { return $('#isLandCorrect') }

  get #noUpdateInformation () { return $('#isLandCorrect-2') }

  get #hasManagementControl () { return $('#hasManagementControl') }

  get #noManagementControl () { return $('#hasManagementControl-2') }

  async complete (landCoverDetails) {
    await selectRadioButton(landCoverDetails.informationCorrect, this.#yesIsCorrect, this.#noUpdateInformation)
    await selectRadioButton(landCoverDetails.managementControl, this.#hasManagementControl, this.#noManagementControl)
  }
}

export default new LandDetailsFlow()