/* 
Still pending:

JS
1. Moving on to next question
2. Getting score to add up
3. Save score and user input to local storage
4. Show saved score in high score page
5. Clear high scores
6. Timer to decrement by 10 seconds for each wrong question

CSS
1. Start button centered on beginning page
2. Stop timer decrement from affecting rest of page

*/

var startButton = document.getElementById('btn-begin');
var homeBoxElement = document.getElementById('home-box');
var quizBoxElement = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var questionElement = document.getElementById('question');
var choicesElement = document.getElementById('choice-buttons');
var resultElement = document.getElementById('result');
var userScoreElement = document.getElementById('user-score');
var timeCountElement = document.getElementById('timecount');
var timerElement = document.getElementById('timer');
var currentScore = 0;
var viewHighScores = document.getElementById('high-scores');
var viewhighSoresElement = document.getElementById('high-scoresBox');

viewHighScores.addEventListener("click", function(){
    startButton.classList.add('hide');
    homeBoxElement.classList.add('hide');
    quizBoxElement.classList.add('hide');
    timeCountElement.classList.add('hide');
    viewHighScores.classList.add('hide');

    viewhighSoresElement.classList.remove('hide');
});

startButton.addEventListener('click', startQuiz);

//array with questions, choices and answers
var questions = [
    {
        question: "Commonly used data types DO NOT include: ",
        choices: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed within ___________",
        choices: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store: ",
        choices: ["numbers and strings", "other Arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
        choices: ["JavaScript", "terminal/bash", "alerts", "console.log"],
        correctAnswer: "console.log"
    }
    ];

function startQuiz(){
    //for (i = 0; i < questions.length; i++){
    //console.log("Started")
    startButton.classList.add('hide');
    homeBoxElement.classList.add('hide');
    currentQuestionIndex = 0;
    quizBoxElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
    //}
}

function setNextQuestion() {
    resetState()
    showQuestion(questions[currentQuestionIndex])
}

function showQuestion(questions){
    questionElement.innerText = questions.question;
    questions.choices.forEach(choice => {
        var button = document.createElement('button')
        button.innerText = choice
        button.classList.add('btn')
        button.addEventListener('click', selectChoices)
        choicesElement.appendChild(button)
        clearResult(resultElement);
    })
}

function resetState() {
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
}

function selectChoices(currentScore) {
    var userChoice = this.innerText;
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;
    var correctScore = 11;
    //checks if answer is correct and adds score to local storage
    //each question is worth 11 points
    if(userChoice === correctAnswer) {
        console.log("Correct Answer");
        resultElement.classList.remove('hide');
        resultElement.innerText = "Correct!";
        currentScore = currentScore + correctScore;
        console.log(currentScore)   
    } else {
        console.log("Incorrect Answer");
        resultElement.classList.remove('hide');
        resultElement.innerText = "Wrong!";
    }
}

function clearResult(element) {
    element.classList.add('hide');
}

function saveCurrentScore(){

}

//timer function needs to take off 10 seconds for incorrect answers
function startTimer(){
    var timeLeft = 75;
    setInterval(function(){
        timeLeft--;
        if (timeLeft > 1) {
            timerElement.innerText = timeLeft;
        } else {
            timerElement.innerText ="";
            clearInterval(timeLeft);
        }
    }, 1000);

}
