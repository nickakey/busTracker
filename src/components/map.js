angular.module('app')
.controller('mapController', function($scope, geoJSON){
  geoJSON.parseJSON()
  .then((geoJSON)=>{
    $scope.geoJSON = geoJSON;
  })
})

.directive('map', function(){
  return {
    link: function($scope, element){
      var ctx = element[0].firstChild.getContext('2d')
      console.log($scope)
      // ctx.strokeStyle="#FF0000";
      // ctx.strokeRect(20,20,150,100);

    },
    templateUrl: 'src/templates/map.html',
    controller: 'mapController'
  }
})