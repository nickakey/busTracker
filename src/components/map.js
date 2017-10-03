angular.module('app')

.controller('mapController', function($scope){
  $scope.message = 'Not clicked'
  $scope.update = function(){
    $scope.message = 'Clicked';
  }
})

.directive('map', ()=>{
  return {
    link: function(scope, element){
      console.log(arguments)
    },
    templateUrl: 'src/templates/map.html' 
  }
})