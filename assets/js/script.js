var questionTotal = 5;
var questionCount = 1;
var countDown = 30;
var introWrapperEl = document.querySelector("#intro-wrapper");
var navTimeEl = document.querySelector("#nav-time");
var quizAreaEl = document.querySelector("#quiz-area"); 
var quizQuestionEl = document.querySelector("#question"+ questionCount);
var answerFeedbackEl = document.querySelector("#answer-feedback");
var endGameEl = document.querySelector("#end-screen");
var timer;


var viewHighscores = function(event){
   
}

var gameTimer = function(){
    var gameTimer = document.querySelector("#game-timer");
    var timer = setInterval(function(){
        countDown--;
        if(countDown <= 0){
            countDown = 0;
            clearInterval(timer);
            endGame();   
        }else if(questionCount > questionTotal){
            clearInterval(timer);
        }
        gameTimer.innerHTML = "Timer:" + countDown;
        ;
    }, 1000);
}

var startGame = function(event) {
    event.preventDefault();
    var targetEl = event.target;
   if(targetEl.matches(".btn")){
      introWrapperEl.style.display = "none";
      quizAreaEl.style.display = "flex";
      playGame();
      gameTimer();
      };
   }



var playGame = function() {
    if(questionCount <= questionTotal) {
        var quizQuestionEl = document.querySelector("#question" + questionCount);
        quizQuestionEl.style.display = "flex";
    }else{
        endGame();
    };

}

var submitAnswer = function(event){
    var targetEl = event.target;
    var quizQuestionEl = document.querySelector("#question" + questionCount);

   if(targetEl.matches(".btn")){
        if(targetEl.getAttribute("data-correct") === "true"){
           console.log("correct");
           answerCorrect("true");
       }else{
           console.log("wrong");
           answerCorrect("false");
           if(countDown < 10){
               countDown = 0;
               endGame(); 
           }
           countDown = countDown - 10;
        }
    quizQuestionEl.style.display = "none";
    questionCount++;
    playGame();
   }
 
}

var answerCorrect = function(response){
    var answerFeedbackEl = document.querySelector("#answer-feedback");
    var removeDisplay = function(){
        answerFeedbackEl.style.display = "none";
    }

    if(response === "true"){
        answerFeedbackEl.textContent = "Correct!";
        answerFeedbackEl.style.display = "flex";
        setTimeout(removeDisplay, 2000);

    }else{
        answerFeedbackEl.textContent = "Wrong!";
        answerFeedbackEl.style.display = "flex";
        setTimeout(removeDisplay, 2000);
    }
}

var endGame = function(){
    clearInterval(timer);
    quizAreaEl.style.display = "none";
    endGameEl.style.display = "flex";

}
introWrapperEl.addEventListener("click", startGame);
navTimeEl.addEventListener("click", viewHighscores);
quizAreaEl.addEventListener("click", submitAnswer);