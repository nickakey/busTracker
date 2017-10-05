angular.module('app')
.service('busAnimationService', function(){
  this.calculatePredictedAnimations = function (newBuses, resolve) {
    _.each(newBuses, (newBus, i)=>{
      if(!this.buses.hasOwnProperty(newBus.id)){
        this.buses[newBus.id] = {};
        var distanceToTravel = parseInt(newBus.speedKmHr) > 0 ? 250 : 0;
        var destination = geolib.computeDestinationPoint({lat: newBus.lat, lon: newBus.lon}, distanceToTravel, newBus.heading);   
        var latitudeChangePerFrame = ((destination.latitude - newBus.lat) / 150).toFixed(15);
        var longitudeChangePerFrame = ((destination.longitude - newBus.lon) / 150).toFixed(15);
        this.buses[newBus.id] = {lon: parseFloat(newBus.lon), lat: parseFloat(newBus.lat), latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}
      } else {
        var latitudeDifference = newBus.lat - this.buses[newBus.id].lat;
        var longitudeDifference = newBus.lon - this.buses[newBus.id].lon;
        this.buses[newBus.id].latitudeChangePerFrame = parseFloat((latitudeDifference / 130.43478261));
        this.buses[newBus.id].longitudeChangePerFrame = parseFloat((longitudeDifference / 130.43478261)); 
      }
    })
    resolve();
  }
})