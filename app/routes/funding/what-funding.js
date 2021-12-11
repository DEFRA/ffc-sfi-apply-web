const Joi = require('joi')
const cache = require('../../cache')
const getFunding = require('../../funding/get-funding')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/what-funding',
  options: {
    handler: async (request, h) => {
      const { agreement } = await cache.get(request)
      const { funding } = agreement
      const eligibleFunding = await getFunding(request)
      if (!eligibleFunding) {
        return h.view('no-response')
      }
      return h.view('funding/what-funding', new ViewModel(eligibleFunding, funding))
    }
  }
},
{
  method: 'POST',
  path: '/what-funding',
  options: {
    validate: {
      payload: Joi.object({
        standard: Joi.array().items(Joi.string()).single()
      }),
      failAction: async (request, h, error) => {
        const { agreement } = await cache.get(request)
        const { funding } = agreement
        const eligibleFunding = await getFunding(request)
        if (!eligibleFunding) {
          return h.view('no-response').takeover()
        }
        return h.view('funding/what-funding', new ViewModel(eligibleFunding, funding, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const standard = request.payload
      const { data } = await cache.get(request)

      const funding = data?.eligibleFunding.filter(x => standard.includes(x.code)) ?? []

      if (!funding.length) {
        return h.redirect('/what-funding')
      }
      await cache.update(request, { agreement: { funding } })
      return h.redirect('/how-much')
    }
  }
}]
