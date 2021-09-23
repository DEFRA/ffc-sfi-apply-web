function ViewModel (value, selectedSbi, journeyItem, error) {
  this.model = {
    id: 'sbi',
    name: 'sbi',
    back: journeyItem.back,
    next: journeyItem.next,
    route: journeyItem.route,
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
  if (businessDetails) {
    for (const businessDetail of businessDetails) {
      items.push(
        {
          value: businessDetail.sbi,
          text: businessDetail.name,
          hint: {
            text: `SBI: ${businessDetail.sbi}`
          },
          checked: isChecked(selectedSbi, businessDetail.sbi)
        })
    }
  }
  return items
}

module.exports = ViewModel
