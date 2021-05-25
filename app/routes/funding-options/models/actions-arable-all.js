function ViewModel (values, errors) {
  this.model = {
    primaryActions: primaryActions(values, errors),
    paymentActions: paymentActions(values, errors)
  }
}

const primaryActions = (value, error) => {
  const primaryActionsModel = {
    id: 'primaryActions',
    name: 'primaryActions',
    fieldset: {
      legend: {
        text: 'Primary actions',
        isPageHeading: false,
        classes: 'govuk-fieldset__legend--m'
      }
    },
    hint: {
      text: 'Choose at least 4 primary actions.'
    },
    items: [
      {
        value: 'cultivateDrillSlope',
        text: 'Cultivate and drill across the slope',
        checked: value?.primaryActions?.includes('cultivateDrillSlope')
      },
      {
        value: 'stripTillageNotil',
        text: 'Use strip tillage or no-till on temporary grassland at high risk of surface runoff or soil erosion',
        checked: value?.primaryActions?.includes('stripTillageNotil')
      },
      {
        value: 'soilManagementPlan',
        text: 'Produce a soil management plan and review it every 2 years',
        checked: value?.primaryActions?.includes('soilManagementPlan')
      },
      {
        value: 'avoidMachineryTraffic',
        text: 'Avoid machinery traffic and cultivation on wet soil',
        checked: value?.primaryActions?.includes('avoidMachineryTraffic')
      },
      {
        value: 'soilAssessment',
        text: 'Carry out soil assessment on at least 25% the land in the scheme',
        checked: value?.primaryActions?.includes('soilAssessment')
      },
      {
        value: 'useShallow',
        text: 'Use shallow, minimum or no tillage on 25% of the arable land in the scheme',
        checked: value?.primaryActions?.includes('useShallow')
      },
      {
        value: 'addOrganicMatter',
        text: 'Add organic matter or certified compost to 25%, 40% or 50% of the land in the scheme',
        checked: value?.primaryActions?.includes('addOrganicMatter')
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('primaryActions')) {
    primaryActionsModel.errorMessage = {
      text: 'Please choose at least 4 primary actions.'
    }
  }

  return primaryActionsModel
}

const paymentActions = (value, error) => {
  const primaryActionsModel = {
    id: 'paymentActions',
    name: 'paymentActions',
    fieldset: {
      legend: {
        text: 'Increased payment actions',
        isPageHeading: false,
        classes: 'govuk-fieldset__legend--m'
      }
    },
    hint: {
      text: 'Choose the extra optional actions you want to do.'
    },
    items: [
      {
        value: 'establishGreenCover',
        text: 'Establish green cover on land at risk of flooding. £114 a hectare',
        checked: value?.paymentActions?.includes('establishGreenCover')
      },
      {
        value: 'convertArableLand',
        text: 'Convert arable land to permanent grass. £311 a hectare',
        checked: value?.paymentActions?.includes('convertArableLand')
      }
    ]
  }
  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('paymentActions')) {
    primaryActionsModel.errorMessage = {
      text: 'Please choose which funding you want to apply for.'
    }
  }

  return primaryActionsModel
}

module.exports = ViewModel
