angular.module('app')
.service('geoService', function($http){
  this.parseJSON = function (cb) {
    return $http.get("src/data/geo.json");
  }
})