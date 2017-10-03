angular.module('app')

.controller('mapController', function($scope){
  $scope.message = 'Not clicked'
  $scope.update = function(){
    $scope.message = 'Clicked';
  }
})

.component('map', {
  controller: 'mapController',
  templateUrl: 'src/templates/map.html' 
})