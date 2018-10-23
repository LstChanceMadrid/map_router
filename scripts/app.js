
function initMap() {
  let directionsService = new google.maps.DirectionsService;
  let directionsDisplay = new google.maps.DirectionsRenderer;
  let map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: {lat: 29.75, lng: -95.33}
  });
  directionsDisplay.setMap(map);

  document.getElementById('submit').addEventListener('click', function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  });
}

let input_location = document.getElementById("inputLocation")
let input_class = document.getElementsByClassName("inputClass")
let div_locations = document.getElementById("divAddLocation")

let waypts
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


window.addEventListener("load", function() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    document.getElementById('map').style.marginTop = "100px";
    document.getElementById('map').style.width = "100%"
    document.getElementById('nav-container').style.display = "none"

      console.log("Screen width less than 768px");
  } else {
    document.getElementById('nav-button').style.display = "none"
      console.log("Screen more than 768px");
  }
});

document.getElementById("nav-button").addEventListener('click', function() {
  if (document.getElementById("nav-container").style.display === "none") {
  document.getElementById("nav-container").style.display = "flex"
  } else {
    document.getElementById("nav-container").style.display = "none"
  }
})

document.getElementById('login-button').addEventListener('click', function() {
  document.getElementById("nav-container").style.display = "none"
})