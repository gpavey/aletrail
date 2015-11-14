
   <script src="https://maps.googleapis.com/maps/api/js"></script>


$(document).ready(function(){
  var mapCenter = new google.maps.LatLng(37.7833, -122.4167);
  var map;
  var markers = [];
  var markerCluster;
  map_initialize();
  $('.add_movies').on('click', addMarkers)
  $('.add_movies').trigger('click')
  var oms = new OverlappingMarkerSpiderfier(map, {markersWontMove: true,keepSpiderfied: true});
  pickDate();
  $('.limit_date').on('click', buttonChoice)

  function map_initialize() {
    var mapOptions = {
      center: mapCenter,
      zoom: 13,
      overviewMapControl: true,
    };
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
  };  //end map_initialize

  function buttonChoice(e){
    var firstChoice = $('#first_year').val()
    debugger;
    if ( firstChoice === "ALL") {
      addMarkers(e)
    }
    else {
      clearOverlays(e);
    }
  }

  function clearOverlays(e) {

    for (var i = 0; i < markers.length; i++ ) {
      markers[i].setMap(null);
    }
    markers.length = 0;
    markerCluster.clearMarkers();
    changeMap(e);
  }

  function changeMap(e) {
    e.preventDefault();
    newDate = $('#first_year').val();
    newDate.serializeArray;

    var requestAjax = $.ajax({
      url: '/movies',
      type: 'GET',
      data: {release_year: newDate}
      });
      requestAjax.done(getMarkerData);
      requestAjax.fail(showErrors);
  }

  function addMarkers(e) {
    e.preventDefault();
    var requestAjax = $.ajax({
      url: '/locations',
      type: 'GET',
      });
      requestAjax.done(getMarkerData);
      requestAjax.fail(showErrors);
  }

  function getMarkerData(data){
    setMarkers(map,data)
  }

  function showErrors(jqXHR, textStatus, errorThrown){
  alert('what the fuck? check for errors!')
  }


  function setMarkers(map,data){

    var infowindow = new google.maps.InfoWindow()
    for (var i in data){
      var site = data[i];
      var myLatLng = new google.maps.LatLng(site.lat,site.lng);
      var marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: myLatLng,
        title: site.title,
        content: '<div id="content">'+
                '<div id="siteNotice">'+
                '</div>'+
                '<h1 id=firstHeading" class="firstHeading">'+site.title+'</h1>'+
                '<div id="bodyContent">'+
                '<p><b>Year: </b>'+site.release_year+'</p>'+
                '<p><b>Locaton: </b>'+site.location+'</p>'+
                '<p><b>Director: </b>'+site.director+'</p>'+
                '<p><b>Writer: </b>'+site.writer+'</p>'+
                '<p><b>Lead Actors: </b>'+site.actor1+', '+site.actor2+', '+site.actor3+'</p>'+
                '<p><b>Fun Fact: </b>'+site.fun_fact+'</p>'+
                '<p><a href="http://www.imdb.com/find?s=tt&q='+site.title+'">'+
                  'http://www.imdb.com/find?s=tt&q='+site.title+'</a>' +
                '</p>'+
                '</div>'+
                '</div>'
      });

      markers.push(marker);
      oms.addMarker(marker);

      google.maps.event.addListener(marker, 'click', function() {
        // infowindow.setPosition(0,0, true)
        infowindow.setContent(this.content);
        infowindow.open(map, this);
      });
    } // End i loop

    oms.addListener('spiderfy', function(markers) {infowindow.close();});
    var mcOptions = {gridSize: 30, maxZoom: 15};
   markerCluster = new MarkerClusterer(map, markers, mcOptions);
  } // End setMarkers

  function pickDate(){

    var requestAjax = $.ajax({
      url: '/dates',
      type: 'GET',
      });
      requestAjax.done(getDates);
      requestAjax.fail(showErrors);

  };

  function getDates(data){
    $('#first_year').append('<option value ="ALL">ALL</option>');
     for (var i in data){
      site = data[i]
        $('#first_year').append('<option value ="'+site.release_year+'">'+site.release_year+'</option>');
      };

  }
}); // End on load









<script type="text/javascript">
        var markers = [];
    function initialize() {

            var mapOptions = {
                zoom: 10,
                center: new google.maps.LatLng(40.714364, -74.005972),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById("googlemap"), mapOptions);


            var locations = [
                ['New York', 40.714364, -74.005972, 'http://www.google.com/intl/en_us/mapfiles/ms/micons/green-dot.png']
            ];


            var marker, i;
            var infowindow = new google.maps.InfoWindow();


            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
            });


            for (i = 0; i < locations.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                    map: map,
                    icon: locations[i][3]
                });

                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(locations[i][0]);
                        infowindow.open(map, marker);
                    }
                })(marker, i));

                markers.push(marker);
            }

        }
        google.maps.event.addDomListener(window, 'load', initialize);

        function myClick(id){
            google.maps.event.trigger(markers[id], 'click');
        }
</script>
<div id="googlemap" style="width: 100%; height: 500px;"></div>
<a href="#" onclick="myClick(0);">Open Info Window</a>








