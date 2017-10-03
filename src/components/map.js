angular.module('app')

.directive('map', function(geoService){
  return {

    link: function($scope, element){
      geoService.parseJSON()
      .then((geoData)=>{this.draw(element, geoData)})
    },

    draw(element, geoData){ 
      var ctx = element[0].firstChild.getContext('2d')
      var neighborhoods = geoData.data.neighborhoods;
      var streets = geoData.data.streets;

      var height = window.innerHeight;
      var width = window.innerWidth;

      var projection = d3.geo.mercator()
      .center([-122.4194, 37.7749])
      .scale(300000)
      .translate([width / 2, height / 2]);
      

      var path = d3.geo.path()
      .projection(projection)
      .context(ctx);
      ctx.beginPath();
      path(neighborhoods);
      ctx.fillStyle = '#dcd8d2';
      ctx.fill();
      ctx.lineWidth = '2';
      ctx.strokeStyle = '#c9c4bc';
      ctx.stroke();
      ctx.beginPath();
      path(streets);
      ctx.lineWidth = '1.5';
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.stroke();
    },
    templateUrl: 'src/templates/map.html',
    // controller: 'mapController'
  }
})