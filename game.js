var buttonColours =["red", "blue", "green", "yellow"];
var gamePattern =[];
var userClickedPattern = [];
var keypressCount = 0;
var level;
function nextSequence(){
    level++;
    $("#level-title").text("Level "+level);
    //Color Randomization
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // Flashing The Random Color
    var chosenColorId = "#"+randomChosenColour;
    $(chosenColorId).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
    // Implementing sound according to the color chosen
    var colorSoundPath = "./sounds/"+ randomChosenColour+".mp3";
    playSound(colorSoundPath);
    
}
function playSound(name){
    var colorSound = new Audio(name);
    colorSound.play();
}
function animatePress(currentColour){
    var colorId = "#"+currentColour;
    $(colorId).addClass("pressed");
    setTimeout(function(){
        $(colorId).removeClass("pressed");
    },"100");
}
function checkAnswer(currentLevel){
     if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Success");
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },"1000");
            userClickedPattern= [];
        }
     }
     else{
        var sound = new Audio('./sounds/wrong.mp3');
        sound.play();
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },"200");
        console.log("Wrong");
        startOver();
     }
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    keypressCount=0;
}
//Initial Key press to launch the game
$(document).on("keydown",function(){
    if (keypressCount === 0){
        level= 0;
        $("#level-title").text("Level "+level);
        nextSequence();
        keypressCount++;
    }
});

// User Chooses A color Via Click
$(".btn").on("click",function(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    
    checkAnswer(userClickedPattern.length-1);
    animatePress(userChosenColour);
    console.log("User pattern: "+userClickedPattern);
    console.log("User pattern: "+gamePattern);
    var colorSoundPath = "./sounds/"+ userChosenColour+".mp3";
    playSound(colorSoundPath);
});

