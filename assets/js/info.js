function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: { lat: 0, lng: 0 }  
    });

    if (navigator.geolocation) {
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
    }
  }

  initMap();