function ViewModel (checkboxItems, totalHa, sbi, std) {
  return {
    checkboxes: {
      idPrefix: 'parcels',
      name: 'parcels',
      hint: {
        text: `You have ${Number(totalHa).toFixed(2)}ha of eligible land for this standard`
      },
      fieldset: {
        legend: {
          text: 'Add parcels to standard',
          isPageHeading: true,
          classes: 'govuk-fieldset__legend--l'
        }
      },
      items: checkboxItems
    },
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`]
  }
}

module.exports = ViewModel
