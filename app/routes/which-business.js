const joi = require('joi')
const ViewModel = require('./models/which-business')
const getAllSbis = require('./models/util-which-business')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/which-business',
  options: {
    handler: async (request, h) => {
      const { sbis, applyJourney } = await getAllSbis(request)
      return h.view('which-business', new ViewModel(sbis, applyJourney.selectedSbi))
    }
  }
},
{
  method: 'POST',
  path: '/which-business',
  options: {
    validate: {
      payload: joi.object({
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        const { sbis, applyJourney } = await getAllSbis(request, error)
        return h.view('which-business', new ViewModel(sbis, applyJourney.selectedSbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbiValue = request.payload.sbi
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const selectedSbi = applyJourney.availableSbis.find(x => x.sbi === parseInt(sbiValue))
      await cache.update('apply-journey', request.yar.id, { selectedSbi: selectedSbi, submitted: false })
      return h.redirect('/application-task-list')
    }
  }
}]
