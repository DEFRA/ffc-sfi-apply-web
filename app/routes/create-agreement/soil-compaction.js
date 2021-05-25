const joi = require('joi')
const ViewModel = require('./models/soil-compaction')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-compaction',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/soil-compaction', new ViewModel())
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
      return h.redirect('soil-quality')
    }
  }
}]