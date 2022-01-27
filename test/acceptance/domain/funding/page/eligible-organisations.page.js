import { getDataByRow, rowCount } from '../../../support/element-utils/table-helper-util'

class EligibleOrganisationsPage {
  get #searchField () { return $('#user-search') }
  get #searchButton () { return $('.govuk-form-group .search-button') }

  async selectRandomOrganisation () {
    const randomInt = await this.#getRandomInt(await rowCount())

    console.log("Selected Organisation: ", {
      organisation:  await (await getDataByRow(randomInt, 'organisation')).getText(),
      sbi: await (await getDataByRow(randomInt, 'sbi')).getText()
    })

    await (await getDataByRow(randomInt, 'link')).click()
  }

  async #getRandomInt (max) {
    return Math.floor(Math.random() * (max - 1) + 1)
  }

  async searchBySbiNumber (sbiNumber) {
    await this.#searchField.waitForDisplayed({
      timeout: 3000, timeoutMsg: 'It seems multi organisation page was not loaded'
    })
    await this.#searchField.setValue(sbiNumber)
    await this.#searchButton.click()

    if (await rowCount() > 1) {
      throw `Search returned more than one result for ${sbiNumber}`
    }
  }

  async getCurrentSbiNumber () {
    return (await getDataByRow(1, 'sbi')).getText()
  }
}

export default new EligibleOrganisationsPage()