import Page from './page'

class whatFund extends Page {

  /**
      * define elements
      */

  get arableSoil () { return $('#standard') }
  get grasslandSoil () { return $('#standard-2') }

  
  

  /**
       * define or overwrite page methods
       */
  open () {
    super.open('')
    browser.pause(3000)
  }
  /**
       * your page specific methods
       */

  clickOnArableSoil () {
    const arableSoil = $('#standard')
    browser.execute('arguments[0].click();', arableSoil)
  }

  clickOnGrasslandSoil () {
    const element = $('#standard-2')
    browser.execute('arguments[0].click();', element)
  }
}

export default new whatFund()
