
  
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
  