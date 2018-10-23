
// firebase

const database = firebase.database();

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

// -- button
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

        configureLocations(waypts)


    });
});


const configureLocations = (locationsRef) => {
    locationsRef.on('value', (snapshot => {

        waypnts = [];

        snapshot.forEach(childSnapshot => {
            stores.push(childSnapshot.val())
        });
        //--------------------------------whatever someone is doing to display stuff
    }));
}