function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'soilAssessment',
    name: 'soilAssessment',
    fieldset: {
      legend: {
        text: 'How will you carry out a soil assessment on 25% of your land?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: 'myself',
        text: 'I\'ll do it myself',
        checked: value === 'myself'
      },
      {
        value: 'agronomist',
        text: 'I\'ll pay an agronomist',
        checked: value === 'agronomist'
      },
      {
        value: 'completed',
        text: 'I\'ve already done one',
        checked: value === 'completed'
      },
      {
        divider: 'or'
      },
      {
        value: 'unable',
        text: 'I cannot do this',
        checked: value === 'unable'
      }
    ]
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please confirm how you will carry out a soil assessment.'
    }
  }
}

module.exports = ViewModel
