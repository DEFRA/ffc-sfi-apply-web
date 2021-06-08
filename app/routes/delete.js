const joi = require('joi')
const ViewModel = require('./models/delete')
const { deleteAgreement } = require('../agreement')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/delete',
  options: {
    handler: async (request, h) => {
      return h.view('delete', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/delete',
  options: {
    validate: {
      payload: joi.object({
        delete: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('delete', new ViewModel(request.payload.delete, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      if (request.payload.delete) {
        const agreement = await cache.get('agreement', request.yar.id)
        if (!agreement.submitted) {
          await deleteAgreement(agreement)

          await cache.clear('eligibility', request.yar.id)
          await cache.clear('agreement', request.yar.id)
          await cache.clear('progress', request.yar.id)
        }
      }
      return h.redirect('/application-task-list')
    }
  }
}]
