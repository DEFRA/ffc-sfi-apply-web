const joi = require('joi')
const cache = require('../../cache')
const getAllStandards = require('./models/util-what-funding')
const ViewModel = require('./models/what-funding')
const handler = require('../handler')

module.exports = [{
  method: 'GET',
  path: '/funding-options/what-funding',
  options: {
    pre: [
      handler.preHandler('what-funding')
    ],
    handler: async (request, h) => {
      const { applyJourney, standards } = await getAllStandards(request)
      if (standards) {
        const journeyItem = request.pre.journeyItem
        return h.view(journeyItem.view, new ViewModel(standards, applyJourney.selectedStandard, journeyItem))
      }
      return h.view('no-response')
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/what-funding',
  options: {
    pre: [
      handler.preHandler('what-funding')
    ],
    validate: {
      payload: joi.object({
        standard: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { applyJourney, standards } = await getAllStandards(request, error)
        if (standards) {
          const journeyItem = request.pre.journeyItem
          return h.view(journeyItem.view, new ViewModel(standards, applyJourney.selectedStandard, journeyItem, error)).code(400).takeover()
        }
        return h.view('no-response')
      }
    },
    handler: async (request, h) => {
      const standard = request.payload.standard
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const journeyItem = request.pre.journeyItem
      const selectedStandard = applyJourney.standards.find(x => x.code === standard)
      await cache.update('apply-journey', request.yar.id, { selectedStandard })

      await cache.update('progress', request.yar.id, {
        progress: { fundingOption: true }
      })
      return h.redirect(journeyItem.next)
    }
  }
}]
