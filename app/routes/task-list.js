const ViewModel = require('./models/task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')

module.exports = {
  method: 'GET',
  path: '/task-list',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      const application = agreement?.application
      const progress = agreement?.progress
      const fundingOption = application?.selectedStandard?.code === 'sfi-improved-grassland' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === application?.selectedAmbitionLevel?.name)
      const selectedOrganisation = application?.selectedOrganisation
      return h.view('task-list', new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, selectedOrganisation))
    }
  }
}
