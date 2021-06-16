function ViewModel (value, error) {
  this.model = {
    landInHectares: landInHectares(value?.landInHectares, value?.landParcels, error),
    landParcels: value?.landParcels
  }
}

const landInHectares = (value, landParcels, error) => {
  const rows = []

  landParcels.features.forEach(element => {
    rows.push(createRowItem(element.feature.properties.sheet_id + element.feature.properties.parcel_id))
  })

  return rows
}

const createRowItem = (id) => {
  return {
    label: {
      text: 'Land in hectares'
    },
    id: id,
    key: {
      text: id
    },
    value: {
      text: ''// agreementOptions.find(x => x.value === values.soilAssessment).text
    }
  }
}

module.exports = ViewModel
