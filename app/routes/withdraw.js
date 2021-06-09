const joi = require('joi')
const ViewModel = require('./models/withdraw')
const { sendAgreementWithdrawMessage } = require('../messaging')
const { saveAgreement, loadAgreement } = require('../agreement')
const { saveProgress } = require('../progress')
const cache = require('../cache')

module.exports = [{
  method: 'GET',
  path: '/withdraw',
  options: {
    handler: async (request, h) => {
      await loadAgreement(request)
      return h.view('withdraw', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/withdraw',
  options: {
    validate: {
      payload: joi.object({
        withdraw: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('withdraw', new ViewModel(request.payload.withdraw, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      if (request.payload.withdraw) {
        const agreement = await cache.get('agreement', request.yar.id)
        if (agreement.submitted) {
          await sendAgreementWithdrawMessage(agreement, request.yar.id)
          const updatedAgreement = await cache.update('agreement', request.yar.id, { withdrawn: true, statusId: 3 })
          const progress = await cache.update('progress', request.yar.id, { progress: { submitted: true } })
          const progressId = await saveProgress(progress)
          await saveAgreement(updatedAgreement, progressId)
          await cache.clear('eligibility', request.yar.id)
          await cache.clear('agreement', request.yar.id)
          await cache.clear('progress', request.yar.id)
          return h.redirect(`/withdrawn?agreementNumber=${agreement.agreementNumber}`)
        }
      }
      return h.redirect('/application-task-list')
    }
  }
}]