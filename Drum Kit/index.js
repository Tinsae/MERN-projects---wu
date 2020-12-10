
let drumContainer = document.querySelector(".set");
drumContainer.addEventListener("click", handleClick);

function handleClick(event){
    const node = event.target;
    const isButton = node.nodeName === "BUTTON";
    if(!isButton){
        return ;
    }
    node.style.color = "white";
    const text = node.textContent;
    let soundURL = "";
   
    if(text == 'w'){
        soundURL = "sounds/tom-1.mp3";
    }
    else if(text == 'a'){
        soundURL = "sounds/tom-2.mp3";
    }
    else if(text == 's'){
        soundURL = "sounds/tom-3.mp3";
    }
    else if(text == 'd'){
        soundURL = "sounds/tom-4.mp3";
    }
    else if(text == 'j'){
        soundURL = "sounds/snare.mp3";
    }
    else if(text == 'k'){
        soundURL = "sounds/crash.mp3";
    }
    else{
        soundURL = "sounds/kick-bass.mp3";
    }
    var sound = new Audio(soundURL)
    sound.play();
} 