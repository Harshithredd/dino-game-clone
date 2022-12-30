import { getCactusRects, setupCactus, updateCactus } from "./cactus.js";
import { getDinoRect, setDinoLoose, setupDion, updateDino } from "./dino.js";
import { setupGround, updateGround } from "./ground.js";

const height = 30;
const width = 100;
const SPEED_SCALE_INC = 0.00001

const worldElement = document.querySelector('[data-world]');
const startElement = document.querySelector('[data-start-screen]');
const scoreElement = document.querySelector('[data-score]')
//to scale our world ass per the window size
scaleWindow();

window.addEventListener("resize",scaleWindow);
document.addEventListener("click",handelStart,{once:true});

let lastTime;
let speedScale;
let score ;
// to update on each frame 
function update(time){
    if(!lastTime){
        lastTime  = time;
        window.requestAnimationFrame(update);   
        return;
    }
    let timeDiff =  time -lastTime;
    updateGround(timeDiff,speedScale);
    updateSpeedScale(timeDiff);
    updateScore(timeDiff);
    updateDino(timeDiff,speedScale);
    updateCactus(timeDiff,speedScale);
    if(isgameOver()) return handelGameOver();
    lastTime = time;
    window.requestAnimationFrame(update);
}

function updateSpeedScale(timeDiff){
    speedScale += timeDiff*SPEED_SCALE_INC;
}

function updateScore(timeDiff){
    score += timeDiff*0.01;
    // console.log(score)
    scoreElement.textContent = Math.floor(score);
}
//handeling starting things....
function handelStart(){
    lastTime = null;
    speedScale =1;
    score=0;
    setupGround();
    setupDion();
    setupCactus();
    startElement.classList.add("hide");
    window.requestAnimationFrame(update);
}

//to scale our world ass per the window size
function scaleWindow(){
    let setPixels;
   // console.log(window.innerWidth,window.innerHeight,window.innerWidth/window.innerHeight)
    if(window.innerWidth/window.innerHeight < width/height){
        setPixels = window.innerWidth/width;
    }else{
        setPixels = window.innerHeight/height;
    }
    worldElement.style.width = `${width*setPixels}px`;
    worldElement.style.height = `${height*setPixels}px`;
}

function isgameOver(){
    let dinoRect =getDinoRect();
    let cactusRect = getCactusRects();
    return( cactusRect.some(rect => isCollusion(rect,dinoRect))) ;
    
}
function isCollusion(rect1,rect2){
    return ( 
        rect1.left< rect2.right &&
        rect1.top < rect2.bottom &&
        rect1.right > rect2.left &&
        rect1.bottom > rect2.top    
        )
}

function handelGameOver(){
    setDinoLoose();
    setTimeout(()=>{
        document.addEventListener("click",handelStart,{once: true});
        startElement.classList.remove("hide");
    },300)
 }