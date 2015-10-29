$(function() {
  var locations = [
    {
      title:'Bayern Brewing',
      position: new google.maps.LatLng(46.872617, -114.020145),
      type: 'beer'
    }, {
      title:'Big Sky Brewing',
      position: new google.maps.LatLng(46.922426, -114.0753071),
      type: 'beer'
    }, {
      title:'Draught Works',
      position: new google.maps.LatLng(46.8776892, -114.0061477),
      type: 'beer'
    }, {

      title:'Flathead Lake Brewing Co.',
      position: new google.maps.LatLng(46.8735454, -113.9949491),
      type: 'beer'
    }, {
      title:'Great Burn',
      position: new google.maps.LatLng(46.840025, -114.032837),
      type: 'beer'
    }, {
      title:'Imagine Nation Brewing Co.',
      position: new google.maps.LatLng(46.876458, -114.009638),
      type: 'beer'
    }, {
      title:'Kettle House',
      position: new google.maps.LatLng(46.867009, -113.998851),
      type: 'beer'
    }, {
      title:'Kettle House - Northside Taproom',
      position: new google.maps.LatLng(46.8779048, -113.9974585),
      type: 'beer'
    }, {
      title:'Missoula Brewing Co.',
      position: new google.maps.LatLng(46.904825, -114.0456542),
      type: 'beer'
    }, {
      title:'The Montana Distillery',
      position: new google.maps.LatLng(46.8763342, -113.99703),
      type: 'spirits'
    }, {
      title:'Montgomery Distillery',
      position: new google.maps.LatLng(46.8702904, -113.9984398),
      type: 'spirits'
    }, {
      title:'Rattlesnake Creek Distillers',
      position: new google.maps.LatLng(46.8752561, -113.9952258),
      type: 'spirits'
    }, {
      title:'Tamarack Brewing Company',
      position: new google.maps.LatLng(46.8709932, -113.9995003),
      type: 'beer'
    }
  ];
  var icons = {
    beer: {
      name: 'Beer',
      icon: 'images/beericon.png'
    },
    spirits: {
      name: 'Spirits',
      icon: 'images/martini.png'
    }
  };
  var map;
  var markers = [];
  var infoWindow = new google.maps.InfoWindow();
  var controller= new Controller;
  initializeScroll();
  controller.initializeMap();
  controller.createMarkers(locations,icons,markers,infoWindow);
});

function Controller(){};

Controller.prototype = {

  createMarkers: function () {
    for (var i in locations){
      var location = locations[i];
      var marker = new google.maps.Marker({
        position: location.position,
        icon: icons[location.type].icon,
        map: map,
        title: location.title,
        info: '<div class="h2">'+location.title+'</div>'
      });

      markers.push(marker);
      google.maps.event.addListener(marker,'click', function() {
        infoWindow.setContent( this.info );
        infoWindow.open( map, this );
      });
    }
  },
  initializeMap: function(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(46.8709932 ,-113.9995003),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  },
  createMarkers: function (locations,icons,markers,infoWindow) {
    for (var i in locations){
      var location = locations[i];
      var marker = new google.maps.Marker({
        position: location.position,
        icon: icons[location.type].icon,
        map: map,
        title: location.title,
        info: '<div class="h2">'+location.title+'</div>'
      });

      google.maps.event.addListener(marker,'click', function() {
        infoWindow.setContent( this.info );
        infoWindow.open( map, this );
      });
      markers.push(marker);
    }

    function listClick(id){
      google.maps.event.trigger(markers[id],'click');
    }

    //   function pan(latlon,title) {
    //     var coords = latlon.split(",");
    //     var title = newInfoWindow(title)
    //     console.log(coords);
    //     console.log(title);
    //     var panPoint = new google.maps.LatLng(coords[0], coords[1]);
    //     map.panTo(panPoint);
    //     infoWindow.setContent(title);
    //     infoWindow.open( map, this );
    //   }
    //   function newInfoWindow(name){
    //     return '<div class="h2">'+name+'</div>'
    //   }

    $('.businessList').on('click', function () {
      id = $(this).data('id');
      console.log(id);
      google.maps.event.trigger(markers[id],'click');
    });

  },

}



//smooth scroll function
function initializeScroll(){
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
}






