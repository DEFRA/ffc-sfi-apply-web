const { getBySbi } = require('../../agreement/get')
const cache = require('../../cache')

const getOrganisationInformation = async (request) => {
  const { agreement, data } = await cache.get(request)
  // if SBI not provided as query parameter, then use previously selected organisation from cache if exists.
  const sbi = request.query?.sbi ?? agreement?.organisation?.sbi
  const organisation = await getEligibleOrganisations(sbi, data)
  const agreements = await getAgreements(sbi)

  return { organisation, agreements }
}

const getEligibleOrganisations = (sbi, data) => {
  return data.eligibleOrganisations.find(x => x.sbi === parseInt(sbi))
}

const getAgreements = async (sbi) => {
  const incompleteApplications = await getBySbi(sbi)
  const { agreements } = incompleteApplications
  return agreements
}

module.exports = getOrganisationInformation
