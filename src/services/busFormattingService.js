angular.module('app')
.service('busService', function(){
  this.calculatePredictedAnimations = function (newBuses) {
    console.log('calculatePredictedAnimations is being called! ')
    // var bus = newBuses[0];
    // var destinationPoint = geolib.computeDestinationPoint({lat: bus.lat, lon: bus.lon}, 53, bus.heading);
    // destinationPoint.latitude = round('round', destinationPoint.latitude, 6);
    // destinationPoint.longitude = round('round', destinationPoint.longitude, 6);

    // console.log('this is original lat ', bus.lat);
    // console.log('this is the new lat ', destinationPoint.latitude);
    // console.log('this is original lon ', bus.lon);
    // console.log('this is the new lon ', destinationPoint.longitude);
    // var latitudeDifference = destinationPoint.latitude - bus.lat;
    // var longitudeDifference = destinationPoint.longitude - bus.lon;
    // var latitudeChangePerFrame = (latitudeDifference / 375).toFixed(15);
    // var longitudeChangePerFrame = (longitudeDifference / 375).toFixed(15);
    // console.log('this is the lat difference ', latitudeDifference);
    // console.log('this is the lon difference ', longitudeDifference)
    // console.log('this is the per frame LAT difference ', (latitudeDifference / 375).toFixed(13))
    // console.log('this is the per frame LON difference ', (longitudeDifference / 375).toFixed(13))
    // console.log('this is the lat diffrence ', latitudeDifference)
    // console.log('this is the lon diffrence ', latitudeDifference)
    //var latitudeLongitudeChangePerFrame = {latitudeChange: latitudeDifferencePerFrame, longitudeChange: longitudeDifferencePerFrame}
    // console.log(latitudeLongitudeChangePerFrame)
    //return {coords: [parseFloat(bus.lon), parseFloat(bus.lat)]}

    return _.map(newBuses, (bus)=>{
      console.log('map is being called!')

      var destinationPoint = geolib.computeDestinationPoint({lat: bus.lat, lon: bus.lon}, 300, bus.heading);
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

  }
})