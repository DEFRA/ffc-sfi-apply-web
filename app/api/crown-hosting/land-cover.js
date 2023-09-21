const { convertToInteger, convertToDecimal } = require('../../conversion')
const { get } = require('./base')

const getLandCovers = async (organisationId, crn, token) => {
  const parcels = await get(`/lms/organisation/${organisationId}/land-covers`, crn, token)
  const landCovers = []

  for (const parcel of parcels.payload) {
    const infos = parcel.info

    for (const info of infos) {
      const landCover = landCovers.find(x => x.name === info.name)
      if (landCover) {
        landCover.area += convertMetresToHectares(info.area)
      } else {
        landCovers.push({
          name: info.name,
          area: convertMetresToHectares(info.area)
        })
      }
    }
  }

  const totalHectares = convertToDecimal(landCovers?.reduce((x, y) => Math.ceil(x + y.area), 0))

  return {
    totalHectares,
    landCovers: landCovers.filter(x => x.area > 0)
      .map(x => ({ ...x, area: convertToDecimal(x.area) }))
  }
}

const convertMetresToHectares = (area) => {
  const metres = convertToInteger(area)
  return Math.ceil(metres / 10000)
}

module.exports = {
  getLandCovers
}
