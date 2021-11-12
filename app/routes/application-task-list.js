const joi = require('joi')
const ViewModel = require('./models/application-task-list')
const cache = require('../cache')
const paymentLevels = require('./payment-levels')
const { getAgreementsBySbi, getAgreement, getProgress } = require('../api/agreement')

module.exports = [{
  method: 'GET',
  path: '/application-task-list',
  options: {
    auth: { strategy: 'jwt' },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      const application = agreement?.application
      const progress = agreement?.progress
      const fundingOption = application?.selectedStandard?.code === 'sfi-improved-grassland' ? 'improved-grassland-soils' : 'arable-soils'
      const paymentLevel = paymentLevels.find(x => x.name === application?.selectedAmbitionLevel?.name)
      const selectedOrganisation = application?.selectedOrganisation
      const savedAgreements = await getAgreementsBySbi(selectedOrganisation.sbi)
      return h.view('application-task-list', new ViewModel(progress, fundingOption, paymentLevel?.paymentLevel, savedAgreements.agreements, selectedOrganisation))
    }
  }
},
{
  method: 'GET',
  path: '/application-task-list/{agreementNumber}/{sbi}',
  options: {
    auth: { strategy: 'jwt' },
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
      await cache.clear('agreement', request.yar.id)
      await cache.update('agreement', request.yar.id,
        {
          application: agreement.agreementData.agreement,
          progress
        })
      return h.redirect('/application-task-list')
    }
  }
}]
