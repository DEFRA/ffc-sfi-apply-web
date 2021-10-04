const { getOrganisation } = require('./api/crown-hosting')

const getOrganisationAddress = async (selectedSbi, callerId) => {
  const organisation = await getOrganisation(selectedSbi.organisationId, callerId)
  const address = organisation?.address ? [organisation.address.address1,
    organisation.address.address2,
    organisation.address.address3,
    organisation.address.postalCode].join(', ') : ''
  const name = organisation?.name ? organisation.name : ''
  return {
    address,
    name
  }
}

module.exports = getOrganisationAddress
