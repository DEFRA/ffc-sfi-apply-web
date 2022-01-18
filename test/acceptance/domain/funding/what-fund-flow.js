class WhatFundFlow {
  get arableSoil () { return $('.govuk-checkboxes #standard') }

  get improvedGrassland () { return $('.govuk-checkboxes #standard-2') }

  get moorland () { return $('.govuk-checkboxes #standard-3') }

  get submit () { return $('#submit') }

  async complete (fundingOptions) {
    for (const option in fundingOptions) {
      await this.#checkOption(option, fundingOptions[option])
    }
    await this.#continue()
  }

  async #checkOption (optionName, optionValue) {
    if (!optionValue) {
      return
    }
    optionName.includes('arable') ? await this.arableSoil.click() : ''
    optionName.includes('Grassland') ? await this.improvedGrassland.click() : ''
    optionName.includes('moorland') ? await this.moorland.click() : ''
  }

  async #continue () {
    await this.submit.click()
  }
}

export default new WhatFundFlow()