
// firebase

let locationsRef;  // represents --> database.ref('users/' + userId + '/locations');

const database = firebase.database();


firebase.auth().onAuthStateChanged(function(users) {
    if (users) {

    } else {
      // No user is signed in.
    }
  });




// ---------------- register

let registerEmailTextBox = document.getElementById('register-email-text-box');
let registerPasswordTextBox = document.getElementById('register-password-text-box');
let registerButton = document.getElementById('register-button');

// --- email
registerEmailTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        registerPasswordTextBox.focus();
    }
});

// --- password
registerPasswordTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        registerButton.click();
    }
});

// --- button

registerButton.addEventListener('click', function() {

    let email = registerEmailTextBox.value;
    let password = registerPasswordTextBox.value;

    firebase.auth().createUserWithEmailAndPassword(email, password)

    .then(function(user) {
        registerEmailTextBox.value = "";
        registerPasswordTextBox.value = "";
        alert("YOU'RE REGISTERED HOOORAAYYYYY");
        console.log('success');
    })

    .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
        registerPasswordTextBox.value = "";
        console.log(error);
    });
});

// -------------- log in

let loginEmailTextBox = document.getElementById("login-email-text-box");
let loginPasswordTextBox = document.getElementById("login-password-text-box");
let loginButton = document.getElementById('login-button');

// --- email

loginEmailTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        loginPasswordTextBox.focus();
    }
});

// --- password

loginPasswordTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        loginButton.click();
    }
});

// -- button
loginButton.addEventListener('click', function() {

    let email = loginEmailTextBox.value;
    let password = loginPasswordTextBox.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    
    .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage);
        console.log(error);
    })

    .then(function(user) {
        
        loginEmailTextBox.value = "";
        loginPasswordTextBox.value = "";
        //window.location.href = "../index.html";  // commented out for now b/c resets user info 
        alert("you logged in.. congratulations to you. we're so proud you remembered your credentials and.. stuff.");
        console.log('login success');
        userId = firebase.auth().currentUser.uid;
        locationsRef = database.ref('users/' + userId + '/locations/');localStorage.setItem("locationsRef", locationsRef);



        // Once user has logged in we now have locationsRef nodes for Firebase
        configureObservers()

    })

    .then(function(user) {
        window.location.href = "../index.html"
    })

});

// Add array of addresses to Firebase
function addToDatabase(addressArray) {
    items = localStorage.getItem("locationsRef");

    let deally = '{ "uid" : "' + decodeURI(items.replace(/"/g, "").replace(/https:/g, "").replace(/\/\/map-router-e0727.firebaseio.com\/users\//g, "").replace(/\/locations/g, "") + '"}')

    let parsedDeally = JSON.parse(deally)

    let theUser = parsedDeally.uid

    locationsRef = firebase.database().ref('users/' + theUser + '/locations/')

    let refAddress = locationsRef.child("Addresses");
    refAddress.push(addressArray);
    // refAddress.child("Addy").set(addressArray);
}


// Configure changes
function configureObservers() {
    
    let refAddress = locationsRef.child("Addresses");

    refAddress.on('value',function(snapshot){
        
        addresses = []
  
        snapshot.forEach(function(childSnapshot){
            addresses.push(childSnapshot.val())
        })

        // console.log(addresses)
        displayAddresses(addresses)
    })
  }


// Display all addresses and items
function displayAddresses(addresses) {
  
    let liItem = ""
    let liItem2 = ""
    let liCombined = ""

    for (let key in addresses) {

        liItem2 = ""                        
        
        let addressesArray = addresses[key]     // array of every user search [ [],[] ]
            // console.log(key)                 // each key (ex: 0, 1, 2) represent a saved search in firebase

            let searchNumber = parseInt(key) + 1
            liItem2 = `<ul><b>SEARCH ${searchNumber}</b>`  // key represents a search saved

            liItem = "";        // initialize

        // Each route represent one point to the next with start and end addesses
        for (let route in addressesArray) {
            // console.log(addressesArray[route])                   // represent a leg taken to complete the route
            // console.log(addressesArray[route].start_address)
            // console.log(route)                                   // each route (ex: 0, 1, 2) represent each leg 
            
            let aLegOfRoute = addressesArray[route]

            let leg = route
            let start_address = aLegOfRoute.start_address
            let end_address = aLegOfRoute.end_address

            liItem += `<li>leg: ${leg} ~ <br>start:${start_address} <br>end: ${end_address}</li>`
        }
        
        liCombined += liItem2 + liItem + '</ul>'
    }

    // console.log(liCombined)
    ulAddressList.innerHTML = liCombined;
}


JSON.parse('{ "uid : \"' + decodeURI("https://map-router-e0727.firebaseio.com/users/quswYqbIuPWPGUxrwR4geKunYe83/locations".replace(/"/g, "").replace(/https:/g, "").replace(/\/\/map-router-e0727.firebaseio.com\/users\//g, "").replace(/\/locations/g, "") + '"}'))
// let deally = '{ "uid : " ' + decodeURI("https://map-router-e0727.firebaseio.com/users/quswYqbIuPWPGUxrwR4geKunYe83/locations".replace(/"/g, "").replace(/https:/g, "").replace(/\/\/map-router-e0727.firebaseio.com\/users\//g, "").replace(/\/locations/g, "") + '"}')