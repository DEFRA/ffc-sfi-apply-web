const taskList = [{
  id: 'businessDetails',
  taskGroup: 'Land and business details',
  dependsOn: '',
  tasks: [{
    taskName: 'Confirm your land and business details',
    status: 'NOT STARTED',
    url: 'confirm-details'
  }]
},
{
  id: 'fundingDetails',
  taskGroup: 'Funding options',
  dependsOn: 'businessDetails',
  tasks: [{
    id: 'fundingOption',
    dependsOn: 'fundingOptions',
    taskName: 'Choose funding option',
    status: 'CANNOT START YET',
    url: '/funding-options/what-funding'
  },
  {
    id: 'fundingOptionOverview',
    dependsOn: 'fundingOptions',
    taskName: 'Funding option overview',
    status: 'CANNOT START YET',
    url: 'funding-options/funding-overview'
  },
  {
    id: 'amountOfLand',
    dependsOn: 'fundingOptions',
    taskName: 'Add the amount of land you will use',
    status: 'CANNOT START YET',
    url: 'funding-options/how-much'
  },
  {
    id: 'paymentLevel',
    dependsOn: 'fundingOptions',
    taskName: 'Choose a payment level',
    status: 'CANNOT START YET',
    url: 'funding-options/what-payment-level'
  }]
}, {
  id: 'createAgreement',
  taskGroup: 'Create your land management agreement',
  dependsOn: 'fundingDetails',
  tasks: [{
    id: 'how',
    dependsOn: 'createAgreementOptions',
    taskName: 'Tell us how you will carry out the actions',
    status: 'CANNOT START YET',
    url: 'determine-action'
  },
  {
    id: 'schedule',
    taskName: 'Choose your payment schedule',
    status: 'CANNOT START YET',
    url: '/arable-soils/payment-schedule'
  },
  {
    id: 'answers',
    taskName: 'Check your answers',
    status: 'CANNOT START YET',
    url: '/arable-soils/check-your-answers'
  },
  {
    id: 'agreement',
    taskName: 'View your agreement',
    status: 'CANNOT START YET',
    url: 'review-your-agreement'
  }]
}, {
  id: 'submitted',
  taskGroup: 'Submit your application',
  dependsOn: 'createAgreement',
  tasks: [{
    taskName: 'Submit your application',
    status: 'CANNOT START YET',
    url: '/declaration'
  }]
}]

module.exports = taskList
