function ViewModel (canDiversifySpecies, error) {
  this.model = {
    idPrefix: 'diversify-species',
    name: 'canDiversifySpecies',
    fieldset: {
      legend: {
        text: 'Can you diversify the species in any over winter green cover?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      html: `<p class="govuk-body">The over winter green cover must:</p>
            <ul class='govuk-list govuk-list--bullet'>
              <li>have diverse species</li>
              <li>cover at least 20% of the area of the selected land</li>
              <li>be established from 1 December to the last day of February</li>
            </ul>`
    },
    items: [
      {
        value: true,
        text: 'Yes, on all my selected land',
        checked: canDiversifySpecies
      },
      {
        value: true,
        text: 'Yes, on some of my selected land',
        checked: canDiversifySpecies
      },
      {
        value: false,
        text: 'No, I cannot do this',
        checked: typeof canDiversifySpecies !== 'undefined' && !canDiversifySpecies
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
