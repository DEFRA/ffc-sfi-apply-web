module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/medium-overview',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/medium-overview')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/medium-overview',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/soil-assessment')
    }
  }
}]
