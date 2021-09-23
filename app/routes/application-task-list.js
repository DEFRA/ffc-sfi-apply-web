const ViewModel = require('./models/application-task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')
const handler = require('./handler')
const applyJourneyConfig = require('../config/apply-journey')

const groupBy = () => {
  const taskList = applyJourneyConfig.filter(a => Boolean(a.taskList.group))

  return taskList.reduce((r, a) => {
    r[a.taskList.group] = [...r[a.taskList.group] || [], a]
    return r
  }, {})
}

module.exports = {
  method: 'GET',
  path: '/application-task-list',
  options: {
    pre: [
      handler.preHandler('/application-task-list')
    ],
    handler: async (request, h) => {
      console.log(groupBy())
      const progress = await cache.get('progress', request.yar.id)
      const journeyItem = request.pre.journeyItem
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const fundingOption = applyJourney?.selectedStandard?.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === applyJourney?.selectedAmbitionLevel?.name)
      const viewModel = new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, journeyItem)
      viewModel.taskList = groupBy()
      return h.view(journeyItem.key, viewModel)
    }
  }
}
