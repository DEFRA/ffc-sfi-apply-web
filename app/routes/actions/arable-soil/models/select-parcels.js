const { convertToInteger, convertToDecimal } = require('../../../../conversion')

function ViewModel (selectedLandCovers, parcelStandards, payload) {
  const parcels = groupParcels(parcelStandards.landCovers)
  const landInHectares = payload ? getLandInHectares(payload, parcels) : selectedLandCovers
  const items = getAllItems(parcels, landInHectares)
  const error = payload && payload.length === 0
  this.model = {
    landInHectares,
    error,
    checkboxItems: items.checkboxItems,
    totalHa: items.totalHa,
    selectedStandardCode: parcelStandards.code,
    selectedParcels: selectedLandCovers ?? [],
    parcelStandards
  }
}

const groupParcels = (landCovers) => {
  const parcels = []
  landCovers.reduce((acc, cur) => {
    if (!acc[cur.parcelId]) {
      acc[cur.parcelId] = { parcelId: cur.parcelId, area: 0, warnings: [] }
      parcels.push(acc[cur.parcelId])
    }
    acc[cur.parcelId].area += parseFloat(cur.area)
    return acc
  }, {})
  return parcels
}

const getLandInHectares = (payload, parcels) => {
  const data = Object.entries(payload).map(entry => {
    const [name, value] = entry
    const [, parcelId] = name.split('_')
    if (payload.parcels && payload.parcels.includes(parcelId)) {
      const parcelArea = parcels.find(x => x.parcelId === parcelId)

      return {
        parcelId: parcelArea.parcelId,
        value: value,
        area: parcelArea.area,
        valid: value !== '' && Number(value) > 0 && Number(value) <= Number(parcelArea.area)
      }
    }

    return null
  })

  return data.filter(x => x !== null)
}

const getAllItems = (selectedStandard, selectedParcels) => {
  const parcels = selectedStandard
  const checkboxItems = parcels.map(x => ({
    text: `${x.parcelId}`,
    value: `${x.parcelId}`,
    hint: {
      text: `${x.area}ha`
    },
    checked: isChecked(selectedParcels, x.parcelId),
    textBoxValue: selectedParcels && selectedParcels.find(item => item.parcelId === x.parcelId)
      ? selectedParcels.find(item => item.parcelId === x.parcelId).value
      : Number(x.area).toFixed(2),
    warnings: []
  }))

  const totalHa = convertToDecimal(parcels?.reduce((acc, cur) => acc + convertToInteger(cur.area), 0))

  return { checkboxItems, totalHa }
}

const isChecked = (selectedParcels, value) => {
  if (selectedParcels) {
    return !!selectedParcels.find(parcels => {
      return parcels.parcelId === value
    })
  }
  return false
}

module.exports = ViewModel
