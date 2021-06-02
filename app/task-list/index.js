const taskList = [{
  taskGroup: 'Check before you start',
  tasks: [{
    taskName: 'Check eligibility',
    status: 'NOT STARTED',
    url: 'check-eligibility/bps'
  }]
},
{
  taskGroup: 'Land and business details',
  tasks: [{
    taskName: 'Confirm your land and business details',
    status: 'CANNOT START YET',
    url: 'search-land-business-details'
  }]
},
{
  taskGroup: 'Funding options',
  tasks: [{
    taskName: 'Choose funding type',
    status: 'CANNOT START YET',
    url: 'funding-options/what-funding'
  },
  {
    taskName: 'Choose actions',
    status: 'CANNOT START YET',
    url: 'funding-options/actions-arable-all'
  },
  {
    taskName: 'Add the amount of land you\'ll use',
    status: 'CANNOT START YET',
    url: 'funding-options/land-primary-actions'
  }]
}, {
  taskGroup: 'Create your agreement',
  tasks: [{
    taskName: 'Tell us how you will carry out your chosen actions',
    status: 'CANNOT START YET',
    url: 'create-agreement/soil-assessment'
  },
  {
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
  taskGroup: 'Payment details',
  tasks: [{
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
  taskGroup: 'Submit your application',
  tasks: [{
    taskName: 'Submit your application',
    status: 'CANNOT START YET',
    url: '/submit'
  }]
}]

module.exports = taskList
