/* 
Still pending:

JS
1. result not rendering unitl the last question is answered
2. quiz not ending after last question is answered 
3. when click try again timer runs negative
4. timer missing from start page

CSS
1. Start button centered on beginning page
2. Stop timer decrement from affecting rest of page
*/

//time and score
var timeCountElement = document.getElementById('timecount');
var timerElement = document.getElementById('timer');
var timeLeft = 75;
var userScoreElement = document.getElementById('user-score');
var questionCount = 0;
timerElement.textContent = `Time: ${0}s`;

//start, quiz and add score
var startButton = document.getElementById('btn-begin');
var homeBoxElement = document.getElementById('home-box');
var quizBoxElement = document.getElementById('quiz-box');
var currentQuestionIndex = 0;
var questionElement = document.getElementById('question');
var choicesElement = document.getElementById('choice-buttons');
var resultElement = document.getElementById('result');
var endPageElement = document.getElementById('end-box');
var initialsInputElement = document.getElementById('name');
var submitScrBtnElement = document.getElementById('submitScore');

//high scores page
var viewHighScores = document.getElementById('high-scores');
var viewHighSoresElement = document.getElementById('high-scoresBox');
var clearScrBtnElement = document.getElementById('clear-scores');
var scoreListElement = document.getElementById('score-list');
var tryAgainBtnElement = document.getElementById('againBtn');
var scoreList = [];

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

//timer function
function startTimer(){
    let timerInterval = setInterval(function (){
        timeLeft--;
        timerElement.textContent = `Time: ${timeLeft}s`;

    if(timeLeft === 0 || questionCount === questions.length){
        clearInterval(timerInterval);
        quizBoxElement.classList.add('hide');
        endPageElement.classList.remove('hide');
        userScoreElement.textContent = timeLeft;
        }
    }, 1000);

}

//start quiz with timer and set questions
function startQuiz(){
    //console.log("Started")
    startButton.classList.add('hide');
    homeBoxElement.classList.add('hide');
    currentQuestionIndex = 0;
    quizBoxElement.classList.remove('hide');
    //timerElement.classList.remove('hide');
    setNextQuestion();
    startTimer();
}

//reset placeholders on html and replace with questions
function setNextQuestion() {
    if (currentQuestionIndex < questions.length){
    resetState()
    showQuestion(questions[currentQuestionIndex])
    } 
}

//shows questions
function showQuestion(questions){
    questionElement.innerText = questions.question;
    questions.choices.forEach(choice => {
        var button = document.createElement('button')
        button.innerText = choice
        button.classList.add('btn')
        choicesElement.appendChild(button)
        button.addEventListener('click', selectChoices)
        clearResult(resultElement);
    })
}

//function to clear result and get ready to receive correct or wrong
function clearResult(element) {
    element.classList.add('hide');
}

//resets placeholder in html.index
function resetState() {
    while (choicesElement.firstChild) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
}

//function to check answer and move to next question
function selectChoices(event) {
    event.preventDefault();

    var userChoice = this.innerText;
    event.target.value = userChoice;
    var correctAnswer = questions[currentQuestionIndex].correctAnswer;

    //checks if answer is correct
    if(event.target.value === correctAnswer) {
        resultElement.classList.remove('hide');
        resultElement.innerText = "Correct!";
        console.log("Correct Answer");
          
    } else if(event.target.value !== correctAnswer){
        timeLeft = timeLeft - 10;
        resultElement.classList.remove('hide');
        resultElement.innerText = "Wrong!";
        console.log("Incorrect Answer");
        
    } 
    
    if (currentQuestionIndex < questions.length) {
        currentQuestionIndex++;
    }

    setNextQuestion(); 
}

//adds score to list and sorts
function addScore(event){
    event.preventDefault();

    let init = initialsInputElement.value.toUpperCase();
    scoreList.push({ initials: init, score: timeLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
            return 1;
        } else {
            return -1;
        }
    });

    scoreListElement.innerHTML="";
    for (var i = 0; i < scoreList.length; i++){
        var li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListElement.append(li);
    }

    //add to local storage
    storeScores();
    displayScores();
    endPageElement.classList.add('hide');
    timerElement.classList.add('hide');
    viewHighScores.classList.add('hide');
    viewHighSoresElement.classList.remove('hide');
}

//function to store scores
function storeScores(){
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

//function to display scores
function displayScores(){
    var storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if(storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

//function to clear scores
function clearScores(){
    localStorage.clear();
    scoreListElement.innerHTML="";
}

//event listeners
startButton.addEventListener('click', startQuiz);
submitScrBtnElement.addEventListener('click', addScore);
clearScrBtnElement.addEventListener('click', clearScores);
tryAgainBtnElement.addEventListener('click', function(){
    startButton.classList.remove('hide');
    homeBoxElement.classList.remove('hide');
    viewHighScores.classList.remove('hide');
    viewHighSoresElement.classList.add('hide');
    timerElement.classList.remove('hide');
});

//button to access high scores from homepage
viewHighScores.addEventListener("click", function(){
    startButton.classList.add('hide');
    homeBoxElement.classList.add('hide');
    quizBoxElement.classList.add('hide');
    timerElement.classList.add('hide');
    viewHighScores.classList.add('hide');
    endPageElement.classList.add('hide');

    viewHighSoresElement.classList.remove('hide');
});


