angular.module('app')

.directive('map', function(geoService, busLocationService, busAnimationService){
  return {

    cityProjection: d3.geo.mercator().center([-122.4194, 37.7749]).scale(500000).translate([window.innerWidth / 2, window.innerHeight / 2]),
    buses: {},

    link: function($scope, templateDOM){
      this.loadingScreenOn();
      this.initMap($scope, templateDOM)
      .then(()=>{
        this.loadingScreenOff();
      })
    },

    loadingScreenOn: function(){
      var body = document.getElementById('body');
      var loadingScreen = document.createElement('div');      
      loadingScreen.innerHTML = 'LOADING';
      loadingScreen.setAttribute("style","width: 1000px; height: 650px; z-index: 5; position: absolute; left: 0px; top: 0px; background-color: white;")
      loadingScreen.id = 'loading';
      body.appendChild( loadingScreen )
    },

    loadingScreenOff: function(){
      var loadingScreen = document.getElementById('loading');
      loadingScreen.outerHTML = '';
    },

    initMap: function($scope, templateDOM){
      return new Promise((resolve, reject)=>{
        geoService.getJSON()
        .then((geoData)=>{
          return this.drawMap(templateDOM, geoData);
        })
        .then(()=>{
          return this.drawBuses(templateDOM);
        })
        .then(()=>{
          resolve();
        })
        .catch((err)=>{
          throw err;
        })
      })
    },

    drawBuses(templateDOM){
      return new Promise((resolve, reject)=>{
        this.prepareAnimations()
        .then(()=>{
          setInterval(()=>{this.renderBuses(templateDOM, resolve)}, 115)
          setInterval(()=>{this.prepareAnimations()}, 15000);
        })
      })      
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

    prepareAnimations(){
      return new Promise((resolve, reject) => {
        busLocationService.getJSON()
        .then((busData)=>{
          busAnimationService.calculateAnimations.call(this, busData.data.vehicle, resolve);
        })
        .catch((err)=>{
          throw err;
        })
      })
    },

    renderBuses(templateDOM, resolve){
      var canvasContext = templateDOM[0].children[1].getContext('2d');
      canvasContext.clearRect(0, 0, 1000, 650);   

      var path = d3.geo.path()
        .projection(this.cityProjection)
        .context(canvasContext)

      var circle = d3.geo.circle()      

      for(currentBus in this.buses){
        var bus = this.buses[currentBus];
        bus.lon += bus.longitudeChangePerFrame;
        bus.lat += bus.latitudeChangePerFrame;
        canvasContext.beginPath()
        path(circle.origin([bus.lon, bus.lat]).angle(0.00024)())
        canvasContext.fillStyle = '#3388a7'
        canvasContext.fill()
      } 
      resolve();         
    },

    templateUrl: 'src/templates/map.html',
  }
})