module.exports = [{
  method: 'GET',
  path: '/arable-soils/basic/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/basic/organic-matter')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/basic/organic-matter',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/basic/basic-end')
    }
  }
}]
