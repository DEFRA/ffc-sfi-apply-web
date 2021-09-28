const joi = require('joi')
const ViewModel = require('./models/which-business')
const getAllOrganisations = require('./models/util-which-business')
const cache = require('../cache')
const handler = require('./handler')

module.exports = [{
  method: 'GET',
  path: '/which-business',
  options: {
    pre: [
      handler.preHandler('which-business')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const { sbis, applyJourney } = await getAllOrganisations(request)
      return h.view(journeyItem.view, new ViewModel(sbis, applyJourney.selectedSbi, journeyItem))
    }
  }
},
{
  method: 'POST',
  path: '/which-business',
  options: {
    pre: [
      handler.preHandler('which-business')
    ],
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const journeyItem = request.pre.journeyItem
        const { sbis, applyJourney } = await getAllOrganisations(request, error)
        return h.view(journeyItem.view, new ViewModel(sbis, applyJourney.selectedSbi, journeyItem, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const sbiValue = request.payload.sbi
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const selectedSbi = applyJourney.availableSbis.find(x => x.sbi === parseInt(sbiValue))
      await cache.update('apply-journey', request.yar.id, { selectedSbi: selectedSbi, submitted: false })
      return h.redirect(journeyItem.next)
    }
  }
}]
