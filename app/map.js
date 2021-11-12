const turf = require('@turf/turf')
const config = require('./config')
const cache = require('./cache')
const { getParcelSpatial } = require('./parcels')
const { downloadParcelSpatialFile } = require('./storage')

const getMapParcels = async (request) => {
  const agreement = await cache.get('agreement', request.yar.id)
  const application = agreement?.application
  const sbi = application.selectedOrganisation.sbi

  const mapStyle = ''
  const apiKey = config.osMapApiKey || ''
  const { parcelSpatial } = await getParcelSpatial(request)
  const parcels = await downloadParcelSpatialFile(parcelSpatial.filename)

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

module.exports = getMapParcels
