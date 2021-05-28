const joi = require('joi')
const ViewModel = require('./models/soil-compaction')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-compaction',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
      return h.view('create-agreement/soil-compaction', new ViewModel(agreement.soilCompaction))
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-compaction',
  options: {
    validate: {
      payload: joi.object({
        soilCompaction: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-compaction', new ViewModel(request.payload.soilCompaction, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect('soil-quality')
    }
  }
}]
