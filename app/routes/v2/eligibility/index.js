const cache = require('../../../cache')
const { sendEligibilityCheckMessage } = require('../../../messaging')
const getPollingResponse = require('../../../polling')

module.exports = [
  {
    method: 'GET',
    path: '/v2/eligibility-check',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        await sendEligibilityCheckMessage({ sbi: applyJourney.sbi }, request.yar.id)

        const response = await getPollingResponse(request.yar.id, '/eligibility')
        const isEligible = response.isEligible

        const view = isEligible ? 'eligibility-check' : 'not-eligible'

        await cache.update('apply-journey', request.yar.id, { eligibility: isEligible})
        return h.view(`v2/eligibility/${view}`, { sbi: applyJourney.sbi, eligibility: isEligible })
      }
    }
  }
]
