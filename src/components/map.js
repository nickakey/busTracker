angular.module('app')

.directive('map', function(geoService, busLocationService, busService){
  return {

    cityProjection: d3.geo.mercator().center([-122.4194, 37.7749]).scale(500000).translate([window.innerWidth / 2, window.innerHeight / 2]),
    buses: null,

    link: function($scope, templateDOM){
      geoService.getJSON()
      .then((geoData)=>{
        return this.drawMap(templateDOM, geoData);
      })
      .then(()=>{
        this.drawBuses(templateDOM);
      })
      // busLocationService.getJSON()
      // .then((busData)=>{
      //   this.drawBuses(templateDOM, busData);
      // })
    },

    drawBuses(templateDOM){
      this.calculateAnimations();
      //this.renderBuses(templateDOM);
      //setInterval(()=>{this.calculateAnimations()}, 15000);
      setTimeout(()=>{myInterval = setInterval(()=>{this.renderBuses(templateDOM)}, 40)}, 2000)
      //setTimeout(()=>{clearInterval(myInterval)}, 3000)
    },

    drawMap(templateDOM, geoData){ 
      var canvasContext = templateDOM[0].children[0].getContext('2d');
      
      var path = d3.geo.path()
        .projection(this.cityProjection)
        .context(canvasContext);

      path(geoData.data.neighborhoods);
      canvasContext.fillStyle = '#abf2f1';
      canvasContext.fill();
      canvasContext.lineWidth = '2';
      canvasContext.strokeStyle = '#7febea';
      canvasContext.stroke();
      canvasContext.beginPath();

      path(geoData.data.streets);
      canvasContext.lineWidth = '1.5';
      canvasContext.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      canvasContext.stroke();
    },

    calculateAnimations(){
      busLocationService.getJSON()
      .then((busData)=>{
        if(!this.buses){
          this.buses = busService.calculatePredictedAnimations(busData.data.vehicle);
        } else {
          this.buses = busService.calculateActualAnimations(busData.data.vehicle, this.buses);
        }
      })
    },

    renderBuses(templateDOM){
      console.log('renderbuses is being called ')
      var canvasContext = templateDOM[0].children[1].getContext('2d');
      canvasContext.clearRect(0, 0, 900, 900);      

      var path = d3.geo.path()
        .projection(this.cityProjection)
        .context(canvasContext)

      var circle = d3.geo.circle()      

      for(let i = 0; i < this.buses.length; i++){
        this.buses[i].coords[0] = this.buses[i].coords[0] + this.buses[i].longitudeChangePerFrame;
        this.buses[i].coords[1] = this.buses[i].coords[1] + this.buses[i].latitudeChangePerFrame;
        canvasContext.beginPath()
        path(circle.origin(this.buses[i].coords).angle(0.0003)())
        canvasContext.fillStyle = '#3388a7'
        canvasContext.fill()
      }          
    },

    animateBuses(){
    },

    templateUrl: 'src/templates/map.html',
  }
})