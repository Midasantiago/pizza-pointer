$(function () {
  var nameEl = $('#name');
  var addressEl = $('#address');
  var ratingEl = $('#rating');

  var queryString = document.location.search;
  var urlParams = new URLSearchParams(queryString);
  var place_id = urlParams.get('place_id');

  var service = new google.maps.places.PlacesService(document.createElement('div'));

  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 18,
    center: { lat: 0, lng: 0 }
  });

  service.getDetails({
    placeId: place_id,
    fields: ['name', 'formatted_address', 'rating', 'geometry']
  }, function (place, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
      var location = place.geometry.location;

      map.setCenter(location);
      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: place.name
      });

      var infoWindow = new google.maps.InfoWindow({
        content: place.name
      });

      marker.addListener('click', function() {
        infoWindow.open(map, marker);
      }, { passive: true });

      nameEl.text(place.name);
      addressEl.text(place.formatted_address);
      ratingEl.text('Rating: ' + place.rating);
    } else {
      console.error('Error fetching place details:', status);
    }
  });

});

/*if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;

    const userLocation = new google.maps.LatLng(latitude, longitude);
    map.setCenter(userLocation);

    const marker = new google.maps.Marker({
      position: userLocation,
      map: map,
      title: 'Your Location'
    });

    const infowindow = new google.maps.InfoWindow({
      content: 'Your Location'
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }, error => {
    console.error('Error getting user location:', error.message);
  });
} else {
  console.error('Geolocation is not supported by this browser.');
}*/


/*initMap();*/