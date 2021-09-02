module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/basic-overview',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/basic-overview')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/basic-overview',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/basic/soil-assessment')
    }
  }
}]
