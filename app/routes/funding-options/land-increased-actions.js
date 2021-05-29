const joi = require('joi')
const ViewModel = require('./models/land-increased-actions')
const { sendAgreementCalculateMessage } = require('../../messaging')

module.exports = [{
  method: 'GET',
  path: '/funding-options/land-increased-actions',
  options: {
    handler: (request, h) => {
      return h.view('funding-options/land-increased-actions', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/funding-options/land-increased-actions',
  options: {
    validate: {
      payload: joi.object({
        greenCover: joi.string().required(),
        permanentGrass: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('funding-options/land-increased-actions',
          new ViewModel({ greenCover: request.payload.greenCover || '', permanentGrass: request.payload.permanentGrass }, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await sendAgreementCalculateMessage({ id: 1 }, request.yar.id)
      return h.redirect('application-value')
    }
  }
}]
