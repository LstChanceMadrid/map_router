
// function gatherKeyValuesFromJSON() {

//     fetch("index.json")

//         .then(function(response){
//             return response.json();
//         })

//         .then(function(obj){

//             for (let key in obj){

//                 // Every leg of the journey
//                 legsInfoArray = obj[key].legs;

//                 legsInfoArray.forEach(function(leg){

//                     let distanceObj = leg.distance              // {text: "0.4 mi", value: 674}           
//                     let durantionObj = leg.duration             // {text: "2 mins", value: 130}

//                     let startAddress = leg.start_address        
//                     let startLocationObj = leg.start_location   // {lat: 29.7531944, lng: -95.3388006}

//                     let endAddress = leg.end_address
//                     let endLocationObj = leg.end_location       // {lat: 29.7553068, lng: -95.33571289999999}
                    
//                     // Create object with specific items
//                     legInfoObj = {
//                         key: key,
//                         distance: distanceObj,
//                         duration: durantionObj,
//                         startAddress: startAddress,
//                         startLocation: startLocationObj,
//                         endAddress: endAddress,
//                         endLocation: endLocationObj,
//                     }

//                     // console.log(legInfoObj);
//                     return legInfoObj

//                 });
//             }
//         })
// }

// gatherKeyValuesFromJSON();



const database = firebase.database();

// ------ register

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

// ------- log in

let loginEmailTextBox = document.getElementById("login-email-text-box");
let loginPasswordTextBox = document.getElementById("login-password-text-box");
let loginButton = document.getElementById('login-button');

registerEmailTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        registerPasswordTextBox.focus();
    }
});

registerPasswordTextBox.addEventListener('keyup', function(event) {
    let key = event.keyCode;
    if (key === 13) {
        registerButton.click();
    }
});

loginButton.addEventListener('click', function() {

    let email = loginEmailTextBox.value;
    let password = loginPasswordTextBox.value;

    firebase.auth().signInWithEmailAndPassword(email, password)
    
    .catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        alert(errorMessage)
        console.log(error);
    })

    .then(function(user) {
        loginEmailTextBox.value = "";
        loginPasswordTextBox.value = "";
        console.log('login success');
        userId = firebase.auth().currentUser.uid;
        locationsRef = database.ref('users/' + userId + '/locations');
        let destinations = []

        configureLocations(locationsRef)
        return locationsRef

    });
});

const configureLocations = (locationsRef) => {
    locationsRef.on('value', (snapshot => {
        stores = [];
        snapshot.forEach(childSnapshot => {
            stores.push(childSnapshot.val())
        });
        //--------------------------------whatever someone is doing to display shit
    }));
}