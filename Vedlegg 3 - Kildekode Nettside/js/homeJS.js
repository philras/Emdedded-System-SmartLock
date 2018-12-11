

function changeCustomer() {
    var customer = document.getElementById("customer").value;

    if (customer.length == "") {
        alert("You have to fill out a name");
    } else {
        firebase.database().ref('Password/').update({
            Customer: customer
        });

        alert("Customer name has been changed");
    }


}

function changePin() {
    var pin = document.getElementById("pin").value;

    if (pin.length < 4 || pin.length > 4) {
        alert("Pin has to be 4 numbers");
        pin.value = "";
    } else {
        firebase.database().ref('Password/').update({
            PassNow: parseInt(pin)

        });

        alert("Pin has been changed");
    }


}

function logOut() {

    firebase.auth().signOut().then(function () {
        console.log("Logged out");
        window.location.href = "index.html";
    });
}

(function () {
    var dataRef = firebase.database().ref("Data/");
    var dbPassRef = firebase.database().ref("Password/");



    dbPassRef.on("value", function (snapshot) {
        var pinNow = snapshot.child("PassNow").val();
        var customerNow = snapshot.child("Customer").val();

        var curCustomer = document.getElementById("curCustomer");
        var curPin = document.getElementById("curPin");

        curCustomer.innerText = "Current customer: " + customerNow;
        curPin.innerText = "Current pin: " + pinNow;


    });


    dataRef.on('child_added', function (childSnapshot) {
        var customer = childSnapshot.child('customer').val();
        var pin = childSnapshot.child('pin').val();
        var time = childSnapshot.child('ts').val();

        console.log(customer);
        console.log(time);

        var ul = document.getElementById("list-data");


        var li = document.createElement("li");
        li.style.cssText = "list-style-type: none; font-size: 20px; padding: 5px; background-color: #f2f2f2"
        li.innerHTML = customer + " låste opp, med pinkoden " + pin + " (" + time + ")";
        ul.appendChild(li);
    });


})();




