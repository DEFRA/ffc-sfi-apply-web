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

const mapStandards = (eligibleFunding, selected) => {
  let standardObj = { ...standardItems }
  for (const choosenStandard in selected) {
    standardObj = getChecked(choosenStandard, standardObj)
  }
  return getEligible(eligibleFunding, standardObj)
}

const getEligible = (eligibleFunding, standardObj) => {
  const eligibleCodes = eligibleFunding.filter(item => item.landCovers.length > 0)
    .map(standards => standards.code)
  return eligibleCodes.map(code => standardObj[code]).filter(x => x !== undefined)
}

const getChecked = (selected, standardObj) => {
  if (Object.keys(standardObj).includes(selected)) {
    standardObj[selected].checked = true
  }
  return standardObj
}

module.exports = [
  mapStandards
]
