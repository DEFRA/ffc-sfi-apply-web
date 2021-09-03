module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/organic-matter')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/tillage')
    }
  }
}]
