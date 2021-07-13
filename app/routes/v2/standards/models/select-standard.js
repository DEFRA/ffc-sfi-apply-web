
function ViewModel (value, error) {
  this.model = {
    id: 'standard',
    name: 'standard',
    fieldset: {
      legend: {
        text: 'Choose a standard',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: mapItems(value)
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a standard '
    }
  }
}

const mapItems = (value) => {
  const items = []

  for (const standard of value) {
    items.push({ value: standard.value, text: standard.text })
  }
  return items
}

module.exports = ViewModel
