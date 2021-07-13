const ViewModel = require('./models/select-standard')
const cache = require('../../../cache')

module.exports = [{
  method: 'GET',
  path: '/v2/standards',
  options: {
    handler: async (request, h) => {
      await cache.update('apply-journey', request.yar.id, {
        availableStandards: [
          { text: 'Arable Soils', value: 'arableSoils' },
          { text: 'Grassland Soils', value: 'grasslandSoils' }
        ]
      })
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      return h.view('v2/standards/select-standard', new ViewModel(applyJourney.availableStandards))
    }
  }
}]
