function ViewModel (sbi, error) {
  this.model = {
    id: 'user-search',
    name: 'sbi',
    label: {
      text: 'Search for an organisation by SBI number',
      classes: 'govuk-!-font-weight-bold'
    },
    input: {
      classes: 'govuk-input--width-20'
    },
    button: {
      classes: 'search-button'
    },
    inputmode: 'numeric',
    value: sbi
  }

  if (error) {
    this.model.errorMessage = {
      text: error.message
    }
  }
}

module.exports = ViewModel
