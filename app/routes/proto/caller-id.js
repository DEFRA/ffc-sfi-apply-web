function viewModel () {
  return {
    input: {
      label: {
        text: 'Caller ID'
      },
      classes: 'govuk-input--width-10',
      id: 'callerid',
      name: 'callerid'
    }
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/caller-id',
    handler: async (request, h) => {
      return h.view('proto/caller-id', viewModel())
    }
  },
  {
    method: 'POST',
    path: '/proto/caller-id',
    handler: async (request, h) => {
      request.yar.set('callerId', request.payload.callerid)
      return h.redirect('/proto/choose-sbi')
    }
  }
]
