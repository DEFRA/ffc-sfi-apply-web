const joi = require('joi')
const ViewModel = require('./models/task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')
const { getAgreementsBySbi, getAgreement, getProgress } = require('../api/agreement')

module.exports = [{
  method: 'GET',
  path: '/task-list',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get(request)
      const application = agreement?.application
      const progress = agreement?.progress
      const fundingOption = application?.selectedStandard?.code === 'sfi-improved-grassland' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === application?.selectedAmbitionLevel?.name)
      const selectedOrganisation = application?.selectedOrganisation
      const savedAgreements = await getAgreementsBySbi(selectedOrganisation.sbi)
      return h.view('task-list', new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, savedAgreements.agreements, selectedOrganisation))
    }
  }
},
{
  method: 'GET',
  path: '/task-list/{agreementNumber}/{sbi}',
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
      await cache.clear(request)
      await cache.update(request,
        {
          application: agreement.agreementData.agreement,
          progress
        })
      return h.redirect('/task-list')
    }
  }
}]
