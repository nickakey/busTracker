angular.module('starterApp')

.controller('starterAppController', function($scope){
  $scope.message = 'Not clicked'
  $scope.onClick = function($scope){
    $scope.message = 'Clicked';
  }
})

.component('app', {
  controller: 'starterAppController',
  templateUrl: 'src/templates/starterApp.html' 
})