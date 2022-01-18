
class EligibleOrganisationsPage {
  get #tableParent () { return $('.govuk-table') }

  get #searchField () { return $('#user-search') }

  get #searchButton () { return $('.govuk-form-group .search-button') }

  #hrefSelector = '.start-application-link'

  async selectRandomOrganisation () {
    const randomInt = await this.#getRandomInt(await this.#tableParent.$$(this.#hrefSelector).length)
    await this.#tableParent.$$(this.#hrefSelector)[randomInt].click()
  }

  async #getRandomInt (max) {
    return Math.floor(Math.random() * max)
  }

  async searchBySbiNumber (sbiNumber) {
    await this.#searchField.setValue(sbiNumber)
    await this.#searchButton.click()

    if (await this.#getRandomInt(await this.#tableParent.$$(this.#hrefSelector).length > 1)) {
      throw `Search returned more than one result for ${sbiNumber}`
    }
  }

  async getCurrentSbiNumber () {
    return await this.#tableParent.$$('tr>td')[1].getText()
  }
}

export default new EligibleOrganisationsPage()