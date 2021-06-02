function ViewModel (selected, errors) {
  this.model = {
    primaryActions: primaryActions(selected, errors),
    paymentActions: paymentActions(selected, errors)
  }

  if (selected.primaryActions) {
    selected.primaryActions = Array.isArray(selected.primaryActions) ? selected.primaryActions : [selected.primaryActions]
    selected.primaryActions.forEach(value => {
      const primaryAction = this.model.primaryActions.items.find(x => x.value === value)
      if (primaryAction) {
        primaryAction.checked = true
      }
    })
  }
  if (selected.paymentActions) {
    selected.paymentActions = Array.isArray(selected.paymentActions) ? selected.paymentActions : [selected.paymentActions]
    selected.paymentActions.forEach(value => {
      const paymentAction = this.model.paymentActions.items.find(x => x.value === value)
      if (paymentAction) {
        paymentAction.checked = true
      }
    })
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

const buildCheckBoxItems = (payloadValues, checkBoxtext, checkBoxValue) => {
  return {
    value: checkBoxValue,
    text: checkBoxtext,
    checked: checkValue(payloadValues, checkBoxValue)
  }
}

const primaryActions = (value, error) => {
  const items = [
    buildCheckBoxItems(value?.primaryActions, 'Cultivate and drill across the slope', 'cultivateDrillSlope'),
    buildCheckBoxItems(value?.primaryActions, 'Use strip tillage or no-till on temporary grassland at high risk of surface runoff or soil erosion', 'stripTillageNotil'),
    buildCheckBoxItems(value?.primaryActions, 'Produce a soil management plan and review it every 2 years', 'soilManagementPlan'),
    buildCheckBoxItems(value?.primaryActions, 'Avoid machinery traffic and cultivation on wet soil', 'avoidMachineryTraffic'),
    buildCheckBoxItems(value?.primaryActions, 'Carry out soil assessment on at least 25% the land in the scheme', 'soilAssessment'),
    buildCheckBoxItems(value?.primaryActions, 'Use shallow, minimum or no tillage on 25% of the arable land in the scheme', 'useShallow'),
    buildCheckBoxItems(value?.primaryActions, 'Add organic matter or certified compost to 25%, 40% or 50% of the land in the scheme', 'addOrganicMatter')
  ]

  const primaryActionsModel = buildCheckBoxes(items,
    { id: 'primaryActions', text: 'Primary actions', hint: 'Choose at least 4 primary actions.' })

  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('primaryActions')) {
    primaryActionsModel.errorMessage = {
      text: 'Please choose at least 4 primary actions.'
    }
  }

  return primaryActionsModel
}

const paymentActions = (value, error) => {
  const items = [
    buildCheckBoxItems(value?.paymentActions, 'Establish green cover on land at risk of flooding. £114 a hectare', 'establishGreenCover'),
    buildCheckBoxItems(value?.paymentActions, 'Convert arable land to permanent grass. £311 a hectare', 'convertArableLand')
  ]

  return buildCheckBoxes(items,
    { id: 'paymentActions', text: 'Increased payment actions', hint: 'Choose the extra optional actions you want to do.' })
}

module.exports = ViewModel