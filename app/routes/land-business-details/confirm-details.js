const cache = require('../../cache')
const getOrganisationAddress = require('../../organisation-address')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')
const handler = require('../handler')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      pre: [
        handler.preHandler('confirm-details')
      ],
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(applyJourney.selectedSbi.organisationId, applyJourney.callerId)
        const organisationAddress = await getOrganisationAddress(applyJourney.selectedSbi, applyJourney.callerId)
        const journeyItem = request.pre.journeyItem
        return h.view(journeyItem.view,
          {
            sbi: applyJourney.selectedSbi.sbi,
            name: organisationAddress.name,
            address: organisationAddress.address,
            totalHa: totalHectares,
            landCovers,
            back: journeyItem.back,
            next: journeyItem.next
          })
      }
    }
  }]
