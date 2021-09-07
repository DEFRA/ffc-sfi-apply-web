module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/medium/stocking-density',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/medium/stocking-density')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/medium/stocking-density',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/medium/medium-end')
    }
  }
}]
