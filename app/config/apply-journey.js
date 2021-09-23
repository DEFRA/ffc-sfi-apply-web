module.exports = [
  {
    key: 'home',
    sequence: 1,
    route: '/',
    back: '',
    next: '/sign-in',
    decision: [],
    redirect: '',
    taskList: {}
  },
  {
    key: 'sign-in',
    sequence: 2,
    route: '/sign-in',
    back: '/',
    next: '/which-business',
    decision: [],
    redirect: '',
    taskList: {}
  },
  {
    key: 'which-business',
    sequence: 3,
    route: '/which-business',
    back: '/sign-in',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {}
  },
  {
    key: 'application-task-list',
    sequence: 4,
    route: '/application-task-list',
    back: '/which-business',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {}
  },
  {
    key: 'confirm-details',
    sequence: 5,
    route: '/confirm-details',
    back: '/application-task-list',
    next: '/relationship',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Land and business details',
      dependsOn: '',
      title: 'Confirm your land and business details',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'relationship',
    sequence: 6,
    route: '/relationship',
    back: '/confirm-details',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {}
  },
  {
    key: 'what-funding',
    sequence: 7,
    route: '/funding-options/what-funding',
    back: '/application-task-list',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Funding options',
      dependsOn: 'relationship',
      title: 'Choose funding option',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'what-funding',
    sequence: 7,
    route: '/funding-options/what-funding',
    back: '/application-task-list',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Funding options',
      dependsOn: 'relationship',
      title: 'Choose funding option',
      status: 'CANNOT START YET'
    }
  }]
