const cache = require('../../cache')
const { getOrganisations } = require('../../api/crown-hosting')

async function getAllOrganisations (request, error) {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  let sbis = null
  if (error && applyJourney.availableSbis) {
    sbis = applyJourney.availableSbis
  } else {
    sbis = await getOrganisations(applyJourney.crn, applyJourney.callerId)
    await cache.update('apply-journey', request.yar.id, { availableSbis: sbis })
  }
  return { sbis, applyJourney }
}

module.exports = getAllOrganisations
