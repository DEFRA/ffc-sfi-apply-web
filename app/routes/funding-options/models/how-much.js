function ViewModel (selectedStandard, selectedParcels) {
  const items = getAllItems(selectedStandard, selectedParcels)
  console.log(items)
  this.model = {
    checkboxItems: items.checkboxItems,
    totalHa: items.totalHa,
    selectedStandardCode: selectedStandard.code
  }
}

const getLandInHectares = (payload, parcels) => {
  const data = Object.entries(payload).map(entry => {
    const [name, value] = entry
    const [, parcelId] = name.split('_')
    if (payload.parcels && payload.parcels.includes(parcelId)) {
      const parcelArea = parcels.find(parcel => {
        return parcel.id === parcelId
      })

      return {
        id: parcelArea.id,
        value: Number(value),
        area: parcelArea.area,
        valid: value !== '' && value > 0 && value <= parcelArea.area
      }
    }
  })

  return data.filter(x => x !== undefined)
}

const getAllItems = (selectedStandard, selectedParcels) => {
  const parcels = selectedStandard?.parcels
  const checkboxItems = parcels.map(x => (
    {
      text: `${x.id}, ${Number(x.area).toFixed(2)}ha`,
      value: `${x.id}`,
      checked: isChecked(selectedParcels, x.id),
      warnings: []
    }
  ))

  const totalHa = parcels?.reduce((acc, cur) => acc + cur.area, 0)

  return { checkboxItems, totalHa }
}

const isChecked = (selectedParcels, value) => {
  if (selectedParcels) {
    return !!selectedParcels.find(parcels => {
      return parcels.id === value
    })
  }
  return false
}

module.exports = ViewModel
