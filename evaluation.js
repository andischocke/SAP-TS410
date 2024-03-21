// HTML elements
const textHtml = document.getElementById("text");

// Session variables
const session = JSON.parse(localStorage.getItem("session"));

const threshold = session.maxQuestions * 0.6;
const percent = (session.score / session.maxQuestions * 100).toFixed(2);
const minutes = Math.floor(session.time / 60);
const seconds = session.time % 60 < 10 ? "0" + session.time % 60 : session.time % 60;

const information = [
    "Die Prüfung hatte insgeamt " + session.maxQuestions + " Fragen und ein Zeitlimit von " + session.maxTime / 60 + " Minuten. <br>",
    "Du hast " + session.progress + " Fragen beantwortet und dabei " + session.score + " Punkte erreicht. Das entspricht einer Erfolgsquote von " + percent + "%. <br>",
    "Um die Prüfung zu bestehen, musstest du mindestens " + threshold + " Punkte erreichen. <br>",
    "Für die Beantwortung aller Fragen hast du " + minutes + " Minuten und " + seconds + " Sekunden benötigt. <br>"
];

// Check if the user passed the exam
if (session.score >= threshold) {
    // Schreibe eine Erfolgsmeldung
    textHtml.innerHTML = "Du hast die Prüfung bestanden! <br><br>";
    for (let i = 0; i < information.length; i++) {
        textHtml.innerHTML += information[i];
    }
} else {
    // Schreibe eine Misserfolgsmeldung
    textHtml.innerHTML = "Du hast die Prüfung nicht bestanden!  <br><br>";
    for (let i = 0; i < information.length; i++) {
        textHtml.innerHTML += information[i];
    }
}

// Clear session variables
localStorage.removeItem("session");