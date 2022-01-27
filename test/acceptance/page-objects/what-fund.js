import Page from '../domain/page'

class whatFund extends Page {
  get arableSoil () { return $('#standard') }
  get grasslandSoil () { return $('#standard-2') }

  open () {
    super.open('')
    browser.pause(3000)
  }

  clickOnArableSoil () {
    const arableSoil = $("//input[@id='standard']")
    browser.execute('arguments[0].click();', arableSoil)
  }

  clickOnGrasslandSoil () {
    const grasslandSoil = $('#standard-2')
    browser.execute('arguments[0].click();', grasslandSoil)
  }
}

export default new whatFund()
