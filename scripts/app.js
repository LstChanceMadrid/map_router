let mapContainer = document.getElementById('map');
let navContainer = document.getElementById("nav-container");
let navButton = document.getElementById("nav-button");
//loginButton = document.getElementById('login-button'); <in firebase>

window.addEventListener("load", function() {
	
	if (window.matchMedia("(max-width: 768px)").matches) {
		mapContainer.style.marginTop = "100px";
		mapContainer.style.width = "100%";
		navContainer.style.display = "none";
		console.log("Screen width less than 768px");
	} else {
		navButton.style.display = "none";
		console.log("Screen more than 768px");
	}
});
  
navButton.addEventListener('click', function() {
	if (navContainer.style.display === "none") {
		navContainer.style.display = "flex";
	} else {
		navContainer.style.display = "none";
	}
});
  
loginButton.addEventListener('click', function() {
	navContainer.style.display = "none";
});
  