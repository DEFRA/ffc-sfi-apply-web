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

      const eligibleFunding = await getFunding(request) ?? undefined
      await cache.update(request, { data: { eligibleFunding: eligibleFunding } })

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
        const { agreement } = await cache.get(request)
        const { funding } = agreement
        const eligibleFunding = await getFunding(request) ?? undefined
        if (!eligibleFunding) {
          return h.view('no-response').takeover()
        }
        return h.view('funding/what-funding', new ViewModel(eligibleFunding, funding, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const standards = typeof (request.payload.standard) === 'string' ? [request.payload.standard] : request.payload.standard
      const { data, agreement } = await cache.get(request)

      const eligibleFunding = (data?.eligibleFunding ?? []).filter(fundingObj => standards.includes(fundingObj.code))

      if (!eligibleFunding.length) {
        return h.redirect('/what-funding')
      }

      for (const option in agreement.action) {
        agreement.action[option].active = eligibleFunding.some(x => x.code === option)
      }
      agreement.funding = eligibleFunding.map(x => x.code)

      cache.update(request, { agreement })

      return h.redirect('/how-much')
    }
  }
}]
