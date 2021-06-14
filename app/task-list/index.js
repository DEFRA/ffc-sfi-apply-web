const taskList = [{
  id: 'businessDetails',
  taskGroup: 'Land and business details',
  dependsOn: 'eligibility',
  tasks: [{
    taskName: 'Confirm your land and business details',
    status: 'NOT STARTED',
    url: 'search-land-business-details'
  }]
},
{
  id: 'fundingDetails',
  taskGroup: 'Funding options',
  dependsOn: 'businessDetails',
  tasks: [{
    id: 'standards',
    dependsOn: 'fundingOptions',
    taskName: 'Choose funding type',
    status: 'CANNOT START YET',
    url: 'funding-options/standards'
  },
  {
    id: 'actions',
    dependsOn: 'fundingOptions',
    taskName: 'Choose actions',
    status: 'CANNOT START YET',
    url: 'funding-options/actions'
  },
  {
    id: 'land',
    dependsOn: 'fundingOptions',
    taskName: 'Add the amount of land you\'ll use',
    status: 'CANNOT START YET',
    url: 'funding-options/land-primary-actions'
  }]
}, {
  id: 'createAgreement',
  taskGroup: 'Create your agreement',
  dependsOn: 'fundingDetails',
  tasks: [{
    id: 'how',
    dependsOn: 'createAgreementOptions',
    taskName: 'Tell us how you will carry out your chosen actions',
    status: 'CANNOT START YET',
    url: 'create-agreement/soil-assessment'
  },
  {
    id: 'agreementLength',
    dependsOn: 'createAgreementOptions',
    taskName: 'Set up your agreement length and renewal period',
    status: 'CANNOT START YET',
    url: 'create-agreement/agreement-length'
  },
  {
    taskName: 'Review your agreement',
    status: 'CANNOT START YET',
    url: 'create-agreement/review'
  }]
}, {
  id: 'paymentDetails',
  taskGroup: 'Payment details',
  dependsOn: 'createAgreement',
  tasks: [{
    id: 'paymentFrequency',
    dependsOn: 'paymentOptions',
    taskName: 'Choose your payment options',
    status: 'CANNOT START YET',
    url: 'payment-details/payment-frequency'
  },
  {
    taskName: 'Confirm your bank details',
    status: 'CANNOT START YET',
    url: 'payment-details/bank-details'
  }]
},
{
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
