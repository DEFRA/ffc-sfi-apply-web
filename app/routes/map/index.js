const { getParcels } = require('../../api/map')
const config = require('../../config')

module.exports = {
  method: 'GET',
  path: '/map',
  options: {
    handler: async (request, h) => {
      const sbi = request.query.sbi
      const mapStyle = request.query.mapStyle || ''
      const apiKey = config.osMapApiKey || ''
      console.log('API KEY', apiKey)
      const { parcels, center } = await getParcels(sbi)
      return h.view('map/map', { apiKey, sbi, parcels, center, mapStyle })
    }
  }
}
