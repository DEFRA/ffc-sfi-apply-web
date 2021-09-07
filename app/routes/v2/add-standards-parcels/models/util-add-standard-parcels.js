const cache = require('../../../../cache')

async function getAllItems (request) {
  const applyJourney = await cache.get('apply-journey', request.yar.id)
  const parcels = applyJourney.selectedStandard.parcels

  const checkboxItems = parcels.map(x => (
    {
      text: `Parcel ${x.id} : ${Number(x.area).toFixed(2)}ha of ${applyJourney.selectedStandard.name}`,
      value: `${x.id}`,
      checked: isChecked(applyJourney.selectedParcels, x.id),
      warnings: []
    }
  ))

  const totalHa = parcels.reduce((acc, cur) => acc + cur.area, 0)

  return { applyJourney, checkboxItems, totalHa }
}

const isChecked = (selectedParcels, value) => {
  if (selectedParcels) {
    return !!selectedParcels.find(parcels => {
      return parcels.id === value
    })
  }
  return false
}

module.exports = getAllItems
