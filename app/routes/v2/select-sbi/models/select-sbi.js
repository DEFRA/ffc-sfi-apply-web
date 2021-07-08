
function ViewModel (value, error) {
  this.model = {
    id: 'sbi',
    name: 'sbi',
    fieldset: {
      legend: {
        text: 'Choose your Single Business Identifier (SBI)',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    items: [
      {
        value: '106336339',
        text: '106336339',
        checked: value === '106336339'
      },
      {
        value: '106651310',
        text: '106651310',
        checked: value === '106651310'
      }
    ]
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a Single Business Identifier (SBI) '
    }
  }
}

module.exports = ViewModel
