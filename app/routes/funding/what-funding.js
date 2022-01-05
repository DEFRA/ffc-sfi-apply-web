const { required } = require('joi')
const Joi = require('joi')
const cache = require('../../cache')
const getFunding = require('../../funding/get-funding')
const ViewModel = require('./models/what-funding')

module.exports = [{
  method: 'GET',
  path: '/what-funding',
  options: {
    handler: async (request, h) => {
      const cacheMock = require('../../cache_mock')
      cache.set(request, cacheMock[0]) // mimics the cache being built up before this page

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
        standard: Joi.required()
      }),
      failAction: async (request, h, error) => {
        console.log(request.payload.standard)
        return h.view('funding/what-funding', new ViewModel(1, 2, error)).code(400).takeover()
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
      // const { standard } = request.payload
      // const { data, agreement } = await cache.get(request)

      // const funding = data?.eligibleFunding.filter(x => standard.includes(x.code)) ?? []

      // if (!funding.length) {
      //   return h.redirect('/what-funding')
      // }

      // for (const option in agreement.action) {
      //   agreement.action[option].active = funding.some(x => x.code === option)
      // }
      // agreement.funding = funding.map(x => x.code)

      // await cache.update(request, { agreement })
      // return h.redirect('/how-much')

      const { agreement } = await cache.get(request)
      const { standard } = request.payload

      if (typeof (standard) === 'string') {
        agreement.action[standard] = { actionsComplete: true }
      } else {
        standard.map(option => {
          agreement.action[option] = { actionsComplete: true }
          return 1
        })
      }

      cache.update(request, { agreement })

      return h.redirect('/task-list')
    }
  }
}]
