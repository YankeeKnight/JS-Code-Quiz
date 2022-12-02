var startButton = document.getElementById('btn-begin');
var homeBoxElement = document.getElementById('home-box');
var quizBoxElement = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var questionElement = document.getElementById('question');
var choicesElement = document.getElementById('choice-buttons');
var resultElement = document.getElementById('result')



startButton.addEventListener('click', startQuiz);

function startQuiz(){
    //console.log("Started")
    startButton.classList.add('hide');
    homeBoxElement.classList.add('hide');
    currentQuestionIndex = 0;
    quizBoxElement.classList.remove('hide');
    setNextQuestion();
}

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

function selectChoices() {
    var userChoice = this.innerText;
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;
    if(userChoice === correctAnswer) {
        console.log("Correct Answer");
        resultElement.classList.remove('hide');
        resultElement.innerText = "Correct!";
    } else {
        console.log("Incorrect Answer");
        resultElement.classList.remove('hide');
        resultElement.innerText = "Wrong!";
    }
}

function clearResult(element) {
    element.classList.add('hide');
}


function startTimer(){

}