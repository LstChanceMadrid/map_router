
let navButton = document.getElementById('nav-button');
let navMenu = document.getElementById('nav-menu');


navButton.addEventListener('click', function() {
    if (navMenu.style.display === "none") {
        navMenu.style.display = "block";
    } else {
        navMenu.style.display = "none";
    }
})
