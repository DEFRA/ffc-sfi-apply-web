const { mapStandards } = require('../../../what-funding')

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
    hint: {
      text: 'Choose all that apply.'
    },
    items: mapStandards(eligibleFunding, selected).map(funding => { funding.checked = isChecked(selected, funding.value); return funding })
  }

  if (error) {
    this.model.error = {
      titleText: 'There is a problem',
      errorList: [
        {
          text: 'Select an option'
        }
      ]
    }
  }
}

const isChecked = (selected, value) => {
  if (selected.length) {
    return selected.includes(value)
  }
  return false
}

module.exports = ViewModel
