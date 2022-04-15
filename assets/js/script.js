var questionTotal = 5;
var questionCount = 1;
var countDown = 30;
var introWrapperEl = document.querySelector("#intro-wrapper");
var navTimeEl = document.querySelector("#nav-time");
var quizAreaEl = document.querySelector("#quiz-area"); 
var quizQuestionEl = document.querySelector("#question"+ questionCount);
var timer;


var viewHighscores = function(event){
   
}

var gameTimer = function(){
    var gameTimer = document.querySelector("#game-timer");
    var timer = setInterval(function(){
        countDown--;
        gameTimer.innerHTML = "Timer:" + countDown;
        if(countDown === 0){
            clearInterval(timer);
            endGame();   
        }else if(questionCount > questionTotal){
            clearInterval(timer);
        };
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
    event.preventDefault();
    var quizQuestionEl = document.querySelector("#question" + questionCount);
    var targetEl = event.target;

   if(targetEl.matches(".btn")){

    
    quizQuestionEl.style.display = "none";
    questionCount++;
    playGame();
   }
 
}

var endGame = function(){
    clearInterval(timer);
    quizAreaEl.style.display = "none";
}
introWrapperEl.addEventListener("click", startGame);
navTimeEl.addEventListener("click", viewHighscores);
quizAreaEl.addEventListener("click", submitAnswer);