const joi = require('joi')
const { loadAgreement } = require('../../../../agreement')

module.exports = [{
  method: 'GET',
  path: '/agreement',
  options: {
    validate: {
      query: joi.object({
        agreementId: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('agreement').code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await loadAgreement(request)
      return h.redirect('/application-task-list')
    }
  }
}]
