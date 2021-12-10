module.exports = [{
  id: 'land',
  taskGroup: 'Your land',
  tasks: [{
    taskName: 'Confirm your land cover details',
    status: 'NOT STARTED',
    url: 'confirm-details'
  }]
},
{
  id: 'funding',
  taskGroup: 'Choose your funding options',
  tasks: [{
    id: 'fundingOption',
    dependsOn: 'funding',
    taskName: 'Choose funding option',
    status: 'NOT STARTED',
    url: 'what-funding'
  }]
},
{
  id: 'action',
  taskGroup: 'Choose your actions',
  tasks: [{
    id: 'actionOption',
    dependsOn: 'action',
    taskName: 'Choose your actions',
    status: 'NOT STARTED'
  }]
},
{
  id: 'check',
  taskGroup: 'Check your answers',
  tasks: [{
    id: 'checkAnswers',
    dependsOn: 'check',
    taskName: 'Check your answers',
    status: 'NOT STARTED'
  }]
},
{
  id: 'submit',
  taskGroup: 'Submit your application',
  tasks: [{
    taskName: 'Submit your application',
    status: 'NOT STARTED',
    url: 'declaration'
  }]
}]
