const turf = require('@turf/turf')
const config = require('./config')
const cache = require('./cache')
const { getParcelSpatial } = require('./parcels')
const { downloadParcelSpatialFile } = require('./storage')

const getMapParcels = async (request, parcels) => {
  const agreement = await cache.get('agreement', request.yar.id)
  const application = agreement?.application
  const sbi = application.selectedOrganisation.sbi

  const mapStyle = ''
  const apiKey = config.osMapApiKey || ''

  if (!parcels) {
    parcels = await getParcels(request)
  }

  let center = []

  if (parcels.features.length) {
    const centroid = turf.centroid(parcels)
    center = centroid.geometry.coordinates
  }

  return {
    apiKey,
    parcels,
    center,
    mapStyle,
    sbi
  }
}

const getParcels = async (request) => {
  const { parcelSpatial } = await getParcelSpatial(request)
  return downloadParcelSpatialFile(parcelSpatial.filename)
}

module.exports = getMapParcels
