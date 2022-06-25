//variables from index

var startButton = document.querySelector(".start-button");
var newDiv = document.getElementById("counter");
var heading1 = document.getElementsByTagName("h1");
var ulDiv = document.querySelector(".choice-list");
var quizContent = document.getElementById("quizContent");


//new variables
var timeRemaining = 60;
var timerInterval = 0;
var questionIndex = 0;
var score = 0;
var penalty = 10;


//make a timer
newDiv.textContent = "Assigned Time: " + timeRemaining + " sec.";
newDiv.style.fontSize = "30px";
newDiv.style.color = "pink";


//give the start button action

startButton.addEventListener("click", function(){
   
    if(timerInterval === 0) {
        timerInterval = setInterval(function(){
            timeRemaining --;
            newDiv.textContent = timeRemaining + " second left";

            if(timeRemaining <= 0) {
                clearInterval(timerInterval);
                quizCompletion ();
                newDiv.textContent = "Time is up!";
            }
        },1000)
    }
    showQuestion(questionIndex);
});

function showQuestion (questionIndex) {
    quizContent.innerHTML = "";
    heading1.innerHTML = "";
    ulDiv.innerHTML = "";

    for (var i = 0; i < questions.length; i++){
        var quizQuestion = questions[questionIndex].title;
        var quizChoices = questions[questionIndex].choices;
        quizContent.textContent = quizQuestion;
    }
    quizChoices.forEach(function(listItem){
        var li = document.createElement("li");
        li.setAttribute("style","color:yellow; margin-left:20px; margin-top:20px;")
        li.textContent = listItem;
        quizContent.appendChild(ulDiv);
        ulDiv.appendChild(li);
        li.addEventListener("click",check);
    })
}



function check (event) {
    event.preventDefault();
    if (event.target.matches("li")) {
        var status = document.createElement("div");

        status.setAttribute("id","status-alert");
        quizContent.appendChild(status);

        if(event.target.textContent === questions[questionIndex].answer){
             score++;
            status.textContent = "Correct!"   
            status.setAttribute("style", "color:#99ff33;font-weight:bold;text-align:center;");       
        }
        else {
            
            status.textContent = "Incorrect!";
            status.setAttribute("style", "color:red;font-weight:bold;text-align:center;");
            timeRemaining = timeRemaining - penalty;      
        }

    }

    questionIndex++;
 
    if(questionIndex >= questions.length){
        status.textContent = "You got " + score + "/" +questions.length + "Correct"
        quizCompletion();
         status.setAttribute("style", "color:#99ff33;font-weight:bold;text-align:center;");
         clearInterval(timerInterval);
    }
    else {
        showQuestion(questionIndex);
    }
     quizContent.appendChild(status);


}


 function quizCompletion () {
     
     quizContent.innerHTML = "";
     newDiv.innerHTML = "";
     var createH1 = document.createElement("h1");
     createH1.textContent = "End" ;
     var createPara = document.createElement("p");
     quizContent.appendChild(createH1);
     quizContent.appendChild(createPara);
     audioClap.play()


     if(timeRemaining >= 0){
         var secondsLeft = timeRemaining;
         newDiv.textContent ="Time Remaining " + secondsLeft;
         var finalScore = document.createElement("p");
         clearInterval (timeRemaining);
         finalScore.textContent = "Your Score is " +  secondsLeft;
         finalScore.setAttribute("style","color:pink;font-weight:bold;text-align:center;")
         quizContent.appendChild(createPara2);
     }


     var labelCreate = document.createElement("label");
     labelCreate.setAttribute("id","labelCreate");
     labelCreate.textContent = "Enter your initials";
     quizContent.appendChild(labelCreate);


     var inputCreate = document.createElement("input");
     inputCreate.setAttribute("type","text");
     inputCreate.setAttribute("id","initials");
     inputCreate.textContent = "";
     quizContent.appendChild(inputCreate);



     var submitButton = document.createElement("button");
     submitButton.setAttribute("type","submit");
     submitButton.setAttribute("id","Submit");
     submitButton.textContent = "Submit";

     
     quizContent.appendChild(submitButton);



     submitButton.addEventListener("click",function(){     
         var initialName = inputCreate.value;

         if (inputCreate === "") {
            console.log("It cannot be empty");
         }
         else {
             var user = {
                 initials: inputCreate.value ,
                 score: secondsLeft
             };

             console.log(user);

             var allScores = localStorage.getItem("allScores");
             if (allScores=== null) {
                 allScores = [];
             }
             else {
                 allScores = JSON.parse(allScores);
             }
             allScores.push(user);
             var scoreNew = JSON.stringify(allScores);
             localStorage.setItem("allScores", scoreNew);
             window.location.replace(".highscores.html");
             
         }
     });
    
     
    
 }