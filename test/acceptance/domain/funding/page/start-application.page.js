class ApplicationPage {
  async start () {
    await browser.$('#start-application').click()
  }
}

export default new ApplicationPage()