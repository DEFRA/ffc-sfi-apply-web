const getCalculation = require('../../../calculate')
const STANDARD_CODE = 'sfi-arable-soil'
const LEVEL = 'Intermediate'

module.exports = [{
  method: 'GET',
  path: '/arable/qualify-for-extra-arable-funding',
  options: {
    handler: async (request, h) => {
      const calculation = await getCalculation(request, STANDARD_CODE, LEVEL, true)
      if (!calculation) {
        return h.view('no-response')
      }
      return h.view('actions/arable-soil/qualify-extra', { ...calculation })
    }
  }
}]
