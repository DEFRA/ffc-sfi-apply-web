const turf = require('@turf/turf')
const config = require('../config')
const cache = require('../cache')
const getParcelSpatial = require('./parcel-spatial')
const { downloadParcelSpatialFile } = require('../storage')
const { getLandCovers } = require('../api/crown-hosting/land-cover')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

const getLand = async (request, parcels) => {
  const { agreement, crn } = await cache.get(request)
  const { organisation } = agreement
  const { totalHectares, landCovers } = await getLandCovers(organisation.organisationId, crn, request.state[AUTH_COOKIE_NAME])

  const mapStyle = ''
  const apiKey = config.osMapApiKey || ''

  if (!parcels) {
    parcels = await getParcels(request)
  }

  let center = []

  if (parcels?.features.length) {
    const centroid = turf.centroid(parcels)
    center = centroid.geometry.coordinates
  }

  return {
    apiKey,
    parcels,
    center,
    mapStyle,
    totalHectares,
    landCovers
  }
}

const getParcels = async (request) => {
  const parcels = await getParcelSpatial(request)
  if (parcels) {
    return downloadParcelSpatialFile(parcels.filename)
  }
}

module.exports = getLand
