let origin
let destination
let map
let geocoder
let hashPlaces = {}

function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  
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
 
  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay)
    prepareMapLink(directionsDisplay.getDirections())
   
    
  });
}

let input_location = document.getElementById("inputLocation")
let input_class = document.getElementsByClassName("inputClass")
let div_locations = document.getElementById("divAddLocation")


div_locations.addEventListener('keyup',function(e){
  
   waypts = [];
  if (e.keyCode === 13){
    for(let i = 0; i < input_class.length; i++){
      let new_location = input_class[i].value
    waypts.push({location: new_location, stopover:true})
    }
    let newInputBox = document.createElement("input")
    newInputBox.type ="text"
    newInputBox.className = "inputClass"
   
    
    div_locations.appendChild(newInputBox)
    
  }
  
})

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
    let res = "https://www.google.com/maps/dir/?api=1&";
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
  
    let aElem = document.getElementById("mapLink");
    aElem.setAttribute("href", res);
}


