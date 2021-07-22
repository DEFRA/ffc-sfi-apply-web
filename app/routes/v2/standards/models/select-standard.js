
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
  return values.filter(item => item.parcels.length > 0)
    .map(x => {
      return {
        text: x.name,
        value: x.code,
        checked: selected?.some(y => selected.includes(x.code)) ?? false
      }
    })
}

module.exports = ViewModel
