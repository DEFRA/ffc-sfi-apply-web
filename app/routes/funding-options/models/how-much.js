const { convertToInteger, convertToDecimal } = require('../../../conversion')

function ViewModel (applyJourney, parcelStandards, payload) {
  const selectedStandard = groupParcels(parcelStandards)
  const selectedParcels = applyJourney.selectedParcels
  const landInHectares = payload ? getLandInHectares(payload, selectedStandard.parcels) : selectedParcels
  const items = getAllItems(selectedStandard, landInHectares)
  const parcelArea = landInHectares ? landInHectares.reduce((x, y) => x + convertToInteger(y.value), 0) : 0
  const error = landInHectares && landInHectares.length === 0
  const invalidValues = landInHectares && landInHectares.some(element => !element.valid)
  this.model = {
    landInHectares,
    parcelArea: convertToDecimal(parcelArea),
    error,
    invalidValues,
    checkboxItems: items.checkboxItems,
    totalHa: items.totalHa,
    selectedStandardCode: selectedStandard.code,
    selectedParcels: selectedParcels ?? [],
    parcelStandards
  }
}

const groupParcels = (parcelStandards) => {
  const result = []
  parcelStandards.landCovers.reduce((acc, cur) => {
    if (!acc[cur.parcelId]) {
      acc[cur.parcelId] = { parcelId: cur.parcelId, area: 0, warnings: [] }
      result.push(acc[cur.parcelId])
    }
    acc[cur.parcelId].area += parseFloat(cur.area)
    return acc
  }, {})
  parcelStandards.parcels = result
  return parcelStandards
}

const getLandInHectares = (payload, parcels) => {
  const data = Object.entries(payload).map(entry => {
    const [name, value] = entry
    const [, parcelId] = name.split('_')
    if (payload.parcels && payload.parcels.includes(parcelId)) {
      const parcelArea = parcels.find(parcel => {
        return parcel.parcelId === parcelId
      })

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
  const parcels = selectedStandard?.parcels
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
