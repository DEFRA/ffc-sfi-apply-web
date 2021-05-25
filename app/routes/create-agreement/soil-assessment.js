const joi = require('joi')
const ViewModel = require('./models/soil-assessment')

module.exports = [{
  method: 'GET',
  path: '/create-agreement/soil-assessment',
  options: {
    handler: (request, h) => {
      return h.view('create-agreement/soil-assessment', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/create-agreement/soil-assessment',
  options: {
    validate: {
      payload: joi.object({
        soilAssessment: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('create-agreement/soil-assessment', new ViewModel(request.payload.soilAssessment, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      return h.redirect('soil-protection')
    }
  }
}]
