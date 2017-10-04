angular.module('app')

.directive('map', function(geoService, busLocationService, busFormattingService){
  return {

    cityProjection: d3.geo.mercator().center([-122.4194, 37.7749]).scale(350000).translate([window.innerWidth / 2, window.innerHeight / 2]),

    link: function($scope, templateDOM){
      geoService.getJSON()
      .then((geoData)=>{
        this.drawMap(templateDOM, geoData);
      })
      busLocationService.getJSON()
      .then((busData)=>{
        this.drawBuses(templateDOM, busData);
      })
    },

    drawMap(templateDOM, geoData){ 
      var canvasContext = templateDOM[0].children[0].getContext('2d');
      var neighborhoodsJSON = geoData.data.neighborhoods;
      var steetsJSON = geoData.data.streets;
      var cityCoordinates = geoData.data.cityCoordinates;
      
      var path = d3.geo.path()
        .projection(this.cityProjection)
        .context(canvasContext);

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

    drawBuses(templateDOM, busData){
      var buses = busFormattingService.format(busData.data.vehicle);
      var canvasContext = templateDOM[0].children[1].getContext('2d');

      var path = d3.geo.path()
        .projection(this.cityProjection)
        .context(canvasContext)

      var circle = d3.geo.circle()      

      for(let i = 0; i < buses.length; i++){
        canvasContext.beginPath()
        path(circle.origin(buses[i]).angle(0.0003)())
        canvasContext.fillStyle = '#3388a7'
        canvasContext.fill()
      }          
    },

    animateBuses(){
      //set interval to draw Buses
    },

    templateUrl: 'src/templates/map.html',
  }
})