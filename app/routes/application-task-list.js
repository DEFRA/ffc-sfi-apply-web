const joi = require('joi')
const ViewModel = require('./models/application-task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')
const { getAgreementsBySbi, getAgreement, getProgress } = require('../api/agreement')

module.exports = [{
  method: 'GET',
  path: '/application-task-list',
  options: {
    handler: async (request, h) => {
      const progress = await cache.get('progress', request.yar.id)
      const agreement = await cache.get('agreement', request.yar.id)
      const fundingOption = agreement?.selectedStandard?.code === 'sfi-improved-grassland' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === agreement?.selectedAmbitionLevel?.name)
      const selectedOrganisation = agreement?.selectedOrganisation
      const savedAgreements = await getAgreementsBySbi(selectedOrganisation.sbi)
      return h.view('application-task-list', new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, savedAgreements.agreements, agreement.selectedOrganisation))
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
      await cache.clear('agreement', request.yar.id, agreement.agreementData.agreement)
      await cache.clear('progress', request.yar.id, progress)
      await cache.update('agreement', request.yar.id, agreement.agreementData.agreement)
      await cache.update('progress', request.yar.id, progress)
      return h.redirect('/application-task-list')
    }
  }
}]
