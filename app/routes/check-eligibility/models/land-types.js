function ViewModel (values, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    idPrefix: 'landTypes',
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

  if (values != null) {
    if (Array.isArray(values)) {
      values.forEach(value => {
        const item = this.model.items.find(x => x.value === value)
        if (item != null) {
          item.checked = true
        }
      })
    } else {
      const item = this.model.items.find(x => x.value === values)
      if (item != null) {
        item.checked = true
      }
    }
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose which of these land types you have registered in England.'
    }
  }
}

module.exports = ViewModel
