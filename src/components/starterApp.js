angular.module('starterApp')

.controller('starterAppController', function($scope){
  $scope.message = 'I am a message!!'
})

.component('app', {
  controller: 'starterAppController',
  templateUrl: 'src/templates/starterApp.html' 
})