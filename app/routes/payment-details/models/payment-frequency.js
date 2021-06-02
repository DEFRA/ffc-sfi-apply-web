function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'paymentFrequency',
    name: 'paymentFrequency',
    fieldset: {
      legend: {
        text: 'How often would you like to receive your payments',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'monthly',
        text: 'Monthly',
        checked: value === 'monthly'
      },
      {
        value: 'annually',
        text: 'Annually',
        checked: value === 'annually'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please select how often you would like to be paid'
    }
  }
}

module.exports = ViewModel
