const cache = require('../../cache')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(agreement.selectedOrganisation.organisationId, agreement.callerId)

        return h.view('land-business-details/confirm-details',
          {
            sbi: agreement.selectedOrganisation.sbi,
            name: agreement.selectedOrganisation.name,
            address: agreement.selectedOrganisation.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
