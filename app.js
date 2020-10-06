let map;

// Function that initializes the Google Map, centers in on Tucson
// and appends the script.
function initMap() {
    // The location of tucson
    let tucson = {lat: 32.2217429, lng: -110.926479};

    // The map centered at tucson
    map = new google.maps.Map(document.getElementById('map-container'), {
        zoom: 3, 
        center: tucson,
        mapTypeId: 'terrain'
    });

    // Create a <script> tag and set the USGS URL as the source.
    let script = document.createElement('script');
    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
 
    document.getElementsByTagName('head')[0].appendChild(script);
}


// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
    // Loop through data and display on table
    for (var i = 0; i < results.features.length; ++i) {
        /**
          Here we do some tiding up.
            coordinates: the coordinates of the earthquake
                coordinates[0]: longitude
                coordinates[1]: latitude
            place: where the earthquake took place
            magnitude: the magnitude of the earthquake
         */
        let coordinates = results['features'][i]['geometry']['coordinates'];
        let latitude = coordinates[1];
        let longitude = coordinates[0];
        let place = results['features'][i]['properties']['place'];
        let magnitude = results['features'][i]['properties']['mag'];

        let latLng = new google.maps.LatLng(latitude,longitude);

        // Sets the current marker at the latitude and longitude
        new google.maps.Marker({
            position: latLng,
            map: map
        });

        let table = document.getElementById('table-data');
        let row = table.insertRow(-1);

        // Column 1 of the current row: current row number
        let cell_1 = row.insertCell(-1);
        cell_1.innerHTML = i + 1;

        // Column 2 of the current row: longitude
        let cell_2 = row.insertCell(-1);
        cell_2.innerHTML = longitude;
        
        // Column 3 of the current row: latitude
        let cell_3 = row.insertCell(-1);
        cell_3.innerHTML = latitude;

        // Column 4 of the current row: magnitude
        let cell_4 = row.insertCell(-1);
        cell_4.innerHTML = magnitude;

        // Column 5 of the current row: place
        let cell_5 = row.insertCell(-1);
        cell_5.innerHTML = place;
    }
}
