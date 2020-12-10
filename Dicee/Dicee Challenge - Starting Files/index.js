var games;
function play(){
    games = setInterval(game, 500);
}
function stop(){
    clearInterval(games);
}
function game(){
    let randomNumber1 = 0;
    let randomNumber2 = 0;
    randomNumber1 = Math.floor((Math.random() * 6) + 1);
    document.querySelector(".img1").setAttribute("src", `images/dice${randomNumber1}.png`);
    randomNumber2 = Math.floor((Math.random() * 6) + 1);
    document.querySelector(".img2").setAttribute("src", `images/dice${randomNumber2}.png`); 

    if(randomNumber1 > randomNumber2){
        document.querySelector("h1").textContent = "Player1 Wins!";

    }
    else if(randomNumber1 < randomNumber2){
        document.querySelector("h1").textContent = "Player2 Wins!";

    }
    else{
        document.querySelector("h1").textContent = "Draw!";

    }
}