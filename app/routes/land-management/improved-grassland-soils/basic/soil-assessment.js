module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/basic/soil-structure')
    }
  }
}]
