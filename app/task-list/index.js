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
    id: 'standards',
    dependsOn: 'fundingOptions',
    taskName: 'Choose funding option',
    status: 'CANNOT START YET',
    url: 'funding-options/standards'
  },
  {
    id: 'actions',
    dependsOn: 'fundingOptions',
    taskName: 'Funding option overview',
    status: 'CANNOT START YET',
    url: 'funding-options/actions'
  },
  {
    id: 'land',
    dependsOn: 'fundingOptions',
    taskName: 'Add the amount of land you will use',
    status: 'CANNOT START YET',
    url: 'funding-options/land-primary-actions'
  },
  {
    id: 'land',
    dependsOn: 'fundingOptions',
    taskName: 'Choose a payment level',
    status: 'CANNOT START YET',
    url: 'funding-options/land-primary-actions'
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
    url: 'create-agreement/soil-assessment'
  },
  {
    taskName: 'Choose your payment schedule',
    status: 'CANNOT START YET',
    url: 'create-agreement/review'
  },
  {
    taskName: 'Check your answers',
    status: 'CANNOT START YET',
    url: 'create-agreement/review'
  },
  {
    taskName: 'View your agreement',
    status: 'CANNOT START YET',
    url: 'create-agreement/review'
  }]
}, {
  id: 'submitted',
  taskGroup: 'Submit your application',
  dependsOn: 'paymentDetails',
  tasks: [{
    taskName: 'Submit your application',
    status: 'CANNOT START YET',
    url: '/submit'
  }]
}]

module.exports = taskList
