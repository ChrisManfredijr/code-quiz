var questionTotal = 5;
var questionCount = 1;
var countDown = 30;
var introWrapperEl = document.querySelector("#intro-wrapper");
var navTimeEl = document.querySelector("#nav-time");
var quizAreaEl = document.querySelector("#quiz-area"); 
var quizQuestionEl = document.querySelector("#question"+ questionCount);
var answerFeedbackEl = document.querySelector("#answer-feedback");
var endGameEl = document.querySelector("#end-screen");
var endMessageEl = document.querySelector("#end-message");
var highScoresEl = document.querySelector("#high-scores");
var podiumEl = document.querySelector("#podium"); 
var goBackEl = document.querySelector("#go-back");
var clearScoreEl = document.querySelector("#clear-score");
var highscoreToggle = 0;
var scoreRanking = [];



var viewHighscores = function(event){

   if(event.target.matches(".view-score")|| event.target.matches(".sub")){
        //if the user tries to view highscores durring game, this will ensure the timer stops and does not go to endscreen
        highscoreToggle++;
        clearScreen();
        highScoresEl.style.display = "flex";

        var localArray = JSON.parse(localStorage.getItem('scoreRanking'));
        if(localArray != null) {
            for(let i = 0; i < localArray.length; i++)
            {
                var podiumElement = document.createElement("li");
                podiumElement.textContent = localArray[i].name + ": " + localArray[i].score;
                podiumElement.className = "ranking";
                podiumEl.appendChild(podiumElement);
            };
        };
       
   }
}

var clearScreen = function(){
    quizAreaEl.style.display = "none";
    endGameEl.style.display = "none";
    introWrapperEl.style.display = "none";
    navTimeEl.style.display = "none";
    quizQuestionEl.style.display = "none";
}

var gameTimer = function(){

    var gameTimer = document.querySelector("#game-timer");
    var timer = setInterval(function(){
        countDown--;
        if(countDown <= 0){
            countDown = 0;
            clearInterval(timer);
            endGame();   
        }else if(questionCount > questionTotal || highscoreToggle === 1){
            clearInterval(timer);
        }
        gameTimer.innerHTML = "Timer:" + countDown;
        
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
    quizAreaEl.style.display = "none";
    endGameEl.style.display = "flex";
    endMessageEl.innerHTML = "your final score is: " + (countDown);

}

var submitScore = function(event){
    event.preventDefault();
    if(event.target.matches("#sub-button")){
        if(countDown === 0){
            window.alert("you can't save a score of 0, get better")
        }else{
        var intials = document.querySelector("input[name='intials']").value;
        var scoreCard = {
            name:intials,
            score:countDown+1,
        }
        if(localStorage.getItem('scoreRanking') === null){
            localStorage.setItem('scoreRanking', '[]');
        }
        var tempArray = JSON.parse(localStorage.getItem('scoreRanking'));
        tempArray.push(scoreCard);
        tempArray.sort((a,b) => {
            return b.score - a.score;
        });
        
        localStorage.setItem('scoreRanking', JSON.stringify(tempArray));
        viewHighscores(event);
        };
    }
}
var goBack = function(){
    location.reload()
}

var clearScore = function(){
    if(window.confirm("are you sure you want to clear all highscores?")){
        localStorage.removeItem('scoreRanking');
        while(podiumEl.firstChild){
            podiumEl.removeChild(podiumEl.firstChild);
        }
    }
}
introWrapperEl.addEventListener("click", startGame);
navTimeEl.addEventListener("click", viewHighscores);
quizAreaEl.addEventListener("click", submitAnswer);
endGameEl.addEventListener("click",submitScore);
goBackEl.addEventListener("click", goBack);
clearScoreEl.addEventListener("click", clearScore);
