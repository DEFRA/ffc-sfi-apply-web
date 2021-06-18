const joi = require('joi')
const ViewModel = require('./models/submit')
const { sendAgreementSubmitMessage } = require('../messaging')
const cache = require('../cache')
const schema = require('./schemas/agreement')
const { saveAgreement } = require('../agreement')
const { saveProgress } = require('../progress')

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
          const result = schema.validate(agreement, { allowUnknown: true })
          if (result.error) {
            console.info(`Agreement data is incomplete for ${request.yar.id}, restarting journey`)
            await cache.clear('progress', request.yar.id)
            return h.redirect('/application-task-list')
          }
          await sendAgreementSubmitMessage(agreement, request.yar.id)

          const progress = await cache.update('progress', request.yar.id, { progress: { submitted: true } })
          const progressId = await saveProgress(progress)

          const updatedAgreement = await cache.update('agreement', request.yar.id, { statusId: 2, submitted: true })
          await saveAgreement(updatedAgreement, progressId)
        }
        return h.redirect('/confirmation')
      }
      return h.redirect('/application-task-list')
    }
  }
}]
