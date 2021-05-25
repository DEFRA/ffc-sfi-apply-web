function ViewModel (values, errors) {
  this.model = {
    primaryActions: primaryActions(values, errors),
    paymentActions: paymentActions(values, errors)
  }
}

const checkValue = (payloadValues, checkBoxValue) => {
  return payloadValues?.includes(checkBoxValue)
}

const buildCheckBoxes = (items, properties) => {
  return {
    id: properties.id,
    name: properties.id,
    fieldset: {
      legend: {
        text: properties.text,
        isPageHeading: false,
        classes: 'govuk-fieldset__legend--m'
      }
    },
    hint: {
      text: properties.hint
    },
    items
  }
}

const primaryActions = (value, error) => {
  const items = [{
    value: 'cultivateDrillSlope',
    text: 'Cultivate and drill across the slope',
    checked: checkValue(value?.primaryActions, 'cultivateDrillSlope')
  },
  {
    value: 'stripTillageNotil',
    text: 'Use strip tillage or no-till on temporary grassland at high risk of surface runoff or soil erosion',
    checked: checkValue(value?.primaryActions, 'stripTillageNotil')
  },
  {
    value: 'soilManagementPlan',
    text: 'Produce a soil management plan and review it every 2 years',
    checked: checkValue(value?.primaryActions, 'soilManagementPlan')
  },
  {
    value: 'avoidMachineryTraffic',
    text: 'Avoid machinery traffic and cultivation on wet soil',
    checked: checkValue(value?.primaryActions, 'avoidMachineryTraffic')
  },
  {
    value: 'soilAssessment',
    text: 'Carry out soil assessment on at least 25% the land in the scheme',
    checked: checkValue(value?.primaryActions, 'soilAssessment')
  },
  {
    value: 'useShallow',
    text: 'Use shallow, minimum or no tillage on 25% of the arable land in the scheme',
    checked: checkValue(value?.primaryActions, 'useShallow')
  },
  {
    value: 'addOrganicMatter',
    text: 'Add organic matter or certified compost to 25%, 40% or 50% of the land in the scheme',
    checked: checkValue(value?.primaryActions, 'addOrganicMatter')
  }]

  const primaryActionsModel = buildCheckBoxes(items,
    { id: 'primaryActions', text: 'Primary actions', hint: 'Choose at least 4 primary actions.'})

  console.log(primaryActionsModel)

  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('primaryActions')) {
    primaryActionsModel.errorMessage = {
      text: 'Please choose at least 4 primary actions.'
    }
  }

  return primaryActionsModel
}

const paymentActions = (value, error) => {
  const items = [{
    value: 'establishGreenCover',
    text: 'Establish green cover on land at risk of flooding. £114 a hectare',
    checked: checkValue(value?.paymentActions, 'establishGreenCover')
  },
  {
    value: 'convertArableLand',
    text: 'Convert arable land to permanent grass. £311 a hectare',
    checked: checkValue(value?.paymentActions, 'convertArableLand')
  }]

  const primaryActionsModel = buildCheckBoxes(items,
    { id: 'paymentActions', text: 'Increased payment actions', hint: 'Choose the extra optional actions you want to do.'})

  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('paymentActions')) {
    primaryActionsModel.errorMessage = {
      text: 'Please choose which funding you want to apply for.'
    }
  }

  return primaryActionsModel
}

module.exports = ViewModel
