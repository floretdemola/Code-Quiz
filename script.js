//document.getelement from HTML document
var start = document.getElementById("startpage");
var startQuizBtn = document.getElementById("start-btn");
var quiz = document.getElementById("quiz");
var quizTimer = document.getElementById("timer");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var questionsEl = document.getElementById("questions");
var resultEl = document.getElementById("result");
var gameoverEl = document.getElementById("gameover");
var finalScoreEl = document.getElementById("finalScore");
var highScoreContainer = document.getElementById("scoreContainer");
var highScoreEl = document.getElementById("HighScore-page");
var inputName = document.getElementById("initials");
var displayName = document.getElementById("highscore-initials");
var endGameBtns = document.getElementById("endGame");
var submit = document.getElementById("submitScore-btn");
var highscoreDisplay = document.getElementById("highscore-score");

//Questions
var questions = [{
    question: "What does CSS stand for?",
    choiceA: "Cascading Style Sheet",
    choiceB: "Creative Style Sheet",
    choiceC: "Computer Script Style",
    choiceD: "Computated Screen Style",
    correctAnswer: "a"
    },
    {
    question: "Insert Question 2 here",
    choiceA: "Insert answer",
    choiceB: "Insert answer",
    choiceC: "Insert answer",
    choiceD: "Insert answer",
    correctAnswer: "b"  
    },
    {
    question: "Insert Question 3 here",
    choiceA: "Insert answer",
    choiceB: "Insert answer",
    choiceC: "Insert answer",
    choiceD: "Insert answer",
    correctAnswer: "c"  
    },    
    {
    question: "Insert Question 4 here",
    choiceA: "Insert answer",
    choiceB: "Insert answer",
    choiceC: "Insert answer",
    choiceD: "Insert answer",
    correctAnswer: "d"  
    },];

var finalQuestionsIndex = questions.length;
var currentQuestionIndex = 0;
var timeLeft = 90;
var timerInterval;
var score = 0;
var correct;

function generateQuestion() {
    gameoverEl.style.display = "none";
    if (currentQuestionIndex === finalQuestionsIndex){
        return showScore();
    }
    var currentQuestion = questions[currentQuestionIndex];
    questionsEl.innerHTML = "<p>" + currentQuestion.question+ "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz() {
    gameoverEl.style.display = "none";
    start.style.display = "none";
    generateQuestion();

    timerInterval = setInterval(function() {
        timeLeft--;
        quizTimer.textContent = "Time remaining: " + timeLeft;

        if(timeLeft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000);
    quiz.style.display = "block";
}

function showScore() {
    gameoverEl.style.display = "flex";
    quiz.style.display = "none";
    clearInterval(timerInterval);
    inputName.value = "";
    finalScoreEl.innerHTML = "Total Score: " + score + " out of " + questions.length + " correct";
}

submit.addEventListener("click", function highscore() {
    if(inputName.value === "") {
        alert("Please enter your initials, cannot submit an empty answer");
        return false;
    }else{
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighScores")) || [];
        var currentUser = inputName.value.trim();
        var currentHighscore = {
            name : currentUser,
            score : score
        };
       
        gameoverEl.style.display = "none";
        highScoreContainer.style.display = "flex";
        highScoreEl.style.display = "block";
        endGameBtns.style.display = "flex";
       
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generateHighscores();
    }
});

function generateHighscores() {
    displayName.innerHTML = "";
    highscoreDisplay.innerHTML = "";
    var highscores = JSON.parse(localStorage.getItem("savedHighscores")) || [];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        displayName.appendChild(newNameSpan);
        highscoreDisplay.appendChild(newScoreSpan);
    }
}

function showHighscore() {
    start.style.display = "none";
    gameoverEl.style.display = "none";
    highScoreContainer.style.display = "flex";
    highScoreEl.style.display = "block";
    endGameBtns.style.display = "flex";

    generateHighscores();
}

function clearScore() {
    window.localStorage.clear();
    displayName.textContent = "";
    highscoreDisplay.textContent = "";
}

function replayQuiz() {
    highScoreContainer.style.display = "none";
    gameoverEl.style.display = "none";
    start.style.display = "flex";
    endGameBtns.style.display = "none";
    timeLeft = 90;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer (answer) {
    correct = questions[currentQuestionIndex].correctAnswer;
    if (answer === correct && currentQuestionIndex !== finalQuestionsIndex){
        score++;
        alert("Correct!");
        currentQuestionIndex++;
        generateQuestion();
    } else if (answer !== correct && currentQuestionIndex !== finalQuestionsIndex) {
        alert("Incorrect!");
        currentQuestionIndex++;
        generateQuestion();
    } else{
        showScore();
    }
}

var playAgain = document.getElementById("playAgain");
var clearHighscore = document.getElementById("clearHighscore");


startQuizBtn.addEventListener("click", startQuiz);