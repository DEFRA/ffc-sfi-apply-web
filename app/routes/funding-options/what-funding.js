const joi = require('joi')
const cache = require('../../cache')
const getAllStandards = require('./models/util-what-funding')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    handler: async (request, h) => {
      const { applyJourney, standards } = await getAllStandards(request)
      if (standards) {
        return h.view('funding-options/what-funding', new ViewModel(standards, applyJourney.selectedStandard))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-funding',
  options: {
    validate: {
      payload: joi.object({
        standard: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { applyJourney, standards } = await getAllStandards(request, error)
        if (standards) {
          return h.view('funding-options/what-funding', new ViewModel(standards, applyJourney.selectedStandard, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const applyJourney = await cache.get('apply-journey', request.yar.id)

      const selectedStandard = applyJourney.standards.find(x => x.code === standard)
      await cache.update('apply-journey', request.yar.id, { selectedStandard: selectedStandard })

      await cache.update('progress', request.yar.id, {
        progress: { fundingOption: true }
      })

      if (standard === '130') {
        return h.redirect('/funding-options/grassland-overview')
      }

      return h.redirect('/funding-options/arable-overview')
    }
  }
}]
