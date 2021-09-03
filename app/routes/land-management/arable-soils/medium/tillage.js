module.exports = [{
  method: 'GET',
  path: '/arable-soils/medium/tillage',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/arable-soils/medium/tillage')
    }
  }
},
{
  method: 'POST',
  path: '/arable-soils/medium/tillage',
  options: {
    handler: async (request, h) => {
      return h.redirect('/arable-soils/medium/medium-end')
    }
  }
}]
