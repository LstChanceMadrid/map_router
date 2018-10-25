let origin
let destination
let map
let geocoder
let hashPlaces = {}
let waypts
let directionsService
let directionsDisplay
let res
let locInput
let input_class
let storeCurrentRoutes;

// Initialized button as disabled until button submit search route clicked and validated
let btnSaveSearch = document.getElementById("btnSaveSearch");
btnSaveSearch.disabled = true;

    function initMap() {
      directionsService = new google.maps.DirectionsService;
      directionsDisplay = new google.maps.DirectionsRenderer;
      
      navigator.geolocation.getCurrentPosition(function(response) {
        let mapOptions = {
          center: new google.maps.LatLng(response.coords.latitude, response.coords.longitude),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
      
      map = new google.maps.Map(document.getElementById('map'), mapOptions) 
    
      directionsDisplay.setMap(map);
    
    })
    geocoder = new google.maps.Geocoder();
    
    }
    document.getElementById('submit').addEventListener('click',  function() {
      saveToArray()
      calculateAndDisplayRoute(directionsService, directionsDisplay)
    })
    
    input_class = document.getElementsByClassName("inputClass")
    let input_location = document.getElementById("inputLocation")
      let div_locations = document.getElementById("divAddLocation")
      let addLocation = document.getElementById("addLocation")

    div_locations.addEventListener('keyup',function(e){
      
      // waypts = [];
      if (e.keyCode === 13){
      //   for(let i = 0; i < input_class.length; i++){
      //     let new_location = input_class[i].value
      //   waypts.push({location: new_location, stopover:true})
      //   }
        let newInputBox = document.createElement("input")
        newInputBox.type ="text"
        newInputBox.className = "inputClass"
        newInputBox.placeholder="Press ENTER to add"
        newInputBox.onfocusout= saveToArray()
      
        
        div_locations.appendChild(newInputBox)
        newInputBox.focus()
        locInput = document.getElementsByClassName("inputClass")
      initialize()
      
      }
    })
    //onfocusout autosave to waypts array 
      function saveToArray(){
        input_class = document.getElementsByClassName("inputClass")
        waypts = [];
          for(let i = 0; i < input_class.length; i++){
            let new_location = input_class[i].value
            if(new_location != ""){
            waypts.push({location: new_location, stopover:true})
            }
      }
      console.log(waypts)
    }








// User option to save route
btnSaveSearch.addEventListener('click', function() {
	addAddresses(storeCurrentRoutes);
	btnSaveSearch.disabled = true;
});


// Capture data if status from calculateAndDisplayRoute() good
function addAddresses(routes){
  
	// console.log(routes)

    let addressArray = [];

    // For each route, display summary information.
    for (let i = 0; i < routes.legs.length; i++) {
        let start_address = routes.legs[i].start_address;
        let end_address = routes.legs[i].end_address;
        let distance = routes.legs[i].distance.text;

        addressArray.push({start_address: start_address, end_address: end_address, distance: distance});
       
    }

	// console.log(addressArray);

	// Add to Firebase
	addToDatabase(addressArray);
}











    // autocomplete for all extra locations input
    function initialize(){ 
      locInput = document.getElementsByClassName("inputClass")
      for(let i = 0; i<locInput.length;i++){
        new google.maps.places.Autocomplete(locInput[i])   
    }
  }
    google.maps.event.addDomListener(window, 'load', initialize);
  // autocomplete for start and end input boxes
    function initializeNew(){ 
      locInputNew = document.getElementsByClassName("inputClassNew")
        for(let i = 0; i<locInputNew.length;i++){
          new google.maps.places.Autocomplete(locInputNew[i])
    }
      
  }
    google.maps.event.addDomListener(window, 'load', initializeNew);
    
  // calcuates routes 
    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
      origin = document.getElementById('start').value
      destination= document.getElementById('end').value,
      directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
          let route = response.routes[0];
          // creates link to send 
          console.log(response)
          prepareMapLink(response)
          let summaryPanel = document.getElementById('directions-panel');
          summaryPanel.innerHTML = '';
          // For each route, display summary information.
          for (let i = 0; i < route.legs.length; i++) {
            let routeSegment = i + 1;
            summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
                '</b><br>';
            summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
            summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
            summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
          }
      // If status is good enable option to save to database
			storeCurrentRoutes = route // store current route
			document.getElementById("btnSaveSearch").disabled = false;
			// addAddresses(route);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    }

    function geocodePlaceId (placeId) {
      return new Promise(function(resolve, reject) {
          geocoder.geocode({'placeId': placeId}, function(results, status) {
            if (status === 'OK') {
                let r = Object.create(null);
                r[placeId] = results[0].formatted_address
                resolve(r);
            } else {
                reject('Geocode was not successful for the following reason: ' + status);
            }
          });
      });
    }
  // main function to create routing url , saved into res variable 
    function prepareMapLink(result) {
      let arrWp = [];
      result.geocoded_waypoints.forEach(function (wp) {
          arrWp.push(wp.place_id);
      });

      let oplaceId = arrWp.shift();
      let dplaceId = arrWp.pop();  
      
      let arrProm = [];
      arrWp.forEach( function (pId) {
        if (!hashPlaces[pId]) {
          arrProm.push(geocodePlaceId(pId));
        }
      });  
      
      if (arrProm.length) {
          Promise.all(arrProm).then( function (values) {
              values.forEach(function (val) {
                for (key in val) {
                    hashPlaces[key] = val[key];
                }
              });
              constructMapsUrl(oplaceId, dplaceId, arrWp);
          }).catch(reason => { 
              console.log(reason)
          });
      } else {
          constructMapsUrl(oplaceId, dplaceId, arrWp);
      }
      
    }

    function constructMapsUrl(originId, destinationId, waypoints) {
        res = "https://www.google.com/maps/dir/?api=1&";
        res += "origin="+encodeURIComponent(origin)+"&origin_place_id="+originId;
        res += "&destination="+encodeURIComponent(destination)+"&destination_place_id="+destinationId;
      
        //debugger;
        let wpAddr = [];
        waypoints.forEach( function (wp) {
            wpAddr.push(hashPlaces[wp]);
        });
      
        let waypointsStr = encodeURIComponent(wpAddr.join('|'));
        let waypointsIds = waypoints.join('|');
      
        res += "&waypoints="+waypointsStr+"&waypoint_place_ids="+waypointsIds+"&travelmode=driving";
      
        console.log(res)
    }








