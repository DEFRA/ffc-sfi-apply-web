const ViewModel = require('./models/search')
const schema = require('../../../schemas/sbi')
const cache = require('../../../../cache')
const { getAgreements } = require('../../../../agreement')
const generateAgreementNumber = require('../../../../agreement-number')

module.exports = [{
  method: 'GET',
  path: '/search-land-business-details',
  options: {
    handler: async (request, h) => {
      const agreementData = await getAgreements()
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-business-details/search-land-business-details', new ViewModel(agreement.sbi, agreementData))
    }
  }
}, {
  method: 'POST',
  path: '/search-land-business-details',
  options: {
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        const agreementData = await getAgreements()
        return h.view('land-business-details/search-land-business-details', new ViewModel(request.payload.sbi, agreementData, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      if (!agreement.agreementNumber) {
        agreement.agreementNumber = generateAgreementNumber()
      }
      await cache.update('agreement', request.yar.id,
        {
          sbi: request.payload.sbi,
          agreementNumber: agreement.agreementNumber,
          agreementLength: 'rolling'
        })
      await cache.update('progress', request.yar.id, {
        progress: { businessDetails: true }
      })
      return h.redirect('land-business-details')
    }
  }
}]
