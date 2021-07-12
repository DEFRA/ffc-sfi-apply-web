
function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your Customer Reference Number (CRN)?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    id: 'crn',
    name: 'crn',
    inputmode: 'numeric',
    pattern: '[0-9]*',
    spellcheck: false,
    autocomplete: 'off',
    value
  }

  if (error) {
    this.model.errorMessage = {
      text: error.message
    }
  }
}

module.exports = ViewModel
