module.exports = [{
  method: 'GET',
  path: '/arable-soils/high/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/high/organic-matter')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/high/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/high/tillage')
    }
  }
}]
