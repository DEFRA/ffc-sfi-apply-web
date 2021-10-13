function ViewModel (value, selectedOrganisation, error) {
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
    items: mapItems(value, selectedOrganisation)
  }
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a business you would like to apply for'
    }
  }
}

const isChecked = (selectedOrganisation, value) => {
  if (selectedOrganisation) {
    return value === selectedOrganisation.sbi
  }
  return false
}

const mapItems = (businessDetails, selectedOrganisation) => {
  const items = []
  if (businessDetails) {
    for (const businessDetail of businessDetails) {
      items.push(
        {
          value: businessDetail.sbi,
          text: businessDetail.name,
          hint: {
            html: `${businessDetail.address}<br>SBI number: ${businessDetail.sbi}`
          },
          checked: isChecked(selectedOrganisation, businessDetail.sbi)
        })
    }
  }
  return items
}

module.exports = ViewModel
