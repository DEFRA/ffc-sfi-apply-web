const joi = require('joi')
const cache = require('../../cache')
const getAllStandards = require('./models/util-what-funding')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const { application, standards } = await getAllStandards(request)
      if (standards) {
        return h.view('funding-options/what-funding', new ViewModel(standards, application.selectedStandard))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-funding',
  options: {
    auth: { strategy: 'jwt' },
    validate: {
      payload: joi.object({
        standard: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { agreement, standards } = await getAllStandards(request, error)
        if (standards) {
          return h.view('funding-options/what-funding', new ViewModel(standards, agreement?.selectedStandard, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const agreement = await cache.get('agreement', request.yar.id)

      const selectedStandard = agreement.application.standards.find(x => x.code === standard)
      await cache.update('agreement', request.yar.id, { application: { selectedStandard } })

      await cache.update('agreement', request.yar.id, {
        progress: { fundingOption: true }
      })

      if (standard === 'sfi-improved-grassland') {
        return h.redirect('/funding-options/grassland-overview')
      }

      return h.redirect('/funding-options/arable-overview')
    }
  }
}]
