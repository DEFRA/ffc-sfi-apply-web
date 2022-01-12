function ViewModel (canProducePlan, error) {
  this.model = {
    idPrefix: 'produce-plan',
    name: 'canProducePlan',
    fieldset: {
      legend: {
        text: 'Can you produce a plan to reduce the risks to the arable and horticultural soil on the land?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      html: `<p class="govuk-body">The plan will help you to identify how you can reduce:</p>
            <ul class='govuk-list govuk-list--bullet'>
              <li>runoff</li>
              <li>erosion</li>
              <li>compaction</li>
              <li>flooding risk</li>
            </ul>
            <p class="govuk-body">You need to produce the plan in the first year of the agreement and review it every year.</p>`
    },
    items: [
      {
        value: true,
        text: 'Yes, I will do this',
        checked: canProducePlan
      },
      {
        value: false,
        text: 'No, I cannot do this',
        checked: typeof canProducePlan !== 'undefined' && !canProducePlan
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
