const standardItems = {
  'sfi-moorland': {
    text: 'Funding for moorland or rough grazing',
    value: 'sfi-moorland',
    hint: { text: '£6.45 per hectare per year, plus a single payment of £148 per year.' },
    checked: false
  },
  'sfi-arable-soil': {
    text: 'Funding for arable and horticultural soil',
    value: 'sfi-arable-soil',
    hint: { text: '£22 to £40 per hectare per year based on what work you do.' },
    checked: false
  },
  'sfi-improved-grassland': {
    text: 'Funding for improved grassland soil',
    value: 'sfi-improved-grassland',
    hint: { text: '£28 to £58 per hectare per year based on what work you do.' },
    checked: false
  }
}

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
    items: mapStandards(eligibleFunding, selected)
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

const mapStandards = (eligibleFunding, selected) => {
  let standardObj = { ...standardItems }
  standardObj = selected.map((choosen) => getChecked(choosen, standardObj))[0]
  return getEligible(eligibleFunding, standardObj)
}

const getEligible = (eligibleFunding, standardObj) => {
  const eligibleCodes = eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(standards => standards.code)
  return eligibleCodes.map(code => standardObj[code])
}

const getChecked = (selected, standardObj) => {
  if (Object.keys(standardObj).includes(selected)) {
    standardObj[selected].checked = true
  }
  return standardObj
}

module.exports = ViewModel
