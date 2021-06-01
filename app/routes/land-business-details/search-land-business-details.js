const ViewModel = require('../models/search')
const schema = require('../schemas/sbi')
const sessionHandler = require('../../session/session-handler')

module.exports = [{
  method: 'GET',
  path: '/search-land-business-details',
  options: {
    handler: (request, h) => {
      const agreement = sessionHandler.get(request, 'agreement')
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
      sessionHandler.update(request, 'agreement', request.payload)
      return h.redirect(`land-business-details?sbi=${request.payload.sbi}`)
    }
  }
}]
