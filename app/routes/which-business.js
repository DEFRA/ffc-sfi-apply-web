const joi = require('joi')
const ViewModel = require('./models/which-business')
const getAllOrganisations = require('../organisation')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/which-business',
  options: {
    handler: async (request, h) => {
      const { sbis, agreement } = await getAllOrganisations(request)
      return h.view('which-business', new ViewModel(sbis, agreement.selectedSbi))
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
        const { sbis, agreement } = await getAllOrganisations(request, error)
        return h.view('which-business', new ViewModel(sbis, agreement.selectedSbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const { sbi } = request.payload
      const agreement = await cache.get('agreement', request.yar.id)
      const selectedSbi = agreement.availableSbis.find(x => x.sbi === parseInt(sbi))
      await cache.update('agreement', request.yar.id, { selectedSbi, submitted: false })
      return h.redirect('/application-task-list')
    }
  }
}]
