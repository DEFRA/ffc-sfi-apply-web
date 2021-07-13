const { get } = require('./base')

const getOrganisation = async (sbi) => {
  const url = `organisation/search/sbi?sbi=${sbi}`
  const data = await get(url)
  const organisation = JSON.parse(data.payload.toString())
  return organisation.code ? {} : organisation._data[0]
}

module.exports = getOrganisation
