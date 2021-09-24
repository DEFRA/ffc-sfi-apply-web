const joi = require('joi')
const cache = require('../cache')
const handler = require('./handler')
const { getAgreements, getAgreement, getProgress } = require('../api/agreement')
const applyJourneyTaskList = require('./models/apply-journey-task-list')

module.exports = [{
  method: 'GET',
  path: '/application-task-list',
  options: {
    pre: [
      handler.preHandler('application-task-list')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const progress = await cache.get('progress', request.yar.id)
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const savedAgreements = await getAgreements()
      const taskList = applyJourneyTaskList(applyJourney, progress)
      return h.view(journeyItem.key, { taskList, savedAgreements, selectedSbi: applyJourney.selectedSbi, back: journeyItem.back })
    }
  }
},
{
  method: 'GET',
  path: '/application-task-list/{agreementNumber}/{sbi}',
  options: {
    validate: {
      params: joi.object().keys({
        agreementNumber: joi.string().required(),
        sbi: joi.string().required()
      }),
      failAction: async (request, h, error) => {
        return h.response('Bad request').code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const agreement = await getAgreement(request.params.agreementNumber, request.params.sbi)
      const progress = await getProgress(agreement.progressId)
      agreement.agreementData.agreement.agreementNumber = request.params.agreementNumber
      await cache.clear('apply-journey', request.yar.id, agreement.agreementData.agreement)
      await cache.clear('progress', request.yar.id, progress)
      await cache.update('apply-journey', request.yar.id, agreement.agreementData.agreement)
      await cache.update('progress', request.yar.id, progress)
      return h.redirect('/application-task-list')
    }
  }
}]
