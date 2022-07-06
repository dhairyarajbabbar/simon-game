var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4 );

    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level=level+1;
    var templevel="level "+level;
    $("h1").text(templevel);
}
$(".btn").click(function handler(e){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});
function playSound(colourname){
    
    var fullcolourname="sounds/"+colourname+".mp3";
    var sound=new Audio(fullcolourname);
    sound.play();
}
function animatePress(currentcolour){
    $("#"+currentcolour).addClass("pressed");
    setTimeout(function() {
        $("#"+currentcolour).removeClass("pressed");
    }, 100);
}
var level=-1; 
$(document).keypress(function(){

    if(level===-1){
       nextSequence(); 
    }

    
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(gamePattern.length===currentLevel+1){
            setTimeout(nextSequence, 1000)
            // nextSequence();
            userClickedPattern=[];
        }
    }
    else{
        var sound=new Audio("sounds/wrong.mp3");
        sound.play();
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level=-1;
    }
}