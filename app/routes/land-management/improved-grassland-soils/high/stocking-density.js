module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/high/stocking-density',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/high/stocking-density')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/high/stocking-density',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/high/soil-management')
    }
  }
}]
