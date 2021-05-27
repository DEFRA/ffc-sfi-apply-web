module.exports = [{
  method: 'GET',
  path: '/payment-details/bank-details',
  options: {
    handler: (request, h) => {
      return h.view('payment-details/bank-details')
    }
  }
},
{
  method: 'POST',
  path: '/payment-details/bank-details',
  options: {
    handler: async (request, h) => {
      return h.redirect('/application-task-list')
    }
  }
}]
