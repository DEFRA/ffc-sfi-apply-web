module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/soil-management',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/soil-management')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/soil-management',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/high-end')
    }
  }
}]
