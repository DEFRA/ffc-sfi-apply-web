const joi = require('joi')
const ViewModel = require('./models/submit')
const { sendAgreementSubmitMessage } = require('../messaging')
const cache = require('../cache')
const schema = require('./schemas/agreement')
const generateAgreementNumber = require('../agreement-number')

module.exports = [{
  method: 'GET',
  path: '/submit',
  options: {
    handler: (request, h) => {
      return h.view('submit', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/submit',
  options: {
    validate: {
      payload: joi.object({
        submit: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('submit', new ViewModel(request.payload.submit, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      if (request.payload.submit) {
        const agreement = await cache.get('agreement', request.yar.id)
        if (!agreement.submitted) {
          if (!agreement.agreementNumber) {
            agreement.agreementNumber = generateAgreementNumber()
            await cache.update('agreement', request.yar.id, { agreementNumber: agreement.agreementNumber })
          }
          const result = schema.validate(agreement, { allowUnknown: true })
          if (result.error) {
            console.info(`Agreement data is incomplete for ${request.yar.id}, restarting journey`)
            console.info(agreement)
            console.info(result.error)
            await cache.clear('progress', request.yar.id)
            return h.redirect('/application-task-list')
          }
          await sendAgreementSubmitMessage(agreement, request.yar.id)
          await cache.update('progress', request.yar.id, { submitted: true })
        }
        return h.redirect('/confirmation')
      }
      return h.redirect('/application-task-list')
    }
  }
}]
