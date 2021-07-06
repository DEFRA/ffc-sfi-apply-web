function viewModel (amount, area, sbi, std, stdArea, level) {
  return {
    paymentStatement: `You could receive £${amount} for SFI standards on ${area}ha of land.`,
    sidebarItems: [`SBI: ${sbi}`, `Standard: ${std}`, `Standard Area: ${stdArea}ha`, `Level: ${level}`]
  }
}

module.exports = [
  {
    method: 'GET',
    path: '/proto/calculate-payment',
    handler: async (request, h) => {
      const level = request.yar.get('proto-level')
      const area = Number(request.yar.get('proto-std-area'))
      let value

      console.log(level)

      if (level === 'Introductory') {
        value = area * 26.0
      } else if (level === 'Intermediate') {
        value = area * 44.0
      } else if (level === 'Advanced') {
        value = area * 70.0
      }

      return h.view('proto/calculate-payment', viewModel(value, area,
        request.yar.get('proto-sbi'),
        request.yar.get('proto-std'),
        request.yar.get('proto-std-area'),
        request.yar.get('proto-level')
      ))
    }
  },
  {
    method: 'POST',
    path: '/proto/calculate-payment',
    handler: async (request, h) => {
      return h.redirect('/proto/choose-std-repeat')
    }
  }
]
