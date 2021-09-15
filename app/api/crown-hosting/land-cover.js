const { get } = require('./base')

const getLandCover = async (organisationId, callerId) => {
  const parcels = await get(`/lms/organisation/${organisationId}/land-covers`, callerId)
  parcels.payload.forEach(p => p.info.forEach(i => (i.area /= 10000.0)))

  const standards = [
    {
      code: '130',
      name: 'Permanent grassland',
      parcels: [],
      totalHa: 0
    },
    {
      code: '110',
      name: 'Arable land',
      parcels: [],
      totalHa: 0
    }
  ]

  for (const parcel of parcels.payload) {
    const infos = parcel.info
    const totalHa = 0

    for (const standard of standards) {
      let area = 0

      // Sum the parcel area eligible for this standard
      for (const info of infos) {
        if (info.area > 0 && info.code === standard.code) {
          area += info.area
        }
      }

      if (area > 0) {
        // Add the parcel with the adjusted area to the standard
        standard.parcels.push({
          id: parcel.id,
          area // : Number(area).toFixed(2)
        })
      }

      standard.totalHa += totalHa + area
    }
  }

  return standards
}

module.exports = {
  getLandCover
}
