const getCalculation = require('../../../calculate')
const STANDARD_CODE = 'sfi-arable-soil'
const LEVEL = 'Introductory'

module.exports = [{
  method: 'GET',
  path: '/arable/qualify-for-arable-funding',
  options: {
    handler: async (request, h) => {
      const calculation = await getCalculation(request, STANDARD_CODE, LEVEL)
      if (!calculation) {
        return h.view('no-response')
      }
      return h.view('actions/arable-soil/qualify', { ...calculation })
    }
  }
}]
