$(function() {

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
  var locations = [];
  var infoWindow = new google.maps.InfoWindow();
  initializeScroll();
  initializeMap();
  getMarkerData(icons,markers,infoWindow);
  bindListeners(markers);
});


  function getMarkerData(icons,markers,infoWindow){
  var requestAjax = $.ajax({
    url: '../file/locations.json',
    type: 'GET',
    });
    requestAjax.done(function(data){
      locations = data;
      createMarkers(locations,icons,markers,infoWindow);
    });
    requestAjax.fail(function(jqXHR, textStatus, errorThrown){
      alert(errorThrown);
      alert(textStatus);
    });
  }

  function initializeMap(){
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: new google.maps.LatLng(46.8709932 ,-113.9995003),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
  }

  function createMarkers(locations,icons,markers,infoWindow) {
    console.log(locations);
    for (var i in locations){
      var location = locations[i];
      var myLatLng = new google.maps.LatLng(location.lat,location.lng);
      var marker = new google.maps.Marker({
        position: myLatLng,
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
  }

  function bindListeners(markers){
    function pan(latlon) {
      var coords = latlon.split(",");
      var panPoint = new google.maps.LatLng(coords[0], coords[1]);
      map.panTo(panPoint);
    }
    $('.businessList').on('click', function () {
      var id = $(this).data('id');
      var latlon = $(this).data('location');
      pan(latlon);
      google.maps.event.trigger(markers[id],'click');
    });
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












