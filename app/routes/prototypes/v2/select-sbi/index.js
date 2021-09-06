const joi = require('joi')
const ViewModel = require('./models/select-organisation')
const getAllOrganisations = require('./models/util-select-organisation')
const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/v2/select-sbi',
  options: {
    handler: async (request, h) => {
      const { sbis, applyJourney } = await getAllOrganisations(request)
      return h.view('v2/select-sbi/select-sbi', new ViewModel(sbis, applyJourney.selectedSbi))
    }
  }
},
{
  method: 'POST',
  path: '/v2/select-sbi',
  options: {
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { sbis, applyJourney } = await getAllOrganisations(request, error)
        return h.view('v2/select-sbi/select-sbi', new ViewModel(sbis, applyJourney.selectedSbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbiValue = request.payload.sbi
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const selectedSbi = applyJourney.availableSbis.find(x => x.sbi === parseInt(sbiValue))
      await cache.update('apply-journey', request.yar.id, { selectedSbi: selectedSbi, submitted: false })
      return h.redirect('/v2/organisation-details')
    }
  }
}]
