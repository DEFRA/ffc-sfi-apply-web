const cache = require('../../cache')

module.exports = {
  method: 'GET',
  path: '/land-business-details',
  options: {
    handler: async (request, h) => {
      const agreement = await cache.get('agreement', request.yar.id)
      return h.view('land-business-details/land-business-details', { sbi: agreement.sbi })
    }
  }
}
