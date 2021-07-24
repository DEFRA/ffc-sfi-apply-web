function getPercentage (area, percentage) {
  return (Number(area) / 100.0 * Number(percentage)).toFixed(2)
}

function ViewModel (sbi, std, stdArea) {
  return {
    radios: {
      name: 'level',
      fieldset: {
        legend: {
          text: 'Choose a level',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: [
        {
          value: 'Introductory',
          text: 'Introductory £26ha',
          conditional: {
            html: `<div class="govuk-body">20% (${getPercentage(stdArea, 20)}ha) for action 1<br/>
                   5% (${getPercentage(stdArea, 5)}ha) for action 2<br/>
                   10% (${getPercentage(stdArea, 10)}ha) for action 3</div>`
          }
        },
        {
          value: 'Intermediate',
          text: 'Intermediate £44ha',
          conditional: {
            html: `<div class="govuk-body">20% (${getPercentage(stdArea, 20)}ha) for action 1<br/>
                   10% (${getPercentage(stdArea, 10)}ha) for action 2<br />
                   15% (${getPercentage(stdArea, 15)}ha) for action 3<br />
                   25% (${getPercentage(stdArea, 25)}ha) for action 4</div>`
          }
        },
        {
          value: 'Advanced',
          text: 'Advanced £70ha',
          conditional: {
            html: `<div class="govuk-body">20% (${getPercentage(stdArea, 20)}ha) for action 1<br/>
                   15% (${getPercentage(stdArea, 15)}ha) for action 2<br />
                   20% (${getPercentage(stdArea, 20)}ha) for action 3<br />
                   25% (${getPercentage(stdArea, 25)}ha) for action 4</div>`
          }
        }
      ]
    },
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`, `Standard Area: ${stdArea}ha`]
  }
}

module.exports = ViewModel
