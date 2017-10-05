angular.module('app')
.service('busAnimationService', function(){
  this.calculatePredictedAnimations = function (newBuses, resolve) {
    _.each(newBuses, (newBus, i)=>{
      if(!this.buses.hasOwnProperty(newBus.id)){
        this.buses[newBus.id] = {};
        var distanceToTravel = parseInt(newBus.speedKmHr) > 0 ? 400 : 0;
        var destination = geolib.computeDestinationPoint({lat: newBus.lat, lon: newBus.lon}, distanceToTravel, newBus.heading);   
        var latitudeChangePerFrame = ((destination.latitude - newBus.lat) / 375).toFixed(15);
        var longitudeChangePerFrame = ((destination.longitude - newBus.lon) / 375).toFixed(15);
        this.buses[newBus.id] = {lon: parseFloat(newBus.lon), lat: parseFloat(newBus.lat), latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}
      } else {
        var latitudeDifference = newBus.lon - this.buses[newBus.id].lon;
        var longitudeDifference = newBus.lat - this.buses[newBus.id].lat;
        this.buses[newBus.id].latitudeChangePerFrame = parseFloat((latitudeDifference / 375).toFixed(15));
        this.buses[newBus.id].longitudeChangePerFrame = parseFloat((longitudeDifference / 375).toFixed(15)); 
      }
    })
    resolve();
  }
})