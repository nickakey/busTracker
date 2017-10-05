angular.module('app')
.service('busService', function(){
  this.calculatePredictedAnimations = function (newBuses) {
    return _.map(newBuses, (bus)=>{
      var metersPer15Seconds = parseInt(bus.speedKmHr) > 0 ? 300 : 0;
      var destinationPoint = geolib.computeDestinationPoint({lat: bus.lat, lon: bus.lon}, metersPer15Seconds, bus.heading);
      destinationPoint.latitude = round('round', destinationPoint.latitude, 6);
      destinationPoint.longitude = round('round', destinationPoint.longitude, 6);      
      var latitudeDifference = destinationPoint.latitude - bus.lat;
      var longitudeDifference = destinationPoint.longitude - bus.lon;
      var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
      var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15);      
      return {coords: [parseFloat(bus.lon), parseFloat(bus.lat)], latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}
    })
  }
  this.calculateActualAnimations = function (newBuses, oldBuses){
    return _.map(newBuses, (newBus, i)=>{
      if(oldBuses[i]){
        var oldBus = oldBuses[i];
        var latitudeDifference = newBus.lon - oldBus.coords[0];
        var longitudeDifference = newBus.lat - oldBus.coords[1];
        var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
        var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15); 
        // console.log('this is the latitudeDifference ', latitudeDifference)
        // console.log('this is the longitudeDifference ', longitudeDifference)
        // console.log('this is latitudeChangePerFrame ', latitudeChangePerFrame) 
        // console.log('this is longitudeChangePerFrame ', longitudeChangePerFrame) 
        return {coords: [parseFloat(oldBus.coords[0]), parseFloat(oldBus.coords[1])], latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}
      }
    return {coords: [parseFloat(newBus.lon), parseFloat(newBus.lat)], latitudeChangePerFrame: 0, longitudeChangePerFrame: 0}
    })
  }
})