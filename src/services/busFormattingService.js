angular.module('app')
.service('busService', function(){
  this.calculatePredictedAnimations = function (newBuses) {
    _.each(newBuses, (newBus, i)=>{
      console.log(newBus)
      // console.log('this should be false ', this.buses.hasOwnProperty(newBus.))
      var metersPer15Seconds = parseInt(newBus.speedKmHr) > 0 ? 400 : 0;
      var destinationPoint = geolib.computeDestinationPoint({lat: newBus.lat, lon: newBus.lon}, metersPer15Seconds, newBus.heading);
      destinationPoint.latitude = round('round', destinationPoint.latitude, 6);
      destinationPoint.longitude = round('round', destinationPoint.longitude, 6);      
      var latitudeDifference = destinationPoint.latitude - newBus.lat;
      var longitudeDifference = destinationPoint.longitude - newBus.lon;
      var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
      var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15);
      this.buses[newBus.id] = {coords: [parseFloat(newBus.lon), parseFloat(newBus.lat)], latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}      
    })
  }
  this.calculateActualAnimations = function (newBuses, oldBuses){
    _.each(newBuses, (newBus, i)=>{
      if(this.buses[newBus.id]){
        var latitudeDifference = newBus.lon - this.buses[newBus.id].coords[0];
        var longitudeDifference = newBus.lat - this.buses[newBus.id].coords[1];
        var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
        var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15); 
        this.buses[newBus.id].latitudeChangePerFrame = parseFloat(latitudeChangePerFrame);
        this.buses[newBus.id].longitudeChangePerFrame = parseFloat(longitudeChangePerFrame);
      } 
    })
  //}
  // this.calculateAnimations = function (newBuses) {
  //   _.each(newBuses, (newBus, i)=>{
  //     if(this.buses.hasOwnProperty(newBus.dirTag)){
  //       var oldBus = this.buses[newBus.dirTag];
  //       var latitudeDifference = newBus.lon - oldBus.coords[0];
  //       var longitudeDifference = newBus.lat - oldBus.coords[1];
  //       var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
  //       var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15); 
  //       console.log(latitudeDifference, longitudeDifference, latitudeChangePerFrame, latitudeChangePerFrame)
  //       // oldBus.latitudeChangePerFrame = parseFloat(latitudeChangePerFrame);
  //       // oldBus.longitudeChangePerFrame = parseFloat(longitudeChangePerFrame);
  //     } else {
  //       var metersPer15Seconds = parseInt(newBus.speedKmHr) > 0 ? 400 : 0;
  //       var destinationPoint = geolib.computeDestinationPoint({lat: newBus.lat, lon: newBus.lon}, metersPer15Seconds, newBus.heading);
  //       destinationPoint.latitude = round('round', destinationPoint.latitude, 6);
  //       destinationPoint.longitude = round('round', destinationPoint.longitude, 6);      
  //       var latitudeDifference = destinationPoint.latitude - newBus.lat;
  //       var longitudeDifference = destinationPoint.longitude - newBus.lon;
  //       var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
  //       var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15);
  //       this.buses[newBus.dirTag] = {coords: [parseFloat(newBus.lon), parseFloat(newBus.lat)], latitudeChangePerFrame: parseFloat(latitudeChangePerFrame), longitudeChangePerFrame: parseFloat(longitudeChangePerFrame)}              
  //     }
  //   })    

  }
})