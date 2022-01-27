class ApplicationPage {

  get startButton () { return $('#start-application') }

  async start () {
    await this.startButton.waitForDisplayed()
    await this.startButton.click()
  }
}

export default new ApplicationPage()