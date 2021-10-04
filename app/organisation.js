const cache = require('./cache')
const { getOrganisations } = require('./api/crown-hosting')

async function getAllOrganisations (request, error) {
  const agreement = await cache.get('agreement', request.yar.id)
  let sbis = null
  if (error && agreement.availableSbis) {
    sbis = agreement.availableSbis
  } else {
    sbis = await getOrganisations(agreement.crn, agreement.callerId)
    await cache.update('agreement', request.yar.id, { availableSbis: sbis })
  }
  return { sbis, agreement }
}

module.exports = getAllOrganisations
