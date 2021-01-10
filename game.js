
let buttonColours = ["red","blue","green","yellow"];

let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let started = false;

$("body").keypress(function() {
    if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
   
    }
});

$(".btn").click(function() {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColours[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); 
    playSound(randomChosenColor);
};


function playSound(name) {

    
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")

    setTimeout(function() {
       $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
   
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
       
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
            
        }
        
    } 
    
    else {
            $("h1").text("Game over Press Any Key to Restart");
            $("body").addClass("game-over");
            playSound("wrong");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
            startOver();
    }
        
}


function startOver() {
    level = 0;
    gamePattern = [];
    started = false;

}



