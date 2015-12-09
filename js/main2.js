$(function() {
  initializeScroll();
  initializeVideo();
  stickyHeader();
});
window.onload = function(){
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
  initializeMap();
  getMarkerData(icons,markers,infoWindow);
}

//Initialize Google Maps
function initializeMap(){
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    scrollwheel: false,
    mapTypeControl: false,
    center: new google.maps.LatLng(46.8709932 ,-113.9995003),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}

// load JSON data then Create Cards, Create Markers and Business List
function getMarkerData(icons,markers,infoWindow){
  var requestAjax = $.ajax({
    url: '../file/locations.json',
    type: 'GET',
    });
    requestAjax.done(function(data){
      locations = data;
      createCards(locations);
      createMarkers(locations,icons,markers,infoWindow);
      createMapList(locations,markers);
    });
    requestAjax.fail(function(jqXHR, textStatus, errorThrown){
      alert(errorThrown);
      alert(textStatus);
  });
}

//Create Cards
function createCards(locations){
  for (var i in locations){
    var location = locations[i];
    $('.business-cards').append('<li class="bg-greyish border-box  flex flex-300 m1 center">'+
      '<div class="flex-card flex flex-column styled-border" style="min-width: calc(100% - 20px)">'+
        '<div class="flex-card-logo center m1 styled-border-bottom">'+
          '<img src="'+location.logo+'" width="100" height="100"/>'+
        '</div>'+
        '<div class="flex-card-text flex flex-column flex-grow">'+
          '<p class="h3">'+location.description+'</p>'+
          '<div class="address flex-grow">'+
            '<div class="h2">'+location.address+'</div>'+
            '<div class="h3">'+location.time+'</div>'+
          '</div>'+
          '<div class="">'+
            '<a href="'+location.link+'" target="_blank" class="btn h4 btn-outline styled-btn mb1">Visit website</a>'+
          '</div>'+
        '</div>'+
      '</div>'+
    '</li>');
  };
}

//Create and place markers on map
function createMarkers(locations,icons,markers,infoWindow) {
  for (var i in locations){
    var location = locations[i];
    var lat = location.lat;
    var lng = location.lng;
    var myLatLng = new google.maps.LatLng(lat,lng);
    var marker = new google.maps.Marker({
      position: myLatLng,
      icon: icons[location.type].icon,
      map: map,
      title: location.title,
      info: '<div class="list-location-title">'+
      '<a href="https://www.google.com/maps/dir/Current+Location/'+location.title+'">'+location.title+'</a>'+
      '</div>'
    });
    google.maps.event.addListener(marker,'click', function() {
      infoWindow.setContent( this.info );
      infoWindow.open( map, this );
    });
    markers.push(marker);
  }
}
// Create business list for map sidebar
function createMapList(locations,markers){
  for (var i in locations){
    var location = locations[i];
    $('.businessList').append( '<li class="lato"><a class="business flex flex-center" data-location='+location.lat+','+location.lng+' data-id='+location.id+'><div class="flex-auto lh1 px1"><div class="h2">'+location.title+'</div><div class="h3">'+location.address+'</div></div></a></li>');
  }
  function pan(latlon) {
    var coords = latlon.split(",");
    var panPoint = new google.maps.LatLng(coords[0], coords[1]);
    map.panTo(panPoint);
  }
  $('.business').on('click', function () {
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



// STICKY HEADER
function stickyHeader(){
  $(window).bind('scroll', function() {
    var navHeight = $(window).height() - 300;
    if ($(window).scrollTop() > navHeight) {
      $('.nav-menu').addClass('navbar-fixed');
      $('.passport-button').addClass('passport-fixed');
    } else {
      $('.nav-menu').removeClass('navbar-fixed');
      $('.passport-button').removeClass('passport-fixed');
    }
  });
}

// HEADER VIDEO
function initializeVideo(){
  if (window.jQuery) {

    // jQuery version
    $(document).ready(function(){

      // Add a 'js' class to the html tag
      // If you're using modernizr or similar, you
      // won't need to do this
      $('html').addClass('js');

      // Fade in videos
      var $fade_in_videos = $('.video-bg video');
      $fade_in_videos.each(function(){
        if( $(this)[0].currentTime > 0 ) {
          // It's already started playing
          $(this).addClass('is-playing');
        } else {
          // It hasn't started yet, wait for the playing event
          $(this).on('playing', function(){
            $(this).addClass('is-playing');
          });
        }
      });

      // Scrap videos on iOS because it won't autoplay,
      // it adds it's own play icon and opens the
      // media player when clicked
      var iOS = /iPad|iPhone|iPod/.test(navigator.platform) || /iPad|iPhone|iPod/.test(navigator.userAgent);
      if( iOS ) {
        $('.video-bg video').remove();
      }

    });

  } else {

    // Vanilla JS version

    // Add a 'js' class to the html tag
    // If you're using modernizr or similar, you
    // won't need to do this
    document.documentElement.className += " js";

    // Fade in videos
    var fade_in_videos = document.querySelectorAll('.video-bg video');
    for( i=0; i<fade_in_videos.length; i++ ) {
      if( fade_in_videos[i].currentTime > 0 ) {
        // It's already started playing
        fade_in_videos[i].className += ' is-playing';
      } else {
        // It hasn't started yet, wait for the playing event
        fade_in_videos[i].addEventListener("playing", function(){
          if(this.className.indexOf('is-playing') < 0) {
            this.className += ' is-playing';
          }
        });
      }
    }

    // Scrap videos on iOS because it won't autoplay,
    // it adds it's own play icon and opens the
    // media player when clicked
    var iOS = /iPad|iPhone|iPod/.test(navigator.platform);
    if( iOS ) {
      var background_videos = document.querySelectorAll('.video-bg video');
      for( i=0; i<background_videos.length; i++ ) {
        background_videos[i].parentNode.removeChild(background_videos[i]);
      }
    }

  }
}












