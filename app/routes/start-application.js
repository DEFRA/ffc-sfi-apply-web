const Joi = require('joi')
const cache = require('../cache')
const sbiSchema = require('./schemas/sbi')
const agreementNumberSchema = require('./schemas/agreement-number')
const getOrganisationInformation = require('./models/start-application')

const { create } = require('../agreement')
const { getByAgreementNumber } = require('../agreement/get')
const { AUTH_COOKIE_NAME } = require('../constants/cookies')

module.exports = [{
  method: 'GET',
  path: '/start-application',
  options: {
    handler: async (request, h) => {
      const { organisation, agreements } = await getOrganisationInformation(request)
      return h.view('start-application', { organisation, agreements })
    }
  }
}, {
  method: 'POST',
  path: '/start-application',
  options: {
    validate: {
      payload: Joi.object()
        .concat(sbiSchema)
        .concat(agreementNumberSchema),
      failAction: async (request, h, error) => {
        const { organisation, agreements } = getOrganisationInformation(request)
        return h.view('start-application', { organisation, agreements, error }).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      let agreement
      const { data, crn } = await cache.get(request)
      const sbi = parseInt(request.payload.sbi)

      const agreementNumber = request.payload.agreementNumber

      await cache.reset(request)
      if (!agreementNumber) {
        agreement = create()
        // Need to include token as part of agreement to support downstream services
        // Expect to remove once Defra Identity service account is available
        agreement.token = request.state[AUTH_COOKIE_NAME]
        agreement.crn = crn
        const selectedOrganisation = data.eligibleOrganisations.find(x => x.sbi === sbi)

        if (selectedOrganisation) {
          agreement.organisation = selectedOrganisation
        }
      } else {
        const incompleteApplications = await getByAgreementNumber(agreementNumber, sbi)

        if (!incompleteApplications) {
          return h.view('404')
        }

        agreement = incompleteApplications.agreementData
      }

      if (agreement.organisation) {
        await cache.update(request, { agreement })
        return h.redirect('/task-list')
      }
      return h.redirect('/eligible-organisation')
    }
  }
}]
