
let buttons = document.querySelectorAll(".drum");
for(let btn of buttons){
    btn.addEventListener("click", handleEvent);
    btn.addEventListener("keydown", handleEvent);
}
function handleEvent(event){
    if(event.target.tagName == 'BUTTON'){
        if(event.type == 'click'){
            makeSound(event.target.textContent);
            animateButton(event.target.textContent);
        }
        else if(event.type == 'keydown'){
            makeSound(event.key);
            animateButton(event.key);
        }

    }
} 

function animateButton(key){
    console.log(key);
    let target = document.querySelector("." + key);
    if(target){
        target.classList.add("pressed");
        setTimeout(()=>{
            target.classList.remove("pressed");
        }, 200);
    }
}
function makeSound(key){
    if(key && "wasdjkl".includes(key)){
        let aMap = new Map()
        aMap['w'] = 'tom-1.mp3';
        aMap['a'] = 'tom-2.mp3';
        aMap['s'] = 'tom-3.mp3';
        aMap['d'] = 'tom-4.mp3';
        aMap['j'] = 'snare.mp3';
        aMap['k'] = 'crash.mp3';
        aMap['l'] = 'kick-bass.mp3';
        let url = "sounds/" + aMap[key];
        new Audio(url).play();
    }
}