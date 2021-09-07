const standards = require('../standards')

function ViewModel (values, selected, error) {
  this.model = {
    id: 'standard',
    name: 'standard',
    fieldset: {
      legend: {
        text: 'What funding do you want to apply for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: mapStandards(values, selected)
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Please choose the funding you would like to apply for '
    }
  }
}

const isChecked = (selected, value) => {
  if (selected) {
    return value === selected.code
  }
  return false
}

const mapStandards = (values, selected) => {
  return values.filter(item => item.parcels.length > 0)
    .map(x => {
      return {
        text: standards.find(s => s.code === x.code).name,
        value: x.code,
        checked: isChecked(selected, x.code)
      }
    })
}

module.exports = ViewModel
