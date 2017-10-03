angular.module('app')
.service('geoService', function($http){
  this.getJSON = function () {
    return $http.get("src/data/geo.json");
  }
})