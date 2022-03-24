
module.exports = [{
  name: 'Your land',
  active: true,
  completed: false,
  tasks: [{
    name: 'Confirm your land cover details',
    url: '/confirm-details',
    status: 'NOT STARTED YET'
  }]
}, {
  name: 'Choose your funding',
  active: true,
  completed: false,
  tasks: [{
    name: 'Choose funding option',
    url: '/what-funding',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Choose your actions',
  active: true,
  completed: false,
  tasks: [{
    name: 'Choose your actions',
    url: '#',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Arable and horticultural soil actions',
  active: false,
  completed: false,
  tasks: [{
    name: 'Work on arable and horticultural soil',
    url: '/arable/organic-matter',
    status: 'NOT STARTED YET'
  }, {
    name: 'Select arable and horticultural soil land parcels',
    url: '/arable/select-arable-parcels',
    status: 'CANNOT START YET'
  }, {
    name: 'Additional work on arable and horticultural soil',
    url: '#',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Improved grassland soil actions',
  active: false,
  completed: false,
  tasks: [{
    name: 'Work on improved grassland soil',
    url: '#',
    status: 'CANNOT START YET'
  }, {
    name: 'Select improved grassland soil parcels',
    url: '#',
    status: 'CANNOT START YET'
  }, {
    name: 'Additional work on improved grassland soil',
    url: '#',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Moorlands and rough grazing actions',
  active: false,
  completed: false,
  tasks: [{
    name: 'Work on moorlands and rough grazing',
    url: '#',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Check your answers',
  active: true,
  completed: false,
  tasks: [{
    name: 'Check your answers',
    url: '#',
    status: 'CANNOT START YET'
  }]
}, {
  name: 'Submit your application',
  active: true,
  completed: false,
  tasks: [{
    name: 'Submit your application',
    url: '/declaration',
    status: 'CANNOT START YET'
  }]
}]
