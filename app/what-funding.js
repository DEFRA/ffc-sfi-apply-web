const standardDetails = {
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

const mapStandards = (eligibleFunding, selected) => {
  let standardItems = JSON.parse(JSON.stringify(standardDetails))

  selected.forEach(choosenStandard => {
    standardItems = getChecked(choosenStandard, standardItems)
  })
  return getEligible(eligibleFunding, standardItems)
}

const getEligible = (eligibleFunding, standardItems) => {
  const eligibleCodes = eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(standards => standards.code)
  return eligibleCodes.map(code => standardItems[code]).filter(x => x !== undefined)
}

const getChecked = (selected, standardItems) => {
  if (Object.keys(standardItems).includes(selected)) {
    standardItems[selected].checked = true
  }
  return standardItems
}

module.exports = { getEligible, getChecked, mapStandards }
