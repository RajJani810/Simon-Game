// alert('Hi')
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

var UserclickedPattern = [];
var started = false;
var level=0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColour =  $(this).attr("id");
    UserclickedPattern.push(userChosenColour);
    PlaySound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(UserclickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === UserclickedPattern[currentLevel]){
        if(UserclickedPattern.length === gamePattern.length){
            setTimeout(function (){
                nextsequence();
            } , 1000);
        }
    }
    else{
        PlaySound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Key To Restart");

        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function nextsequence()
{
    UserclickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    PlaySound(randomChosenColour);
}
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");
    setTimeout(function (){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function PlaySound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}