angular.module('app')
.service('busService', function(){
  this.calculateAnimations = function (buses) {
    return _.map(buses, (bus)=>{
      var destinationPoint = geolib.computeDestinationPoint({lat: bus.lat, lon: bus.lon}, 96, bus.heading);
      var xyChangesPerFrame = [(destinationPoint.longitude - bus.lon) / (25*15), (destinationPoint.latitude - bus.lat) / (25*15)];
      return {coords: [parseFloat(bus.lon), parseFloat(bus.lat)]}
    })
  }
})