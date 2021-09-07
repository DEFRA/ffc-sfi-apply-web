function ViewModel (value, selectedSbi, error) {
  this.model = {
    id: 'sbi',
    name: 'sbi',
    fieldset: {
      legend: {
        text: 'Which business do you want to apply for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: mapItems(value, selectedSbi)
  }
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a business you would like to apply for'
    }
  }
}

const isChecked = (selectedSbi, value) => {
  if (selectedSbi) {
    return value === selectedSbi.sbi
  }
  return false
}

const mapItems = (businessDetails, selectedSbi) => {
  const items = []
  if (businessDetails.length > 0) {
    for (const businessDetail of businessDetails) {
      items.push(
        {
          value: businessDetail.sbi,
          text: businessDetail.name,
          hint: {
            text: `SBI number: ${businessDetail.sbi}`
          },
          checked: isChecked(selectedSbi, businessDetail.sbi)
        })
    }
  }
  return items
}

module.exports = ViewModel
