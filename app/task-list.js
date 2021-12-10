const taskList = [{
  id: 'businessDetails',
  taskGroup: 'Land and business details',
  dependsOn: '',
  tasks: [{
    taskName: 'Confirm your land details',
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
    id: 'fundingOptionLandParcels',
    dependsOn: 'fundingOptions',
    taskName: 'Choose land parcels',
    status: 'CANNOT START YET',
    url: 'funding-options/how-much'
  }]
},
{
  id: 'submitted',
  taskGroup: 'Submit your application',
  dependsOn: 'fundingDetails',
  tasks: [{
    taskName: 'Submit your application',
    status: 'CANNOT START YET',
    url: '/declaration'
  }]
}]

module.exports = taskList
