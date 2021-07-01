const cache = require('../../cache')
const { getOrganisation } = require('../../api/crown-hosting')
const { sendEligibilityCheckMessage } = require('../../messaging')

module.exports = [
  {
    method: 'GET',
    path: '/land-business-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const organisation = await getOrganisation(agreement.sbi)
        const address = [organisation.address.address1,
          organisation.address.address2,
          organisation.address.address3,
          organisation.address.postalCode].join(', ')
        console.log(organisation)
        return h.view('land-business-details/land-business-details', { sbi: agreement.sbi, name: organisation.name, address })
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
