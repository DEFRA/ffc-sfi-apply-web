function ViewModel (eligibleFunding, selected, error) {
  this.model = {
    id: 'standard',
    name: 'standard',
    fieldset: {
      legend: {
        text: 'What funding do you want to apply for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      text: 'Choose all that apply.'
    },
    items: [{
      text: 'Funding for moorland or rough grazing',
      value: 'sfi-moorland',
      hint: { text: '£6.45 per hectare per year, plus a single payment of £148 per year.' },
      checked: false
    },
    {
      text: 'Funding for arable and horticultural soil',
      value: 'sfi-arable-soil',
      hint: { text: '£22 to £40 per hectare per year based on what work you do.' },
      checked: false
    },
    {
      text: 'Funding for improved grassland soil',
      value: 'sfi-improved-grassland',
      hint: { text: '£28 to £58 per hectare per year based on what work you do.' },
      checked: false
    }]
  }

  if (error) {
    this.model.error = {
      errorList: [
        {
          text: 'Select an option'
        }
      ]
    }
  }
}

const isChecked = (selected, value) => {
  if (selected.length) {
    return selected.includes(value)
  }
  return false
}

const mapStandards = (eligibleFunding, selected) => {
  return eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(x => {
      return {
        text: x.name,
        value: x.code,
        checked: isChecked(selected, x.code)
      }
    })
}

module.exports = ViewModel
