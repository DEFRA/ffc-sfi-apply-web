import { selectRadioButton } from '../../support/element-utils/select'

class SoilActionsFlow {
  get #canTestOrganicMatter () { return $('#organic-matter') }
  get #cannotTestOrganicMatter () { return $('#organic-matter-2') }
  get #canProducePlan () { return $('#produce-plan') }
  get #cannotProducePlan () { return $('#produce-plan-2') }
  get #canHaveGreenCover () { return $('#greenCover') }
  get #cannotHaveGreenCover () { return $('#greenCover-2') }

  async complete (soilActions) {
    const url = await browser.getUrl()
    if(url.includes('#')){
      return
    }
    await selectRadioButton(soilActions.testOrganicMatter, this.#canTestOrganicMatter, this.#cannotTestOrganicMatter)
    await selectRadioButton(soilActions.producePlan, this.#canProducePlan, this.#cannotProducePlan)
    await selectRadioButton(soilActions.greenCover, this.#canHaveGreenCover, this.#cannotHaveGreenCover)
    await selectRadioButton(soilActions.addOrganicMatter, this.#canTestOrganicMatter, this.#cannotTestOrganicMatter)
  }
}

export default new SoilActionsFlow()