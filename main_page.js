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
            fillGraph(querySnapshot);
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
        sportCol.innerHTML = getCzechSportName(data);
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

function fillGraph(querySnapshot) {
    var badmintonCnt = 0;
    var squashCnt = 0;
    var gymCnt = 0;
    var tennisCnt = 0;
    var hikingCnt =0;
    var cyclingCnt = 0;

    var sportsArr = ["Badminton", "Squash", "Posilování", "Tenis", "Horolezectví", "Cyklistika"];

    querySnapshot.forEach(function (doc) {
        var data = doc.data();
        if (data["sport"] == "badminton") badmintonCnt++;
        if (data["sport"] == "squash") squashCnt++;
        if (data["sport"] == "gym") gymCnt++;
        if (data["sport"] == "tennis") tennisCnt++;
        if (data["sport"] == "hiking") hikingCnt++;
        if (data["sport"] == "cycling") cyclingCnt++;
    });

    var countsArr = [badmintonCnt, squashCnt, gymCnt, tennisCnt, hikingCnt, cyclingCnt];

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: sportsArr,
            datasets: [{
                label: 'Počet registrovaných her',
                data: countsArr,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}

function  getCzechSportName(data) {
    if (data["sport"] == "badminton") return "Badminton";
    if (data["sport"] == "squash") return "Squash";
    if (data["sport"] == "gym") return "Posilování";
    if (data["sport"] == "tennis") return "Tenis";
    if (data["sport"] == "hiking") return "Horolezectví";
    if (data["sport"] == "cycling") return "Cyklistika";
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