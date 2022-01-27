import { checkBoxByValue } from '../../support/element-utils/select'

class WhatFundFlow {
  get #submit () { return $('#submit') }

  async complete (fundingOptions) {
    for (const option in fundingOptions) {
      await checkBoxByValue(option, fundingOptions[option])
    }
    this.#submit.click()
  }
}

export default new WhatFundFlow()