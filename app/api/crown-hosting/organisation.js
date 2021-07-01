const { get } = require('./base')

const getOrganisation = async (sbi) => {
  const url = `https://ffc-sfi-api-gateway-pr1.ffc.snd.azure.defra.cloud/organisation/search/sbi/${sbi}`
  const organisation = await get(url)
  return JSON.parse(organisation.payload.toString())._data[0]
}

module.exports = getOrganisation
