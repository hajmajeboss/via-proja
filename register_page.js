var db = firebase.firestore();
var settings = {timestampsInSnapshots: true};
db.settings(settings);

var storage = localStorage;

$(document).ready(function () {

    if (storage.getItem("sportmates_email") && storage.getItem("sportmates_password")) {
        loadMainPage();
    }

    $("#signUpButton").click(function () {
        var name = $("#nameInput").val();
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();
        var ageCheck = $("#ageCheck").is(":checked");
        var gdprCheck = $("#gdprCheck").is(":checked");

        if (!ageCheck) {
            showSnackbar("Pro registraci musíte být starší 15ti let.");
        }

        else if (!gdprCheck) {
            showSnackbar("Pro registraci musíte souhlasit se zpracováním os. údajů");
        }

        else if (!name) {
            showSnackbar("Vyplňte prosím své jméno.");
        }

        else if (!email) {
            showSnackbar("Vyplňte prosím e-mail.");
        }

        else if (!password || password.length < 6) {
            showSnackbar("Heslo musí být alespoň 6 znaků dlouhé.");
        }

        else {
            db.collection("users").add({email: email, name: name}).then(function (userId) {
                firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
                    storage.setItem("sportmates_email", email);
                    storage.setItem("sportmates_password", password);
                    window.location.href = "index.html";
                }).catch(function (err) {
                    showSnackbar(err.message);
                    db.collection("users").doc(userId).delete();
                });
            }).error(function (err) {
                showSnackbar(err.message);
            });
        }
    });


    $("#backButton").click(function () {
       back();
    });

});

var showSnackbar = function (text) {
    window['counter'] = 0;
    var snackbarContainer = document.querySelector('#errorToast');
        var data = {message: text};
        snackbarContainer.MaterialSnackbar.showSnackbar(data);

};

var back = function() {
    history.back();
}

var loadRegisterPage = function() {
    console.log("got here");
    window.location.href = "registerpage.html";
};

var loadMainPage = function () {
    window.location.href = "mainpage.html";
};


