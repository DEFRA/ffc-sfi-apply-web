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
        landCover.area += info.area /= 10000.0
      } else {
        area += info.area /= 10000.0
        landCovers.push({
          name: info.name,
          area
        })
      }
    }
  }

  return landCovers
}

module.exports = {
  getLandCovers
}
