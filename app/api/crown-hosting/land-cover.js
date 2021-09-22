const { convertToInteger, convertToDecimal } = require('../../conversion')
const { get } = require('./base')

const getLandCovers = async (organisationId, callerId) => {
  const parcels = await get(`/lms/organisation/${organisationId}/land-covers`, callerId)
  const landCovers = []

  for (const parcel of parcels.payload) {
    const infos = parcel.info

    for (const info of infos) {
      let area = 0
      if (landCovers.find(x => x.name === info.name) !== undefined) {
        const landCover = landCovers.find(x => x.name === info.name)
        landCover.area += convertMetresToHectares(info.area)
      } else {
        area += convertMetresToHectares(info.area)
        landCovers.push({
          name: info.name,
          area
        })
      }
    }
  }

  const totalHectares = convertToDecimal(landCovers?.reduce((x, y) => Math.ceil(x + y.area), 0))

  return {
    totalHectares,
    landCovers: landCovers.map(x => ({ ...x, area: convertToDecimal(x.area) }))
  }
}

const convertMetresToHectares = (area) => {
  const metres = convertToInteger(area)
  return Math.ceil(metres / 10000)
}

module.exports = {
  getLandCovers
}
