module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/green-cover',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/green-cover')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/green-cover',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/organic-matter')
    }
  }
}]
