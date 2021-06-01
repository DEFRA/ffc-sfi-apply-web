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
        value: true,
        text: 'Yes'
      },
      {
        value: false,
        text: 'No'
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
      text: 'Please select if you have received Basic Payment Scheme (BPS) funding in the last 12 months.'
    }
  }
}

module.exports = ViewModel
