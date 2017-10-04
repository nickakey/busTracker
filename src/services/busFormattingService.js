angular.module('app')
.service('busFormattingService', function(){
  this.format = function (buses) {
    console.log('this is geolib ', geolib)
    console.log('this is buses! ', buses)
    return _.map(buses, (bus)=>{
      var destinationPoint = geolib.computeDestinationPoint({lat: bus.lat, lon: bus.lon}, 96, bus.heading);
      console.log('this is the original coord ', bus.lat, bus.lon);
      console.log('this is the new coord ', destinationPoint);
      return {coords: [bus.lon, bus.lat], destinationPoint: destinationPoint}
    })
  }
})