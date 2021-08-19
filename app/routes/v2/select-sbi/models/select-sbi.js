function ViewModel (value, selectedSbi, error) {
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
    items: mapItems(value, selectedSbi)
  }
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a Single Business Identifier (SBI) '
    }
  }
}

const isChecked = (selectedSbi, value) => {
  if (selectedSbi) {
    return value === selectedSbi.sbi
  }
  return false
}

const mapItems = (value, selectedSbi) => {
  const items = []
  if (value.length > 0) {
    for (const sbi of value) {
      items.push({ value: sbi.sbi, text: sbi.sbi, checked: isChecked(selectedSbi, sbi.sbi) })
    }
  }
  return items
}

module.exports = ViewModel
