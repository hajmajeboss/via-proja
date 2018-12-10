var db = firebase.firestore();
var settings = {timestampsInSnapshots: true};
db.settings(settings);

var storage = localStorage;

$(document).ready(function () {

    if (storage.getItem("sportmates_email") && storage.getItem("sportmates_password")) {
        loadMainPage();
    }

    $("#loginButton").click(function () {
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (result) {
            storage.sportmates_email = email;
            storage.sportmates_password = password;
            loadMainPage();

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage);
            showSnackbar(errorMessage);
        });
    })

    $("#registerButton").click(function () {
        console.log("clicke");
        window.location.href = "registerpage.html";
    });

});

var showSnackbar = function (text) {
    window['counter'] = 0;
    var snackbarContainer = document.querySelector('#errorToast');
        var data = {message: text};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);

};

var loadRegisterPage = function() {
    console.log("got here");
    window.location.href = "registerpage.html";
};

var loadMainPage = function () {
    window.location.href = "mainpage.html";
};


