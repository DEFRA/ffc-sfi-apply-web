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
      status: 'NOT STARTED'
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
    next: '/funding-options/funding-overview',
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
    key: 'funding-overview',
    sequence: 8,
    route: '/funding-options/funding-overview',
    back: '/funding-options/what-funding',
    next: '/funding-options/how-much',
    decision: [
      { key: '130', value: 'funding-options/grassland-overview' },
      { key: '110', value: 'funding-options/arable-overview' }
    ],
    redirect: '',
    taskList: {
      group: 'Funding options',
      dependsOn: 'what-funding',
      title: 'Funding option overview',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'how-much',
    sequence: 9,
    route: '/funding-options/how-much',
    back: '/funding-options/funding-overview',
    next: '/funding-options/what-payment-level',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Funding options',
      dependsOn: 'funding-overview',
      title: 'Add the amount of land you will use',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'what-payment-level',
    sequence: 10,
    route: '/funding-options/what-payment-level',
    back: '/funding-options/how-much',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Funding options',
      dependsOn: 'how-much',
      title: 'Choose a payment level',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'basic-overview',
    sequence: 11,
    route: '/improved-grassland-soils/basic/basic-overview',
    back: '/application-task-list',
    next: '/improved-grassland-soils/payment-schedule',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Create your land management agreement',
      dependsOn: 'what-payment-level',
      title: 'Tell us how you will carry out the actions',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'payment-schedule',
    sequence: 12,
    route: '/payment-schedule',
    back: '/improved-grassland-soils/basic/basic-end',
    next: '/check-your-answers',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Create your land management agreement',
      dependsOn: 'basic-overview',
      title: 'Choose your payment schedule',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'check-your-answers',
    sequence: 13,
    route: '/check-your-answers',
    back: '/payment-schedule',
    next: '/review-your-agreement',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Create your land management agreement',
      dependsOn: 'payment-schedule',
      title: 'Check your answers',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'review-your-agreement',
    sequence: 14,
    route: '/review-your-agreement',
    back: '/check-your-answers',
    next: '/application-task-list',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Create your land management agreement',
      dependsOn: 'check-your-answers',
      title: 'View your agreement',
      status: 'CANNOT START YET'
    }
  },
  {
    key: 'declaration',
    sequence: 15,
    route: '/declaration',
    back: '/application-task-list',
    next: '',
    decision: [],
    redirect: '',
    taskList: {
      group: 'Submit your application',
      dependsOn: 'review-your-agreement',
      title: 'Submit your application',
      status: 'CANNOT START YET'
    }
  }]
