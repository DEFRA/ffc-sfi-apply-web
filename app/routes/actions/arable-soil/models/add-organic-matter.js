function ViewModel (canAddOrganicMatter, error) {
  this.model = {
    idPrefix: 'organic-matter',
    name: 'canAddOrganicMatter',
    fieldset: {
      legend: {
        text: 'Can you add organic matter to the arable soil?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      html: `<p class="govuk-body">You must add organic matter to all the land parcels at least once. You can do this as part of your crop rotations.</p>
            <p class="govuk-body">Organic matter includes:</p>
            <ul class='govuk-list govuk-list--bullet'>
              <li>animal manures including slurry</li>
              <li>compost or plant manures</li>
              <li>paper crumble and wood</li>
            </ul>`
    },
    items: [
      {
        value: true,
        text: 'Yes, I will do this',
        checked: canAddOrganicMatter
      },
      {
        value: false,
        text: 'No, I cannot do this',
        checked: typeof canAddOrganicMatter !== 'undefined' && !canAddOrganicMatter
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
