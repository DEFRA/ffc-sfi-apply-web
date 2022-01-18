import landDetails from '../funding/land-details-flow'
import whatFund from '../funding/what-fund-flow'
import soilActions from '../funding/soil-actions-flow'
import Application from './page/start-application.page'
import taskListPage from './page/task-list.page'

class ApplyJourney {

  async apply (applicationData) {
    await Application.start()
    await taskListPage.completeSection(1)
    await landDetails.complete(applicationData.landCoverDetails)
    await taskListPage.completeSection(2)
    await whatFund.complete(applicationData.fundingOptions)
    await taskListPage.completeSection(3)
    await soilActions.complete(applicationData.soilActions)
  }

  async applicationStatusFor (sections) {
    return await taskListPage.statuses(sections)
  }
}

export default new ApplyJourney()