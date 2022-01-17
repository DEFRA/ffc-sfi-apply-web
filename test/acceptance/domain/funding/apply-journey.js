import landDetails from '../funding/land-details-flow'
import whatFund from '../funding/what-fund-flow'
import soilActions from '../funding/soil-actions-flow'

export default class ApplyJourney {
  static #applicationData

  static async apply( applicationData ) {
    this.#applicationData = applicationData;

    await this.start()
    await landDetails.complete(this.#applicationData.landCoverDetails)
    await whatFund.complete(this.#applicationData.fundingOptions)
    await soilActions.complete(this.#applicationData.soilActions)
  }

  static async start(){
    await browser.$('#start-application').click()
  }
}