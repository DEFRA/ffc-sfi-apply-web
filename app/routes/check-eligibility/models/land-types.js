function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'landTypes',
    name: 'landTypes',
    fieldset: {
      legend: {
        text: 'Which of these land types do you have registered in England?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      text: 'Choose all that apply. Include anything thats part of your plans.'
    },
    items: [
      {
        value: 'arableHorticultural',
        text: 'Arable and horticultural'
      },
      {
        value: 'permanentGrassland',
        text: 'Permanent grassland'
      },
      {
        value: 'livestock',
        text: 'Livestock management'
      },
      {
        value: 'organic',
        text: 'Organic land'
      },
      {
        value: 'trees',
        text: 'Trees (non-woodland)'
      },
      {
        value: 'uplands',
        text: 'Uplands'
      },
      {
        value: 'woodland',
        text: 'Woodland'
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose which of these land types you have registered in England.'
    }
  }
}

module.exports = ViewModel
