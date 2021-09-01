function ViewModel (values, errors) {
  this.model = {
    improvedGrassland: createInput(values?.improvedGrassland || '', errors,
      { id: 'improveGrassland', suffix: 'ha', errorMessage: 'Please enter land, in hectares.' }),
    arableHorticulturalLand: createInput(values?.arableHorticulturalLand || '', errors,
      { id: 'arableHorticulturalLand', suffix: 'ha', errorMessage: 'Please enter land, in hectares.' }),
    hedgerows: createInput(values?.hedgerows || '', errors,
      { id: 'hedgerows', suffix: 'm', errorMessage: 'Please enter land, in hectares.' }),
    waterbodyBuffering: createInput(values?.waterbodyBuffering || '', errors,
      { id: 'waterbodyBuffering', suffix: 'ha', errorMessage: 'Please enter land, in hectares.' }),
    farmWoodland: createInput(values?.farmWoodland || '', errors,
      { id: 'farmWoodland', suffix: 'ha', errorMessage: 'Please enter land, in hectares.' })
  }
}

const createInput = (value, error, properties) => {
  return {
    label: {
      text: 'Land, in hectares'
    },
    classes: 'govuk-input--width-5',
    id: properties.id,
    name: properties.id,
    suffix: {
      text: properties.suffix
    },
    autocomplete: false,
    spellcheck: false,
    value
  }
}

module.exports = ViewModel
