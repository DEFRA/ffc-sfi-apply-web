
function ViewModel (value, error) {
  this.model = {
    id: 'sbi',
    name: 'sbi',
    fieldset: {
      legend: {
        text: 'Choose your Single Business Identifier (SBI)',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: mapItems(value)
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a Single Business Identifier (SBI) '
    }
  }
}

const mapItems = (value) => {
  const items = []

  for (const sbi of value) {
    items.push({ value: sbi, text: sbi })
  }
  return items
}

module.exports = ViewModel
