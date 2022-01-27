import Page from '../domain/page'

class StartPage extends Page {
  get startNewClaim () { return $('.govuk-button--start') }

  open () {
    super.open('')
    browser.pause(3000)
  }

  // your page specific methods
  waitForloginPageToLoad () {
    if (!this.headerImage.isDisplayed()) {
      this.headerImage.waitForDisplayed(10000)
    }
  }

  startClaim () {
    this.startClaim.click()
  }
}

export default new StartPage()
