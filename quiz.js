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
let progress = 0;
let score = 0;
let time = MAX_TIME;

let allQuestions = [];
let currentQuestion = {};

// Automatically update time every second
setInterval(updateTime, 1000);
// Start quiz
main();

async function fetchJsonFile() {
    const jsonFile = "questions.json";

    try {
        const response = await fetch(jsonFile);
        const data = await response.text();
        allQuestions = JSON.parse(data);
    } catch (error) {
        console.error("Error reading Json file:", error);
    }
}

async function main() {
    // Load questions from JSON file
    await fetchJsonFile();
    // Get next question
    await nextQuestion();
}

async function nextQuestion() {
    progress++;
    progressValueHtml.innerHTML = progress + "/" + MAX_QESTIONS;

    // Get random question from allQuestions and remove it from the array
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    currentQuestion = allQuestions[randomIndex];
    allQuestions.splice(randomIndex, 1);

    // Clear current question and choices
    quizHTML.innerHTML = "";

    // Enrich question text with the number of correct choices
    const correctChoices = currentQuestion.choices.filter(choice => choice.isCorrect).length;
    currentQuestion.text += " (" + correctChoices + ")";
    // Create question element
    const questionElement = document.createElement("h3");
    questionElement.innerHTML = currentQuestion.text;
    quizHTML.appendChild(questionElement);

    // Shuffle choices
    shuffleArray(currentQuestion.choices);
    // Create choices elements
    for (let i = 0; i < currentQuestion.choices.length; i++) {
        const choiceElement = document.createElement("div");
        choiceElement.className = "choice glass";

        const inputElement = document.createElement("input");
        inputElement.type = "checkbox";
        inputElement.id = i;

        const labelElement = document.createElement("label");
        labelElement.htmlFor = i;
        labelElement.innerHTML = currentQuestion.choices[i].text;

        quizHTML.appendChild(choiceElement);
        choiceElement.appendChild(inputElement);
        choiceElement.appendChild(labelElement);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
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