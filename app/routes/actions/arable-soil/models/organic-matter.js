function ViewModel (canTestOrganicMatter, error) {
  this.model = {
    idPrefix: 'organic-matter',
    name: 'canTestOrganicMatter',
    fieldset: {
      legend: {
        text: 'Can you test the level of organic matter in the arable and horticultural soil?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      html: `<p>You must test all selected land parcels for soil organic matter (SOM).
            </p><p>If you have not tested your land parcels in the last 5 years, you need to get them tested within the first year of your agreement. </p>
            <p>If you have already tested any of the land parcels in the last 5 years you do not need to retest. </p>`,
      classes: 'govuk-body'
    },
    items: [
      {
        value: true,
        text: 'Yes, I will do this',
        checked: canTestOrganicMatter
      },
      {
        value: false,
        text: 'No, I cannot do this',
        checked: typeof canTestOrganicMatter !== 'undefined' && !canTestOrganicMatter
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
