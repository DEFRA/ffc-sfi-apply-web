function ViewModel (standards, selected, error) {
  // Constructor function to create logic dependent nunjucks page
  this.model = {
    id: 'funding',
    name: 'funding',
    fieldset: {
      legend: {
        text: 'What funding do you want to apply for?',
        isPageHeading: true,
        classes: 'govuk-fieldset__legend--l'
      }
    },
    hint: {
      text: 'Choose all that apply.'
    },
    items: mapStandards(standards, selected)
  }

  if (values != null) {
    if (Array.isArray(values)) {
      values.forEach(value => {
        const item = this.model.items.find(x => x.value === value)
        if (item != null) {
          item.checked = true
        }
      })
    } else {
      const item = this.model.items.find(x => x.value === values)
      if (item != null) {
        item.checked = true
      }
    }
  }
  // If error is passed to model then this error property is added to the model
  if (error) {
    this.model.errorMessage = {
      text: 'Please choose which funding you want to apply for.'
    }
  }
}

const mapStandards = (standards, selected) => {
  return getAllStandards()
    .filter(x => standards.some(y => y.name === x.value && y.name === x.value))
    .map(x => {
      return {
        ...x,
        checked: selected?.some(y => selected.includes(x.value)) ?? false
      }
    })
}

const getAllStandards = () => {
  return [
    {
      value: 'soilProtection',
      text: 'Protect and improve my arable and horticultural soils'
    },
    {
      value: 'permanentGrasslandProtection',
      text: 'Protect and improve my permanent grassland soils'
    },
    {
      value: 'livestockWelfare',
      text: 'Carry out a welfare assessment on my livestock'
    }
  ]
}

module.exports = ViewModel
