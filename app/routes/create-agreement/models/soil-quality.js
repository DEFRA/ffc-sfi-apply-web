function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'soilQuality',
    name: 'soilQuality',
    fieldset: {
      legend: {
        text: 'Can you add organic manure or certified compost to your land?',
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

  if (value != null) {
    const item = this.model.items.find(x => x.value === value)
    if (item != null) {
      item.checked = true
    }
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please confirm if you can improve soil quality.'
    }
  }
}

module.exports = ViewModel
