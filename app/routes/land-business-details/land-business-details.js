const cache = require('../../cache')
const { sendEligibilityCheckMessage } = require('../../messaging')

module.exports = [
  {
    method: 'GET',
    path: '/land-business-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        return h.view('land-business-details/land-business-details', { sbi: agreement.sbi })
      }
    }
  },
  {
    method: 'POST',
    path: '/land-business-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const { sbi } = agreement

        await sendEligibilityCheckMessage({ sbi }, request.yar.id)

        return h.redirect('/check-eligibility/eligible')
      }
    }
  }
]
