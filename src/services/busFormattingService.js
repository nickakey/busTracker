angular.module('app')
.service('busFormattingService', function(){
  this.format = function (buses) {
    return _.map(buses, (bus)=>{
      return [bus.lon, bus.lat];
    })
  }
})