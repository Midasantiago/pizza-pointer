$(function () {;
    var searchformEl = $('#search-form');
    var searchInputEl = $('#search');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var lat = position.coords.latitude
            var lon = position.coords.longitude
            getResultsLatLon(lat, lon);
        })
    }

    var submitHandler = function (event) {
        event.preventDefault();

        var search = searchInputEl.val().trim();

        if (search) {
            getResultsCity(search);

            searchInputEl.val('');
        } else {
            alert('Please enter a location');
        }
    };

    var getResultsLatLon = function (lat, lon) {
        window.location.href = './results.html?lat=' + lat + 'lon=' + lon
    }

    var getResultsCity = function (city) {
        window.location.href = './results.html?city=' + city
    }

    searchformEl.on('submit', submitHandler);
})