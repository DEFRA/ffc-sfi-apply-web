import { selectRadioButton } from '../element-utils/select'

class SoilActionsFlow {
  get canTestOrganicMatter () { return $('#organic-matter') }

  get cannotTestOrganicMatter () { return $('#organic-matter-2') }

  get canProducePlan () { return $('#produce-plan') }

  get cannotProducePlan () { return $('#produce-plan-2') }

  get canHaveGreenCover () { return $('#greenCover') }

  get cannotHaveGreenCover () { return $('#greenCover-2') }

  get submit () { return $('#submit') }

  async complete (soilActions) {
    await selectRadioButton(soilActions.testOrganicMatter, this.canTestOrganicMatter, this.cannotTestOrganicMatter)
    await this.#continue()
    await selectRadioButton(soilActions.producePlan, this.canProducePlan, this.cannotProducePlan)
    await this.#continue()
    await selectRadioButton(soilActions.greenCover, this.canHaveGreenCover, this.cannotHaveGreenCover)
    await this.#continue()
    await selectRadioButton(soilActions.addOrganicMatter, this.canTestOrganicMatter, this.cannotTestOrganicMatter)
    await this.#continue()
  }

  async #continue () {
    await this.submit.click()
  }
}

export default new SoilActionsFlow()