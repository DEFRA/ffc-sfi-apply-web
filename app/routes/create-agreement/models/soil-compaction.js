function ViewModel (value, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'soilCompaction',
    name: 'soilCompaction',
    fieldset: {
      legend: {
        text: 'Can you avoid machinery traffic and cultivation on wet soil?',
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
      text: 'Please confirm if you can reduce soil compaction.'
    }
  }
}

module.exports = ViewModel
