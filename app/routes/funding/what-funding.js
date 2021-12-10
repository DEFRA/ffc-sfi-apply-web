const Joi = require('joi')
const cache = require('../../cache')
const getAllStandards = require('./models/util-what-funding')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/what-funding',
  options: {
    handler: async (request, h) => {
      const { application, standards } = await getAllStandards(request)
      if (standards) {
        return h.view('funding/what-funding', new ViewModel(standards, application.selectedStandard))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/what-funding',
  options: {
    validate: {
      payload: Joi.object({
        standard: Joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { agreement, standards } = await getAllStandards(request, error)
        if (standards) {
          return h.view('funding/what-funding', new ViewModel(standards, agreement?.selectedStandard, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const agreement = await cache.get(request)

      const selectedStandard = agreement.application.standards.find(x => x.code === standard)
      await cache.update(request, { application: { selectedStandard } })

      await cache.update(request, {
        progress: { fundingOption: true }
      })

      if (standard === 'sfi-improved-grassland') {
        return h.redirect('/funding/grassland-overview')
      }

      return h.redirect('/funding/arable-overview')
    }
  }
}]
