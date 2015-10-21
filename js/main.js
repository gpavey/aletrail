$(function() {
  initializeScroll();
  initializeMap();
});

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

function initializeMap(){
  var map;
    function initialize() {
      map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: new google.maps.LatLng(46.8625, -114.011667),
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      var iconBase = '../images/';
      var icons = {
        beer: {
          name: 'Beer',
          icon: iconBase + 'beericon.png'
        },
        spirits: {
          name: 'Spirits',
          icon: iconBase + 'whiskeyicon.png'
        }
      };

      function addMarker(feature) {
        var marker = new google.maps.Marker({
          position: feature.position,
          icon: icons[feature.type].icon,
          map: map
        });
      }

      var features = [
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

      for (var i = 0, feature; feature = features[i]; i++) {
        addMarker(feature);
      }

    }
    initialize();
}


//   function initializeMap() {
//     var mapCanvas = document.getElementById('map');
//     var mapOptions = {
//       center: new google.maps.LatLng(-33.9, 151.2),
//       zoom: 10,
//       mapTypeId: google.maps.MapTypeId.ROADMAP
//     }

//     var map = new google.maps.Map(mapCanvas, mapOptions)
//   setMarkers(map);
//   }

//   // Data for the markers consisting of a name, a LatLng and a zIndex for the
//   // order in which these markers should display on top of each other.

//   function addMarker(feature) {
//     var marker = new google.maps.Marker({
//       position: feature.position,
//       icon: icons[feature.type].icon,
//       map: map
//     });
//   }
//   var features = [
//     ['Bondi Beach', -33.890542, 151.274856, 4,'beer'],
//     ['Coogee Beach', -33.923036, 151.259052, 5,spirit],
//     ['Cronulla Beach', -34.028249, 151.157507, 3,'spirit'],
//     ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
//     ['Maroubra Beach', -33.950198, 151.259302, 1]
//   ];

//   function setMarkers(map) {
//     var iconBase = '../images/';
//       var icons = {
//         beer: {
//           icon: iconBase + 'beericon.png'
//         },
//         spirits: {
//           icon: iconBase + 'spirits.png'
//         }
//       }

//     // Adds markers to the map.
// for (var i = 0, feature; feature = features[i]; i++) {
//       addMarker(feature);
// }
//       // for (var i = 0; i < beaches.length; i++) {
//       //   var beach = beaches[i];
//       //   var marker = new google.maps.Marker({
//       //     position: {lat: beach[1], lng: beach[2]},
//       //     icon: icons[feature.type].icon,
//       //     title: beach[0],
//       //     zIndex: beach[3],
//       //     map: map
//       //   });
//       // }

//   }

// }



