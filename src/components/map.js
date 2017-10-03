angular.module('app')

.controller('mapController', function($scope){
  $scope.message = 'Not clicked'
  $scope.update = function(){
    $scope.message = 'Clicked';
  }
})

.directive('map', ()=>{
  return {
    templateUrl: 'src/templates/map.html' 
  }
})