function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    label: {
      text: 'Land in hectares'
    },
    classes: 'govuk-input--width-5',
    id: 'landInHectares',
    name: 'landInHectares',
    suffix: {
      text: 'ha'
    },
    spellcheck: false,
    value
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please enter how much of your land will you use for the primary actions.'
    }
  }
}

module.exports = ViewModel
