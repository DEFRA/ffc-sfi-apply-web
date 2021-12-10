const turf = require('@turf/turf')
const config = require('../config')
const cache = require('../cache')
const getParcelSpatial = require('./parcel-spatial')
const { downloadParcelSpatialFile } = require('../storage')
const { getLandCovers } = require('../api/crown-hosting/land-cover')

const getLand = async (request, parcels) => {
  const { organisation, callerId } = await cache.get(request)
  const { totalHectares, landCovers } = await getLandCovers(organisation.organisationId, callerId)

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
