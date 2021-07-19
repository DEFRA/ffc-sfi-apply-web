
function ViewModel (values, selected, error) {
  this.model = {
    id: 'standard',
    name: 'standard',
    fieldset: {
      legend: {
        text: 'Choose a standard',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      text: 'Choose all that apply.'
    },
    items: mapStandards(values, selected)
  }

  if (error) {
    this.model.errorMessage = {
      text: 'Please choose a standard '
    }
  }
}

const mapStandards = (values, selected) => {
  return values
    .map(x => {
      return {
        ...x,
        checked: selected?.some(y => selected.includes(x.value)) ?? false
      }
    })
}

module.exports = ViewModel
