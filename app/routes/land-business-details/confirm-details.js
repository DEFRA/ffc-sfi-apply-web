const cache = require('../../cache')
const { getOrganisation } = require('../../api/crown-hosting')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        console.log(applyJourney)
        const organisation = await getOrganisation(applyJourney.selectedSbi, applyJourney.callerId)
        const address = organisation?.address ? [organisation.address.address1,
          organisation.address.address2,
          organisation.address.address3,
          organisation.address.postalCode].join(', ') : ''
        const name = organisation?.name ? organisation.name : ''
        return h.view('land-business-details/confirm-details', { sbi: applyJourney.selectedSbi.sbi, name, address })
      }
    }
  }]
