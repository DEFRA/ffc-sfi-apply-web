function ViewModel (sbi, std, stdArea, paymentRates) {
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
      items: createPaymentRateItems(paymentRates)
    },
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`, `Standard Area: ${stdArea}ha`]
  }
}

const createPaymentRateItems = (paymentRates) => {
  const items = []

  if (paymentRates.Introductory !== null) {
    const introductory = paymentRates.Introductory

    items.push({
      value: 'Introductory',
      text: 'Introductory',
      conditional: {
        html: `<div class="govuk-body">£${introductory.rate} per ha and total payment amount £${introductory.paymentAmount}</div>`
      }
    })
  }

  if (paymentRates.Intermediate !== null) {
    const intermediate = paymentRates.Intermediate

    items.push({
      value: 'Intermediate',
      text: 'Intermediate',
      conditional: {
        html: `<div class="govuk-body">£${intermediate.rate} per ha and total payment amount £${intermediate.paymentAmount}</div>`
      }
    })
  }

  if (paymentRates.Advanced !== null) {
    const advanced = paymentRates.Advanced

    items.push({
      value: 'Advanced',
      text: 'Advanced',
      conditional: {
        html: `<div class="govuk-body">£${advanced.rate} per ha and total payment amount £${advanced.paymentAmount}</div>`
      }
    })
  }

  return items
}

module.exports = ViewModel
