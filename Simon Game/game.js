let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];
let level = 0;
function playSound(name){
    let theSound = new Audio(`sounds/${name}.mp3`);
    theSound.play();
}
function checkAnswer(currentLevel){
    console.log('gamePattern: ' + gamePattern);
    console.log('userClickPattern: ' + userClickPattern);
    if(userClickPattern[currentLevel] == gamePattern[currentLevel]){
        console.log('success');
        if(userClickPattern.length == gamePattern.length){
            userClickPattern = [];        
            setTimeout(nextSequence, 1000);
        }
        else{
            console.log(gamePattern.length - userClickPattern.length + ' to go, keep clicking')
        }
    }
    else{
        console.log('failure');
    }
}

function nextSequence(){
    level += 1;
    $("h1").text("Level " + level);
    console.log("Level " + level);
    let randomNumber = Math.floor((Math.random() * 3))
    let randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click((event)=>{
    let userChosenColor = event.target.id;
    userClickPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickPattern.length - 1);
});


$(document).on('keypress',function(event) {
    $("h1").text("Level " + level);
    nextSequence();
});