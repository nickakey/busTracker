angular.module('app')

.controller('starterAppController', function($scope){
  $scope.message = 'Not clicked'
  $scope.update = function(){
    $scope.message = 'Clicked';
  }
})

.component('app', {
  controller: 'starterAppController',
  templateUrl: 'src/templates/starterApp.html' 
})