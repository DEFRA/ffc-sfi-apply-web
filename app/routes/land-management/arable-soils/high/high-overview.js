module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/high-overview',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/high-overview')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/high-overview',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/soil-assessment')
    }
  }
}]
