const getPollingResponse = require('../../../../polling')
const cache = require('../../../../cache')

module.exports = [{
  method: 'GET',
  path: '/check-eligibility/eligible',
  options: {
    handler: async (request, h) => {
      const response = await getPollingResponse(request.yar.id, '/eligibility')

      if (response) {
        console.info('Eligibility result received', response)

        if (response.isEligible) {
          await cache.update('progress', request.yar.id, {
            progressId: 0,
            progress: {
              eligibility: true
            }
          })

          return h.view('check-eligibility/eligible')
        }

        return h.view('check-eligibility/not-eligible')
      }

      return h.view('no-response')
    }
  }
}]
