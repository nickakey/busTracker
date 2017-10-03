angular.module('app')
.service('geoJSON', function($http){
  this.parseJSON = function (cb) {
    return $http.get("src/data/geo.json");
  }
})