function ViewModel (sbi, std, stdArea, paymentRates, selectedAmbitionLevel, error) {
  let model = {
    radios: {
      name: 'level',
      fieldset: {
        legend: {
          text: 'Choose a level',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: createPaymentRateItems(paymentRates, selectedAmbitionLevel)
    },
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`, `Standard Area: ${stdArea}ha`]
  }

  // If error is passed to model then this error property is added to the model
  if (error) {
    model = updateModelIfError(model)
  }
  return model
}

const updateModelIfError = (model) => {
  model.radios.errorMessage = {
    text: 'Please choose a Level '
  }
  return model
}

const isChecked = (selectedAmbitionLevel, value) => {
  if (selectedAmbitionLevel) {
    return value === selectedAmbitionLevel.name
  }
  return false
}

const createPaymentRateItems = (paymentRates, selectedAmbitionLevel) => {
  const items = []

  if (paymentRates.Introductory !== null) {
    const introductory = paymentRates.Introductory

    items.push({
      value: 'Introductory',
      text: 'Introductory',
      conditional: {
        html: `<div class="govuk-body">£${introductory.rate} per ha and total payment amount of £${introductory.paymentAmount}</div>`
      },
      checked: isChecked(selectedAmbitionLevel, 'Introductory')
    })
  }

  if (paymentRates.Intermediate !== null) {
    const intermediate = paymentRates.Intermediate

    items.push({
      value: 'Intermediate',
      text: 'Intermediate',
      conditional: {
        html: `<div class="govuk-body">£${intermediate.rate} per ha and total payment amount of £${intermediate.paymentAmount}</div>`
      },
      checked: isChecked(selectedAmbitionLevel, 'Intermediate')
    })
  }

  if (paymentRates.Advanced !== null) {
    const advanced = paymentRates.Advanced

    items.push({
      value: 'Advanced',
      text: 'Advanced',
      conditional: {
        html: `<div class="govuk-body">£${advanced.rate} per ha and total payment amount of £${advanced.paymentAmount}</div>`
      },
      checked: isChecked(selectedAmbitionLevel, 'Advanced')
    })
  }

  return items
}

module.exports = ViewModel
