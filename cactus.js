import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./customFunctions.js";

let cactusElement = document.querySelectorAll('[data-cactus]');
let worldElement = document.querySelector('[data-world]');

const SPEED = .05;
const CACTUS_INTERVAL_MIN= 500;
const CACTUS_INTERVAL_MAX= 2000;
let nextCactusTime;
export function setupCactus(){
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll('[data-cactus]') .forEach(cactus =>{
        cactus.remove();
    })
}
export function updateCactus(timeDiff,speedScale){
    document.querySelectorAll('[data-cactus]') .forEach(cactus =>{
        incrementCustomProperty(cactus,"--left",SPEED*timeDiff*speedScale*-1);
        if(getCustomProperty(cactus,"--left")<=-100){
            cactus.remove();
        }
    })
   // console.log(nextCactusTime)
    if(nextCactusTime <=0){
        createCactus();
         nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN,CACTUS_INTERVAL_MAX)/speedScale;
    }
    nextCactusTime -= timeDiff;
}
function createCactus(){
    let cactus = document.createElement("img");
    cactus.dataset.cactus =true;
    cactus.src = `./images/cactus.png`;
    cactus.classList.add("cactus")
    setCustomProperty(cactus,"--left",100)
    worldElement.appendChild(cactus);
}
function randomNumberBetween(min,max){
    return Math.floor(Math.random() * (max-min+1) + min)
}

export function getCactusRects(){
   return [...document.querySelectorAll("[data-cactus]")].map(cactus =>{
        return cactus.getBoundingClientRect();
    })
}