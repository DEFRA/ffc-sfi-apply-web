const cache = require('../../cache')
const getOrganisationAddress = require('../../organisation-address')
const { getLandCovers } = require('../../api/crown-hosting/land-cover')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const agreement = await cache.get('agreement', request.yar.id)
        const { totalHectares, landCovers } = await getLandCovers(agreement.selectedSbi.organisationId, agreement.callerId)
        const organisationAddress = await getOrganisationAddress(agreement.selectedSbi, agreement.callerId)

        return h.view('land-business-details/confirm-details',
          {
            sbi: agreement.selectedSbi.sbi,
            name: organisationAddress.name,
            address: organisationAddress.address,
            totalHa: totalHectares,
            landCovers
          })
      }
    }
  }]
