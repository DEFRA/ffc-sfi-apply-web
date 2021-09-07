module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/basic-overview',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/basic-overview')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/basic-overview',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/basic/soil-assessment')
    }
  }
}]
