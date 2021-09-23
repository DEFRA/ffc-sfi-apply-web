function ViewModel (sbi, std, stdArea, paymentRates, selectedAmbitionLevel, selectedStandardCode, journeyItem, error) {
  let model = {
    radios: {
      name: 'level',
      fieldset: {
        legend: {
          text: 'What level of payment do you want to apply for?',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: createPaymentRateItems(paymentRates, selectedAmbitionLevel, stdArea)
    },
    selectedStandardCode,
    back: journeyItem.back
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    model = updateModelIfError(model)
  }
  return model
}

const updateModelIfError = (model) => {
  model.radios.errorMessage = {
    text: 'Please choose which level of payment you would like to apply for '
  }
  return model
}

const isChecked = (selectedAmbitionLevel, value) => {
  if (selectedAmbitionLevel) {
    return value === selectedAmbitionLevel.name
  }
  return false
}

const createPaymentRateItems = (paymentRates, selectedAmbitionLevel, stdArea) => {
  const items = []

  if (paymentRates.Introductory !== null) {
    const introductory = paymentRates.Introductory

    items.push({
      value: 'Introductory',
      text: `Basic - £${introductory.rate} per hectare`,
      hint: {
        text: `${stdArea} hectares would pay you £${introductory.paymentAmount}`
      },
      checked: isChecked(selectedAmbitionLevel, 'Introductory')
    })
  }

  if (paymentRates.Intermediate !== null) {
    const intermediate = paymentRates.Intermediate

    items.push({
      value: 'Intermediate',
      text: `Medium - £${intermediate.rate} per hectare`,
      hint: {
        text: `${stdArea} hectares would pay you £${intermediate.paymentAmount}`
      },
      checked: isChecked(selectedAmbitionLevel, 'Intermediate')
    })
  }

  if (paymentRates.Advanced !== null) {
    const advanced = paymentRates.Advanced

    items.push({
      value: 'Advanced',
      text: `High - £${advanced.rate} per hectare`,
      hint: {
        text: `${stdArea} hectares would pay you £${advanced.paymentAmount}`
      },
      checked: isChecked(selectedAmbitionLevel, 'Advanced')
    })
  }

  return items
}

module.exports = ViewModel
