const { get } = require('./base')

const getOrganisation = async (organisationId, callerId) => {
  const url = `/organisation/${organisationId}`
  const data = await get(url, callerId)
  return data.payload._data === null ? {} : data.payload._data
}

const getOrganisations = async (crn, callerId) => {
  const url = `/organisation/person/${callerId}/summary?search=`
  const data = await get(url, callerId)
  return data?.payload?._data?.map(organisation => ({
    sbi: organisation.sbi,
    name: organisation.name,
    organisationId: organisation.id
  }))
}

module.exports = {
  getOrganisation,
  getOrganisations
}
