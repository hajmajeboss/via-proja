storage = window.localStorage;
var db = firebase.firestore();
var settings = {timestampsInSnapshots: true};
db.settings(settings);


$(document).ready(function () {

    if (!(storage.getItem("sportmates_email") && storage.getItem("sportmates_password"))) {
        document.location.href = "index.html";
    }
    else {
        db.collection("games").get().then(function (querySnapshot) {
            fillGamesTable(querySnapshot);
        })
    }
});

function fillGamesTable(querySnapshot) {

    querySnapshot.forEach(function (doc) {
        var data = doc.data();
        var row = document.createElement("tr");
        var placeCol = document.createElement("td");
        placeCol.innerHTML = data["location"];
        placeCol.className = "mdl-data-table__cell--non-numeric";

        var userCol = document.createElement("td");
        userCol.innerHTML = data["player1_name"];
        userCol.className = "mdl-data-table__cell--non-numeric";

        var sportCol = document.createElement("td");
        sportCol.innerHTML = data["sport"];
        sportCol.className = "mdl-data-table__cell--non-numeric";

        var dateCol = document.createElement("td");
        dateCol.innerHTML = data["date"];
        dateCol.className = "mdl-data-table__cell--non-numeric";

        var timeFromCol = document.createElement("td");
        timeFromCol.innerHTML = data["time_from"];
        timeFromCol.className = "mdl-data-table__cell--non-numeric";

        var timeToCol = document.createElement("td");
        timeToCol.innerHTML = data["time_to"];
        timeToCol.className = "mdl-data-table__cell--non-numeric";

        row.appendChild(placeCol);
        row.appendChild(userCol);
        row.appendChild(sportCol);
        row.appendChild(dateCol);
        row.appendChild(timeFromCol);
        row.appendChild(timeToCol);

        $('#gamesTable').get(0).appendChild(row);

    });





}
function logOut() {
    storage.removeItem("sportmates_password");
    window.location.href = "index.html";
}

function showAboutDialog() {
    $('#aboutAppDialog').get(0).showModal();
}

function hideAboutDialog() {
    $('#aboutAppDialog').get(0).close();
}