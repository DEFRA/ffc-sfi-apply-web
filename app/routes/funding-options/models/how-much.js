function ViewModel (selectedStandard, selectedParcels) {
  const items = getAllItems(selectedStandard, selectedParcels)
  console.log(items)
  this.model = {
    checkboxItems: items.checkboxItems,
    totalHa: items.totalHa,
    selectedStandardCode: selectedStandard.code
  }
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
