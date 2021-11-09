const turf = require('@turf/turf')
const config = require('../config')
const cache = require('../cache')
const getParcelSpatial = require('./parcel-spatial')
const { downloadParcelSpatialFile } = require('../storage')

const getMapParcels = async (request) => {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  const sbi = applyJourney.selectedOrganisation.sbi

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
