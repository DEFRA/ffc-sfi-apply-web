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
    items: mapStandards(eligibleFunding, selected)
  }

  if (error) {
    this.model.error = {
      errorList: [
        {
          text: 'Select an option'
        }
      ]
    }
  }
}

module.exports = ViewModel
