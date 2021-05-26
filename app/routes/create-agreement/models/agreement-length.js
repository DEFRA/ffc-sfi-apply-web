function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'agreementLength',
    name: 'agreementLength',
    fieldset: {
      legend: {
        text: 'How long do you want your agreement to run?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: '1 year',
        text: '1 year only'
      },
      {
        value: 'rolling',
        text: 'Rolling agreement (minimum 1 year)'
      },
      {
        value: '2 years+',
        text: '2 years or more'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please confirm how long you want your agreement to run.'
    }
  }
}

module.exports = ViewModel
