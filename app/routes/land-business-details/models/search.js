function ViewModel (value, agreements, error) {
  this.model = {
    searchSbiNumber: buildSearchSbiNumber(value, error),
    agreements: agreements
  }
}

const buildSearchSbiNumber = (value, error) => {
  const model = {
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
    model.value = value
  }

  if (error) {
    model.errorMessage = {
      text: error.message
    }
  }

  return model
}

module.exports = ViewModel
