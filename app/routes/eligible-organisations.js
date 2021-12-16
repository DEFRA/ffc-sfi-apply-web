const joi = require('joi')
const cache = require('../cache')
const getEligibility = require('../eligibility')
const ViewModel = require('./models/search')
const schema = require('./schemas/sbi')
const { LIMIT, getTotalPages, getPagination, getPagingData } = require('../pagination')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
  options: {
    validate: {
      query: joi.object({
        page: joi.number().integer().greater(0).default(1)
      }),
      failAction: async (request, h, error) => {
        const eligibility = (await cache.get('agreement', request.yar.id)).application.eligibleOrganisations
        return h.view('eligible-organisations', { organisations: eligibility, ...new ViewModel() }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      let { eligibility } = await getEligibility(request)

      if (!eligibility) {
        return h.view('no-response')
      }

      if (!eligibility.length) {
        return h.view('no-businesses')
      }

      if (eligibility.length === 1) {
        return h.redirect(`/start-application?sbi=${eligibility[0].sbi}`)
      }

      if (eligibility.length > 10) {
        const total = eligibility.length
        const page = request.query.page <= getTotalPages(total) ? request.query.page : getTotalPages(total)

        const offset = getPagination(page)
        const pagingData = getPagingData(total, page, request.headers.path)

        eligibility = eligibility.slice(offset, page * LIMIT)

        return h.view('eligible-organisations', { organisations: eligibility, ...new ViewModel(), pagination: true, ...pagingData })
      }

      return h.view('eligible-organisations', { organisations: eligibility, ...new ViewModel() })
    }
  }
},
{
  method: 'POST',
  path: '/eligible-organisations',
  options: {
    validate: {
      payload: schema,
      failAction: async (request, h, error) => {
        return h.view('eligible-organisations', new ViewModel(request.payload.sbi, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      const sbi = request.payload.sbi
      const agreement = await cache.get('agreement', request.yar.id)
      const organisations = agreement.application.eligibleOrganisations
      const organisation = organisations.filter(organisation => organisation.sbi === sbi)

      if (organisation.length) {
        return h.view('eligible-organisations', { organisations: organisation, ...new ViewModel(sbi) })
      }
      return h.view('eligible-organisations', new ViewModel(sbi, { message: 'No organisation matching SBI.' })).code(400)
    }
  }
}]
