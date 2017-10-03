angular.module('app')
// .controller('mapController', function($scope, geoJSON){
//   geoJSON.parseJSON()
//   .then((geoJSON)=>{
//     $scope.geoJSON = geoJSON;
//   })
// })

.directive('map', function(geoJSON){
  return {
    link: function($scope, element){

      var ctx = element[0].firstChild.getContext('2d')

      var height = window.innerHeight;
      var width = window.innerWidth;

      var projection = d3.geo.mercator()
      .center([-122.4194, 37.7749])
      .scale(300000)
      .translate([width / 2, height / 2])

      geoJSON.parseJSON()
      .then((data)=>{
        console.log('this is the data! ', data)
        var neighborhoods = data.data.neighborhoods;

        var path = d3.geo.path()
        .projection(projection)
        .context(ctx)      
        ctx.beginPath()
        path(neighborhoods)
        ctx.fillStyle = '#dcd8d2'
        ctx.fill()
        ctx.lineWidth = '2'
        ctx.strokeStyle = '#c9c4bc'
        ctx.stroke()  
      })
    },
    templateUrl: 'src/templates/map.html',
    // controller: 'mapController'
  }
})