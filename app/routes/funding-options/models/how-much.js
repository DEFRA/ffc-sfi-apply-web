function ViewModel (selectedStandard, selectedParcels, payload) {
  const landInHectares = payload ? getLandInHectares(payload, selectedStandard.parcels) : selectedParcels
  const items = getAllItems(selectedStandard, landInHectares)
  const parcelArea = landInHectares ? landInHectares.reduce((accum, item) => accum + item.value, 0) : 0
  const error = landInHectares && landInHectares.length === 0
  const invalidValues = landInHectares && landInHectares.some(element => !element.valid)
  this.model = {
    landInHectares,
    parcelArea,
    error,
    invalidValues,
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
      text: `${x.id}, ${Number(x.area)}ha`,
      value: `${x.id}`,
      checked: isChecked(selectedParcels, x.id),
      textBoxValue: selectedParcels && selectedParcels.find(item => item.id === x.id)
        ? selectedParcels.find(item => item.id === x.id).value
        : Number(x.area).toFixed(2),
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
