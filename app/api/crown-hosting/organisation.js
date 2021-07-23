const { get } = require('./base')

const getOrganisation = async (sbi, callerId) => {
  const url = `organisation/${sbi.organisationId}`
  const data = await get(url, callerId)
  return data.payload._data === null ? {} : data.payload._data
}

module.exports = getOrganisation
