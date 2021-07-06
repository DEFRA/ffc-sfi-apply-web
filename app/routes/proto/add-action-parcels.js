function viewModel (sbi, std, stdArea, level) {
  return {
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`, `Standard Area: ${stdArea}ha`, `Level: ${level}`]
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/add-action-parcels',
    handler: async (request, h) => {
      return h.view('proto/add-action-parcels', viewModel(
        request.yar.get('proto-sbi'),
        request.yar.get('proto-std'),
        request.yar.get('proto-std-area'),
        request.yar.get('proto-level')
      ))
    }
  },
  {
    method: 'POST',
    path: '/proto/add-action-parcels',
    handler: async (request, h) => {
      return h.redirect('/proto/calculate-payment')
    }
  }
]
