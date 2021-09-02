module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/green-cover',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/green-cover')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/green-cover',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/basic/organic-matter')
    }
  }
}]
