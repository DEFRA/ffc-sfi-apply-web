const Joi = require('joi')
const getEligibleOrganisations = require('../eligibility')
const cache = require('../cache')
const ViewModel = require('./models/search')
const schema = require('./schemas/sbi')
const { LIMIT, getTotalPages, getPagination, getPagingData } = require('../pagination')

module.exports = [{
  method: 'GET',
  path: '/eligible-organisations',
  options: {
    validate: {
      query: Joi.object({
        page: Joi.number().integer().greater(0).default(1)
      }),
      failAction: async (request, h, error) => {
        const eligibility = (await cache.get('agreement', request.yar.id)).application.eligibleOrganisations
        return h.view('eligible-organisations', { organisations: eligibility, ...new ViewModel() }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      let eligibleOrganisations = await getEligibleOrganisations(request)

      if (!eligibleOrganisations) {
        return h.view('no-response')
      }

      if (!eligibleOrganisations.length) {
        return h.view('no-businesses')
      }

      if (eligibleOrganisations.length === 1) {
        return h.redirect(`/start-application?sbi=${eligibleOrganisations[0].sbi}`)
      }

      if (eligibleOrganisations.length > 10) {
        const total = eligibleOrganisations.length
        const page = request.query.page <= getTotalPages(total) ? request.query.page : getTotalPages(total)

        const offset = getPagination(page)
        const pagingData = getPagingData(total, page, request.headers.path)

        eligibleOrganisations = eligibleOrganisations.slice(offset, page * LIMIT)

        return h.view('eligible-organisations', { organisations: eligibleOrganisations, ...new ViewModel(), pagination: true, ...pagingData })
      }

      return h.view('eligible-organisations', { organisations: eligibleOrganisations, ...new ViewModel() })
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
      const { data } = await cache.get(request)
      const organisations = data.eligibleOrganisations
      const organisation = organisations.filter(x => x.sbi === sbi)

      if (organisation.length) {
        return h.view('eligible-organisations', { organisations: organisation, ...new ViewModel(sbi) })
      }
      return h.view('eligible-organisations', new ViewModel(sbi, { message: 'No organisation matching SBI.' })).code(400)
    }
  }
}]
