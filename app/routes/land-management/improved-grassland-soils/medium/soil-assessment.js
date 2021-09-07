module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/medium/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/medium/soil-assessment')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/medium/soil-assessment',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/medium/soil-structure')
    }
  }
}]
