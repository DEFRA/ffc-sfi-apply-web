const { get } = require('./base')

const getSBIs = async (crn, callerId) => {
  const url = `organisation/person/${callerId}/summary?search=`
  const data = await get(url, callerId)

  const sbis = data?.payload?._data?.map(organisation => ({
    sbi: organisation.sbi,
    organisationId: organisation.id
  }))

  return sbis ?? null
}

module.exports = getSBIs
