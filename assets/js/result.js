$(function () {
    var searchEl = $('#search');
    var searchformEl = $('#search-form');
    var resultsEl = $('#results');
    var historyEl = $('#history');

    var historyIndex = 1

    var updateHistory = function () {
        historyEl.empty();
        for (var i = historyIndex - 1; i > 0; i--) {
            var historyItemEl = document.createElement('h2');
            historyItemEl.classList.add('history-item', 'text-xl', 'p-6', 'mb-2', 'bg-yellow-600')
            historyItemEl.textContent = localStorage.getItem('city: ' + i);
            historyItemEl.addEventListener('click', function () {
                var cityName = this.textContent;
                searchEl.val(cityName);
                submitHandler(event);
            });
            historyEl.append(historyItemEl);
        }
    }

    var queryString = document.location.search;
    console.log(queryString);

    var urlParams = new URLSearchParams(queryString);
    var cityName = urlParams.get('city');
    localStorage.setItem('city: ' + historyIndex, cityName);
    historyIndex++;
    updateHistory();

    console.log(cityName);
    var latInput = urlParams.get('lat');
    console.log(latInput);
    var lonInput = urlParams.get('lon');
    console.log(lonInput);

    var lati;
    var lon;

    var submitHandler = function (event) {
        event.preventDefault();

        var search = searchEl.val().trim();

        if (search) {
            var keyExists = false;
            for (var i = 1; i < historyIndex; i++) {
                var storedSearch = localStorage.getItem('city: ' + i);
                if (storedSearch === search) {
                    keyExists = true;
                    break;
                }
            }
            if (!keyExists) {
                localStorage.setItem('city: ' + historyIndex, search);
                historyIndex++;
                updateHistory();
            }

            newSearch(search);

            searchEl.val('');
        } else {
            alert('Please enter a location');
        }
    };

    var service = new google.maps.places.PlacesService(document.createElement('div'));

    var getResults = function (lati, lon) {

        var request = {
            location: { lat: parseFloat(lati), lng: parseFloat(lon) },
            keyword: 'pizza',
            rankBy: google.maps.places.RankBy.DISTANCE,
            type: ['restaurant']
        };

        service.nearbySearch(request, function (results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                displayResults(results);
            } else {
                console.error('Places service request failed with status: ' + status);
            }
        });
    };

    var autocomplete;
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('search'), {
        types: ['geocode']
    });

    if (cityName) {
        var keyExists = false;
        for (var i = 1; i < historyIndex; i++) {
            var storedSearch = localStorage.getItem('city: ' + i);
            if (storedSearch === cityName) {
                keyExists = true;
                break;
            }
        }
        if (!keyExists) {
            localStorage.setItem('city: ' + historyIndex, cityName);
            historyIndex++;
            updateHistory();
        }
        searchEl.val(cityName);
    }

    var newSearch = function (search) {
        var lonLatApi = 'https://api.openweathermap.org/geo/1.0/direct?q=' + search + '&appid=6c6770ea3b9bbb08d782e667037f5757';

        fetch(lonLatApi)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                        lati = data[0].lat;
                        console.log(lati);
                        lon = data[0].lon;
                        console.log(lon);
                        console.log(data[0].lat, data[0].lon);
                        getResults(lati, lon);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Location');
            });
    };

    if (cityName) {
        var lonLatApi = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=6c6770ea3b9bbb08d782e667037f5757';

        fetch(lonLatApi)
            .then(function (response) {
                if (response.ok) {
                    console.log(response);
                    response.json().then(function (data) {
                        console.log(data);
                        lati = data[0].lat;
                        console.log(lati);
                        lon = data[0].lon;
                        console.log(lon);
                        console.log(data[0].lat, data[0].lon);
                        getResults(lati, lon);
                    });
                } else {
                    alert('Error: ' + response.statusText);
                }
            })
            .catch(function (error) {
                alert('Unable to connect to Location');
            });
    } else if (latInput && lonInput) {
        lati = latInput;
        lon = lonInput;
        getResults(lati, lon);
    };

    var displayResults = function (results) {
        console.log('Results: ' + JSON.stringify(results, null, 2));

        resultsEl.empty();

        for (var i = 0; i < results.length; i++) {
            (function (index) {
                var placeContainerEl = document.createElement('div');
                placeContainerEl.classList.add('place-container', 'p-6', 'mb-2', 'bg-yellow-600');

                var anchorEl = document.createElement('a');
                anchorEl.setAttribute('href', './info.html?place_id=' + results[index].place_id);
                anchorEl.append(placeContainerEl);

                var nameEl = document.createElement('h2');
                nameEl.classList.add('text-xl', 'font-bold');
                nameEl.textContent = results[index].name;

                var request = {
                    placeId: results[index].place_id,
                    fields: ['formatted_address']
                };

                service.getDetails(request, function (results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        console.log(JSON.stringify(results, null, 2));
                        var addressEl = document.createElement('p');
                        addressEl.textContent = results.formatted_address;
                        placeContainerEl.append(nameEl);
                        placeContainerEl.append(addressEl);
                        resultsEl.append(anchorEl);
                    } else {
                        console.error('Places service request failed with status: ' + status);
                    }
                });
            })(i);
        }
    };

    searchformEl.on('submit', submitHandler);
});
