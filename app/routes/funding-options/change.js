const ViewModel = require('./models/change')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/funding-options/change',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('funding-options/change', new ViewModel({ improvedGrassland: agreement.improveGrassland !== '' ? agreement.improveGrassland : '', arableHorticulturalLand: agreement.arableHorticulturalLand !== '' ? agreement.arableHorticulturalLand : '', hedgerows: agreement.hedgerows !== '' ? agreement.hedgerows : '', waterbodyBuffering: agreement.waterbodyBuffering !== '' ? agreement.waterbodyBuffering : '', farmWoodland: agreement.farmWoodland !== '' ? agreement.farmWoodland : '' }))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/change',
  options: {
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      return h.redirect('calculation')
    }
  }
}]
