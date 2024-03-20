// HTML elements
const progressValueHtml = document.getElementById("progress-value");
const scoreValueHtml = document.getElementById("score-value");
const timeValueHtml = document.getElementById("time-value");
const checkHtml = document.getElementById("check");

const quizHTML = document.getElementsByTagName("footer")[0];

// Quiz constants
const MAX_QESTIONS = 80;
const MAX_TIME = 180 * 60;

// Session variables
let question = 0;
let score = 0;
let time = MAX_TIME;

let allQuestions = [];
let currentQuestion = {};

// Load questions from JSON file
requestJsonFile("questions");
// Automatically update time every second
setInterval(updateTime, 1000);

function requestJsonFile(name) {
    const jsonFile = name + ".json";
    const httprequest = new XMLHttpRequest();

    httprequest.open("GET", jsonFile, true);
    httprequest.onload = function () {
        allQuestions = JSON.parse(httprequest.responseText);
    }
    httprequest.send();
}

function updateTime() {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    // Add leading zero to seconds if less than 10
    seconds = seconds < 10 ? '0' + seconds : seconds;
    // Display time
    timeValueHtml.innerHTML = minutes + ':' + seconds;

    if (time > 0) {
        // Subtract time
        time--;
    }
}