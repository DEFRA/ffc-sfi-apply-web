
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

  if (value.length > 0) {
    for (const sbi of value) {
      items.push({ value: sbi.sbi, text: sbi.sbi })
    }
  }
  return items
}

module.exports = ViewModel
