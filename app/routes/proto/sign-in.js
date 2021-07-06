function viewModel () {
  return {
    usernameInput: {
      label: {
        text: 'Username'
      },
      classes: 'govuk-input--width-10',
      id: 'username',
      name: 'username'
    },
    passwordInput: {
      label: {
        text: 'Password'
      },
      classes: 'govuk-input--width-10',
      id: 'password',
      name: 'password',
      type: 'password'
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/sign-in',
    handler: async (request, h) => {
      return h.view('proto/sign-in', viewModel())
    }
  },
  {
    method: 'POST',
    path: '/proto/sign-in',
    handler: async (request, h) => {
      return h.redirect('/proto/choose-sbi')
    }
  }
]
