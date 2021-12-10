module.exports = [{
  id: 'land',
  taskGroup: 'Your land',
  dependsOn: '',
  tasks: [{
    taskName: 'Confirm your land cover details',
    status: 'NOT STARTED',
    url: 'confirm-details'
  }]
},
{
  id: 'funding',
  taskGroup: 'Choose your funding options',
  dependsOn: 'land',
  tasks: [{
    id: 'fundingOption',
    dependsOn: 'funding',
    taskName: 'Choose funding option',
    status: 'CANNOT START YET',
    url: 'what-funding'
  }]
},
{
  id: 'action',
  taskGroup: 'Choose your actions',
  dependsOn: 'fundingOption',
  tasks: [{
    id: 'actionOption',
    dependsOn: 'action',
    taskName: 'Choose your actions',
    status: 'CANNOT START YET'
  }]
},
{
  id: 'check',
  taskGroup: 'Check your answers',
  dependsOn: 'actionOption',
  tasks: [{
    id: 'checkAnswers',
    dependsOn: 'check',
    taskName: 'Check your answers',
    status: 'CANNOT START YET'
  }]
},
{
  id: 'submit',
  taskGroup: 'Submit your application',
  dependsOn: 'checkAnswers',
  tasks: [{
    taskName: 'Submit your application',
    status: 'CANNOT START YET',
    url: 'declaration'
  }]
}]
