
function gatherKeyValuesFromJSON() {

    fetch("index.json")

        .then(function(response){
            return response.json();
        })

        .then(function(obj){

            for (let key in obj){

                // Every leg of the journey
                legsInfoArray = obj[key].legs;

                legsInfoArray.forEach(function(leg){

                    let distanceObj = leg.distance              // {text: "0.4 mi", value: 674}           
                    let durantionObj = leg.duration             // {text: "2 mins", value: 130}

                    let startAddress = leg.start_address        
                    let startLocationObj = leg.start_location   // {lat: 29.7531944, lng: -95.3388006}

                    let endAddress = leg.end_address
                    let endLocationObj = leg.end_location       // {lat: 29.7553068, lng: -95.33571289999999}
                    
                    // Create object with specific items
                    legInfoObj = {
                        key: key,
                        distance: distanceObj,
                        duration: durantionObj,
                        startAddress: startAddress,
                        startLocation: startLocationObj,
                        endAddress: endAddress,
                        endLocation: endLocationObj,
                    }

                    // console.log(legInfoObj);
                    // return legInfoObj

                });
            }

            // console.log(legInfoObj);
            return legInfoObj
        })

        .then (function(legInfoObj){
            initMap(legInfoObj);

        })




}

gatherKeyValuesFromJSON();



/* in progress

// Map section //

// First version with one point on the map
// Initialize and add the map
function initMap(addressesObj) {

    // console.log("3");
    // console.log(typeof(addressesObj))

    

    // The location of Uluru
    // var uluru = {lat: -25.344, lng: 131.036};
    // var uluru = {lat: 29.7531944, lng: -95.3388006};
    var locations = {addressesObj.startAddress, addressesObj.}

    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 2, center: uluru});

    // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
}

***/

/*
// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function(results) {
  for (var i = 0; i < results.features.length; i++) {
    var coords = results.features[i].geometry.coordinates;
    var latLng = new google.maps.LatLng(coords[1],coords[0]);
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }
}
*/

