const joi = require('joi')
const ViewModel = require('./models/application-task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')
const handler = require('./handler')
const { getAgreements, getAgreement, getProgress } = require('../api/agreement')
const applyJourneyTaskList = require('./models/apply-journey-task-list')

module.exports = [{
  method: 'GET',
  path: '/application-task-list',
  options: {
    pre: [
      handler.preHandler('/application-task-list')
    ],
    handler: async (request, h) => {
      const journeyItem = request.pre.journeyItem
      const progress = await cache.get('progress', request.yar.id)
      const applyJourney = await cache.get('apply-journey', request.yar.id)
      const fundingOption = applyJourney?.selectedStandard?.code === '130' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === applyJourney?.selectedAmbitionLevel?.name)
      const savedAgreements = await getAgreements()
      const viewModel = new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, savedAgreements, applyJourney.selectedSbi, journeyItem)
      viewModel.taskList = applyJourneyTaskList(progress)
      return h.view(journeyItem.key, viewModel)
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
