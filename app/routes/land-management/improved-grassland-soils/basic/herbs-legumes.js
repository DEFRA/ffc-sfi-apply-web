module.exports = [{
  method: 'GET',
  path: '/improved-grassland-soils/basic/herbs-legumes',
  options: {
    handler: async (request, h) => {
      return h.view('land-management/improved-grassland-soils/basic/herbs-legumes')
    }
  }
},
{
  method: 'POST',
  path: '/improved-grassland-soils/basic/herbs-legumes',
  options: {
    handler: async (request, h) => {
      return h.redirect('/improved-grassland-soils/basic/stocking-density')
    }
  }
}]
