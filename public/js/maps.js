function initialize_gmaps() {

  // initialize new google maps LatLng object
  var myLatlng = new google.maps.LatLng(40.705189, -74.009209);

  // set the map options hash
  var mapOptions = {
    center: myLatlng,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  };

  // get the maps div's HTML obj
  var map_canvas_obj = document.getElementById('map-canvas');

  // initialize a new Google Map with the options
  var map = new google.maps.Map(map_canvas_obj, mapOptions);

  // add the marker to the map
  var marker = new google.maps.Marker({
    position: myLatlng,
    title: 'Hello World!'
  });

  // draw some locations on the map
  function drawLocation(location, opts) {
    if (typeof opts !== 'object') {
      opts = {};
    }
    opts.position = new google.maps.LatLng(location[0], location[1]);
    opts.map = map;
    var marker = new google.maps.Marker(opts);
  }

  var hotelLocation = [40.705137, -74.007624];
  var restaurantLocations = [
        [40.705137, -74.013940],
        [40.708475, -74.010846]
      ];
  var activityLocations = [
        [40.716291, -73.995315],
        [40.707119, -74.003602]
      ];

  drawLocation(hotelLocation, {
    icon: '/images/lodging_0star.png'
  });
  restaurantLocations.forEach(function(loc) {
    drawLocation(loc, {
      icon: '/images/restaurant.png'
    });
  });
  activityLocations.forEach(function(loc) {
    drawLocation(loc, {
      icon: '/images/star-3.png'
    });
  });
}

$(document).ready(function() {
  initialize_gmaps();
});

var styleArr = [{
  featureType: 'landscape',
  stylers: [{ saturation: -100 }, { lightness: 60 }]
}, {
  featureType: 'road.local',
  stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
}, {
  featureType: 'transit',
  stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
}, {
  featureType: 'administrative.province',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'water',
  stylers: [{ visibility: 'on' }, { lightness: 30 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
}];
