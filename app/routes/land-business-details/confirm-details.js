const cache = require('../../cache')
const getOrganisationAddress = require('../../organisation-address')
const { getLandCover } = require('../../api/crown-hosting/land-cover')

module.exports = [
  {
    method: 'GET',
    path: '/confirm-details',
    options: {
      handler: async (request, h) => {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        const landCoverDetails = await getLandCover(applyJourney.selectedSbi.organisationId, applyJourney.callerId)
        const organisationAddress = await getOrganisationAddress(applyJourney.selectedSbi, applyJourney.callerId)

        const totalHa = landCoverDetails?.reduce((acc, cur) => acc + cur.totalHa, 0)
        return h.view('land-business-details/confirm-details',
          {
            sbi: applyJourney.selectedSbi.sbi,
            name: organisationAddress.name,
            address: organisationAddress.address,
            totalHa: Number(totalHa).toFixed(2),
            standards: landCoverDetails
          })
      }
    }
  }]
