angular.module('app')

.directive('map', function(geoService){
  return {

    link: function($scope, templateDOM){
      geoService.getJSON()
      .then((geoData)=>{this.drawMap(templateDOM, geoData)})
    },

    drawMap(templateDOM, geoData){ 
      var canvasContext = templateDOM[0].firstChild.getContext('2d');
      var neighborhoodsJSON = geoData.data.neighborhoods;
      var steetsJSON = geoData.data.streets;
      var cityCoordinates = geoData.data.cityCoordinates;

      var height = window.innerHeight;
      var width = window.innerWidth;

      var cityProjection = d3.geo.mercator()
        .center(cityCoordinates)
        .scale(300000)
        .translate([width / 2, height / 2]);
      
      var path = d3.geo.path()
        .projection(cityProjection)
        .context(canvasContext);
      canvasContext.beginPath();

      path(neighborhoodsJSON);
      canvasContext.fillStyle = '#abf2f1';
      canvasContext.fill();
      canvasContext.lineWidth = '2';
      canvasContext.strokeStyle = '#7febea';
      canvasContext.stroke();
      canvasContext.beginPath();

      path(steetsJSON);
      canvasContext.lineWidth = '1.5';
      canvasContext.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      canvasContext.stroke();
    },
    templateUrl: 'src/templates/map.html',
  }
})