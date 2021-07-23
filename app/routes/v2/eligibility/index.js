const cache = require('../../../cache')
const { getEligibilityCheck } = require('../../../api/crown-hosting')

module.exports = [
  {
    method: 'GET',
    path: '/v2/eligibility-check',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)

        const isEligible = await getEligibilityCheck(applyJourney.selectedSbi.organisationId, applyJourney.callerId)

        const view = isEligible ? 'eligibility-check' : 'not-eligible'
        await cache.update('apply-journey', request.yar.id, { eligibility: isEligible })
        return h.view(`v2/eligibility/${view}`, { sbi: applyJourney.selectedSbi.sbi, eligibility: isEligible })
      }
    }
  },
  {
    method: 'POST',
    path: '/v2/eligibility-check',
    options: {
      handler: async (request, h) => {
        const sbi = request.payload.sbi
        await cache.update('apply-journey', request.yar.id, { sbi })
        return h.redirect('/v2/standards')
      }
    }
  }
]
