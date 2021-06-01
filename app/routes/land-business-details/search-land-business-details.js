const ViewModel = require('../models/search')
const schema = require('../schemas/sbi')
const cache = require('../../cache')

module.exports = [{
  method: 'GET',
  path: '/search-land-business-details',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-business-details/search-land-business-details', new ViewModel(agreement.sbi))
    }
  }
}, {
  method: 'POST',
  path: '/search-land-business-details',
  options: {
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        return h.view('land-business-details/search-land-business-details', new ViewModel(request.payload.sbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      await cache.update('agreement', request.yar.id, request.payload)
      await cache.update('progress', request.yar.id, { businessDetails: true })
      return h.redirect('land-business-details')
    }
  }
}]
