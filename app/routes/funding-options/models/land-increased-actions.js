function ViewModel (values, errors) {
  this.model = {
    convertArableLand: '', // values?.paymentActions !== undefined && values?.paymentActions.length > 0 && values?.paymentActions.includes('convertArableLand'),
    establishGreenCover: '', // values?.paymentActions !== undefined && values?.paymentActions.length > 0 && values?.paymentActions.includes('establishGreenCover'),
    greenCover: greenCover(values?.greenCover, errors),
    permanentGrass: permanentGrass(values?.permanentGrass, errors)
  }
}

const greenCover = (value, error) => {
  const greenCoverModel = {
    label: {
      text: 'How much land at risk of flooding will you establish green cover on?',
      classes: 'govuk-label--m',
      isPageHeading: false
    },
    classes: 'govuk-input--width-5',
    id: 'greenCover',
    name: 'greenCover',
    suffix: {
      text: 'ha'
    },
    autocomplete: false,
    spellcheck: false,
    value: value
  }

  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('greenCover')) {
    greenCoverModel.errorMessage = {
      text: 'Please enter how much land at risk of flooding will you establish green cover on.'
    }
  }

  return greenCoverModel
}

const permanentGrass = (value, error) => {
  const permanentGrassModel = {
    label: {
      text: 'How much arable land will you convert to permanent grass?',
      classes: 'govuk-label--m',
      isPageHeading: false
    },
    classes: 'govuk-input--width-5',
    id: 'permanentGrass',
    name: 'permanentGrass',
    suffix: {
      text: 'ha'
    },
    spellcheck: false,
    value: value
  }

  // If error is passed to model then this error property is added to the model
  if (error?.output.payload.message.includes('permanentGrass')) {
    permanentGrassModel.errorMessage = {
      text: 'Please enter how much arable land will you convert to permanent grass.'
    }
  }

  return permanentGrassModel
}

module.exports = ViewModel
