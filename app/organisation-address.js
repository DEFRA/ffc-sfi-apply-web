const { getOrganisation } = require('./api/crown-hosting')

const getOrganisationAddress = async (sbi, callerId) => {
  const organisation = await getOrganisation(sbi, callerId)
  const address = organisation?.address
    ? formatAddress(organisation.address)
    : ''
  const name = organisation?.name ? organisation.name : ''
  return {
    address,
    name
  }
}

const formatAddress = (address) => {
  return [
    address.address1,
    address.address2,
    address.address3,
    address.postalCode
  ].join(', ')
}

module.exports = getOrganisationAddress
