import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./customFunctions.js";
const SPEED = 0.05;
let groundElements = document.querySelectorAll('[data-ground]');

export function setupGround(){
    setCustomProperty(groundElements[0],"--left",1);
    setCustomProperty(groundElements[1],"--left",300);
}
export function updateGround(timeDiff,speedScale){
   // console.log(timeDiff)
    groundElements.forEach(ground =>{
        incrementCustomProperty(ground,"--left",timeDiff*speedScale*SPEED*-1);
        if(getCustomProperty(ground,"--left") <= -300){
            incrementCustomProperty(ground,"--left",600)
        }
    })

}