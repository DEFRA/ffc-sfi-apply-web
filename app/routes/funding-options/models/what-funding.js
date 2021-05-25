function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'funding',
    name: 'funding',
    fieldset: {
      legend: {
        text: 'What funding do you want to apply for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      text: 'Choose all that apply.'
    },
    items: [
      {
        value: 'arableHorticulturalSoils',
        text: 'Protect and improve my arable and horticultural soils'
      },
      {
        value: 'permanentGrasslandSoils',
        text: 'Protect and improve my permanent grassland soils'
      },
      {
        value: 'welfareAssessmentLivestock',
        text: 'Carry out a welfare assessment on my livestock'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose which funding you want to apply for.'
    }
  }
}

module.exports = ViewModel
