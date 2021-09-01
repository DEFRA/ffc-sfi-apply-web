const joi = require('joi')
const ViewModel = require('./models/submit')
const { sendAgreementSubmitMessage } = require('../../../../messaging')
const cache = require('../../../../cache')

const buildSubmitMessage = (applyJourney) => {
  const standards = []

  standards.push({
    id: applyJourney.selectedStandard.code,
    ambitionLevel: applyJourney.selectedAmbitionLevel.name,
    parcels: applyJourney.selectedStandard.parcels
  })

  return {
    agreementNumber: applyJourney.agreementNumber,
    sbi: applyJourney.selectedSbi.sbi,
    callerId: applyJourney.callerId,
    organisationId: applyJourney.selectedSbi.organisationId,
    agreement: {
      agreementNumber: applyJourney.agreementNumber,
      sbi: applyJourney.selectedSbi.sbi,
      paymentAmount: applyJourney.selectedAmbitionLevel.level.paymentAmount,
      standards: standards
    }
  }
}

module.exports = [{
  method: 'GET',
  path: '/v2/submit',
  options: {
    handler: (request, h) => {
      return h.view('v2/submit/submit', new ViewModel())
    }
  }
},
{
  method: 'POST',
  path: '/v2/submit',
  options: {
    validate: {
      payload: joi.object({
        submit: joi.boolean().required()
      }),
      failAction: async (request, h, error) => {
        return h.view('v2/submit/submit', new ViewModel(request.payload.submit, error)).code(400).takeover()
      }
    },
    handler: async (request, h) => {
      if (request.payload.submit) {
        const applyJourney = await cache.get('apply-journey', request.yar.id)
        if (!applyJourney.submitted) {
          const submitMessage = buildSubmitMessage(applyJourney)

          await sendAgreementSubmitMessage(submitMessage, request.yar.id)

          await cache.update('apply-journey', request.yar.id, { submitted: true })
        }
        return h.redirect('/v2/confirmation')
      }
    }
  }
}]
