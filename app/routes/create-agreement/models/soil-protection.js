function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'soilProtection',
    name: 'soilProtection',
    fieldset: {
      legend: {
        text: 'Can you protect your soil from runoff and erosion?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'yes',
        text: 'Yes, I can do this'
      },
      {
        value: 'unknown',
        text: 'I don\'t know yet'
      },
      {
        divider: 'or'
      },
      {
        value: 'no',
        text: 'I cannot do this'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please confirm if you can protect your soil.'
    }
  }
}

module.exports = ViewModel
