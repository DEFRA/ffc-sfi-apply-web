function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'withdraw',
    name: 'withdraw',
    fieldset: {
      legend: {
        text: 'Are you sure you want to withdraw your application?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: true,
        text: 'Yes'
      },
      {
        value: false,
        text: 'No'
      }
    ]
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please select if you would like to withdraw your application.'
    }
  }
}

module.exports = ViewModel