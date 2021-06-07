const joi = require('joi')
const cache = require('../../cache')
const { getAgreement } = require('../../agreement')
const { getProgress } = require('../../progress')

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
      await cache.clear('agreement', request.yar.id)
      await cache.clear('progress', request.yar.id)

      const agreementId = request.query.agreementId
      const agreement = await getAgreement(agreementId)
      await cache.update('agreement', request.yar.id, agreement.agreementData)

      if (agreement) {
        const progress = await getProgress(agreement.progressId)
        await cache.update('progress', request.yar.id, progress.progress)
      }

      return h.redirect('/application-task-list')
    }
  }
}]
