function ViewModel (eligibleFunding, selected, error) {
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
    items: mapStandards(eligibleFunding, selected)
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

const mapStandards = (eligibleFunding, selected) => {
  return eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(x => {
      return {
        text: x.name,
        value: x.code,
        checked: isChecked(selected, x.code)
      }
    })
}

module.exports = ViewModel
