
var ulScore= document.querySelector(".highscore");
var clear = document.querySelector(".clear");
var restart = document.querySelector(".restart");


clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});


var allScores = localStorage.getItem("allScores");
allScores= JSON.parse(allScores);

if (allScores !== null) {
    for (var i = 0; i <allScores.length; i++) {
        var scoreLi = document.createElement("li");
        scoreLi.setAttribute("id","score-initials");
        scoreLi.textContent = allScores[i].initials + " " + allScores[i].score;
        ulScore.appendChild(scoreLi);
    }
}


restart.addEventListener("click", function(){
    window.location.replace("./index.html");
}); 