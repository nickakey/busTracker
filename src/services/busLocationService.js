angular.module('app')
.service('busLocationService', function($http){
  this.getJSON = function () {
    return $http.get("http://webservices.nextbus.com/service/publicJSONFeed?command=vehicleLocations&a=sf-muni&t=1229637162309");
  }
})

