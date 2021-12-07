function ViewModel (value, error) {
    this.model = {
      id: 'user-search',
      name: 'user-search',
      label: {
        text: 'Search for an organisation by SBI number',
        classes: 'govuk-!-font-weight-bold',
      },
      input: {
        classes: "govuk-input--width-20"
      },
      button: {
        classes: "search-button"
      },
      hint: {
        text: 'Must be a 9 digit number'
      },
      inputmode: 'numeric'
    }
  
    if (error) {
      this.model.errorMessage = {
        text: error.message
      }
    }
  }
  
  module.exports = ViewModel
  