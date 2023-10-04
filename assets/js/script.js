$(function () {
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

            searchinputEl.val('');
        } else {
            alert('Please enter a location');
        }
    };

    var getResultsLatLon = function (lat, lon) {
        var yelpAPI = 'https://api.yelp.com/v3/businesses/search?term=pizzeria&latitude=' + lat + 'longitude=' + lon

        fetch(yelpAPI, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer yetYQzkQaZrxn8gJpYkO_xJmCiZ0jkGhFFyCcWygfqpooZcaFBdUd8DmqPQP8Mhea3pUVBtDvg1UBP0jd2h7FJaOOf5eM908PrY-jqjWOExIswtdJ8uVzwUaQJkcZXYx'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);

                    })
                }
            })
    }

    var getResultsCity = function (location) {
        var yelpAPI = 'https://api.yelp.com/v3/businesses/search?term=pizzeria&location=' + location
        fetch(yelpAPI, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer yetYQzkQaZrxn8gJpYkO_xJmCiZ0jkGhFFyCcWygfqpooZcaFBdUd8DmqPQP8Mhea3pUVBtDvg1UBP0jd2h7FJaOOf5eM908PrY-jqjWOExIswtdJ8uVzwUaQJkcZXYx'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                        
                    })
                }
            })
    }

    searchformEl.on('submit', submitHandler);
})