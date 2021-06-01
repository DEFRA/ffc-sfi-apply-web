function ViewModel (value, error) {
  this.model = {
    label: {
      text: 'What is your Single Business Identifier (SBI) number?',
      classes: 'govuk-label--l',
      isPageHeading: true
    },
    classes: 'govuk-input--width-10',
    hint: {
      text: 'Single Business Idenifier (SBI)'
    },
    id: 'sbi',
    name: 'sbi',
    inputmode: 'numeric',
    pattern: '[0-9]*',
    spellcheck: false,
    autocomplete: 'off'
  }

  if (value != null) {
    this.model.value = value
  }

  if (error) {
    this.model.errorMessage = {
      text: error.message
    }
  }
}

module.exports = ViewModel
