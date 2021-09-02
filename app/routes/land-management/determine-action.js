const cache = require('../../cache')
const paymentLevels = require('./paymentLevels')

module.exports = {
  method: 'GET',
  path: '/determine-action',
  options: {
    handler: async (request, h) => {
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const fundingOption = applyJourney.selectedStandard.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === applyJourney.selectedAmbitionLevel.name).paymentLevel
      return h.redirect(`/${fundingOption}/${paymentLevel}/${paymentLevel}-overview`)
    }
  }
}
