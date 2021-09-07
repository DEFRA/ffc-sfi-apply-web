module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/high/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/high/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/high/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/high/soil-structure')
    }
  }
}]
