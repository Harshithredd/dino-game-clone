import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./customFunctions.js";

let dinoElement = document.querySelector('[data-dino]');
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT =2;
const FRAME_TIME = 100;

let isJumping;
let currentFrameTime;
let dinoFrame;
let yVelocity;
export function setupDion(){
    isJumping =false;
    currentFrameTime=0;
    dinoFrame=0; 
    yVelocity=0;
    setCustomProperty(dinoElement,"--bottom",0);
    document.removeEventListener("keydown",onJump);
    document.addEventListener("keydown",onJump);
}
export function updateDino(timeDiff,speedScale){
    handelRunning(timeDiff,speedScale); 
    handelJumping(timeDiff);
}
function handelRunning(timeDiff,speedScale){
    if(isJumping){
        dinoElement.src = `./images/dino-stationary.png`;
        return;
    }
    if(currentFrameTime>= FRAME_TIME){
        dinoFrame = (dinoFrame+1) % DINO_FRAME_COUNT;
        dinoElement.src =`./images/dino-run-${dinoFrame}.png`;
        currentFrameTime-= FRAME_TIME;
    }
    currentFrameTime += timeDiff*speedScale;
}

function handelJumping(timeDiff){
    if(!isJumping) return;
    incrementCustomProperty(dinoElement,"--bottom",yVelocity * timeDiff);
    if(getCustomProperty(dinoElement,"--bottom") <=0){
        setCustomProperty(dinoElement,"--bottom",0);
        isJumping = false;
    }
    yVelocity -= GRAVITY * timeDiff;
} 

function onJump(e){
     if(e.code !== "Space" ||  isJumping){
        return;
     }
     yVelocity = JUMP_SPEED;   
     isJumping = true;
}

export function getDinoRect(){
    return document.querySelector("[data-dino]").getBoundingClientRect();
}

export function setDinoLoose(){
    dinoElement.src="./images/dino-lose.png"
}