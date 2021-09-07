module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/green-cover',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/green-cover')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/green-cover',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/organic-matter')
    }
  }
}]
