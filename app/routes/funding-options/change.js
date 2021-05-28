const ViewModel = require('./models/change')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/change',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('funding-options/change', new ViewModel({ improvedGrassland: agreement.improvedGrassland !== '' ? agreement.improvedGrassland : '', arableHorticulturalLand: agreement.arableHorticulturalLand !== '' ? agreement.arableHorticulturalLand : '', hedgerows: agreement.hedgerows !== '' ? agreement.hedgerows : '', waterbodyBuffering: agreement.waterbodyBuffering !== '' ? agreement.waterbodyBuffering : '', farmWoodland: agreement.farmWoodland !== '' ? agreement.farmWoodland : '' }))
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/change',
  options: {
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('application-value')
    }
  }
}]
