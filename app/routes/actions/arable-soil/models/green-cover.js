function ViewModel (canHaveGreenCover, error) {
  this.model = {
    idPrefix: 'greenCover',
    name: 'canHaveGreenCover',
    fieldset: {
      legend: {
        text: 'Can you have green cover over winter on the arable and horticultural land?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      html: `<p class="govuk-body">You must have at least 70% of the land you select covered from 1 December to the last day of February.</p>
            <p class="govuk-body">This green cover can include weedy stubbles and autumn-sown crops.</p>`
    },
    items: [
      {
        value: true,
        text: 'Yes, I will do this',
        checked: canHaveGreenCover
      },
      {
        value: false,
        text: 'No, I cannot do this',
        checked: typeof canHaveGreenCover !== 'undefined' && !canHaveGreenCover
      }
    ]
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Select an option'
    }
  }
}

module.exports = ViewModel
