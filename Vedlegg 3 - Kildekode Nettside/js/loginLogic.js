

function login() {

    var email = document.getElementById("epost").value;
    var password = document.getElementById("password").value;

    if (email.length < 4) {
        alert('Please enter an email address.');
        return;
    }
    if (password.length == 0) {
        alert('Please enter a password.');
        return;
    }

    if(password != "testadmin"){
        alert('Wrong password or email');
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;

        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        }
        console.log(error);

    });


    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            console.log("LOGGED IN");
            window.location.href = "home.html";
        } else {
            // No user is signed in.
            console.log("not logged in")
        }
    });

}
