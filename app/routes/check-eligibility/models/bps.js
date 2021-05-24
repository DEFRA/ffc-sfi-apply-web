function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'bps',
    name: 'bps',
    fieldset: {
      legend: {
        text: 'Have you received Basic Payment Scheme (BPS) funding in the last 12 months?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'yes',
        text: 'Yes'
      },
      {
        value: 'no',
        text: 'No'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please select whether you want to enter a single value.'
    }
  }
}

module.exports = ViewModel
