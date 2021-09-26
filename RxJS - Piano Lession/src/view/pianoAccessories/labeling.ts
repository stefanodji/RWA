
export function addEventListenerLabeling(){
    const labelingDiv = document.getElementById("labelingDiv");

    labelingDiv.addEventListener("click", () => {
        labelingDivCliked();
    })
}


let labelingClickCounter = -1;
const whiteKeysUp = ["q","w","e","r","t","y","u","i","o","p","z","x","c","v","b","n","m",",",".","/","+"];
const blackKeysUp = ["2","3","5","6","7","9","0","s","d","f","h","j","l",";","'"];
const whiteKeysDown = ["C3","D3","E3","F3","G3","A3","B3","C4","D4","E4","F4","G4","A4","B4","C5","D5","E5","F5","G5","A5","B5"];
let whiteKeysLabelUp;
let blackKeysLabelUp;
let whiteKeysLabelDown;

function labelingDivCliked(){
    labelingClickCounter++;

    switch(labelingClickCounter % 4){
        case 0:
            whiteKeysLabelUp = document.getElementsByClassName("whiteKeyLabelUp");
            blackKeysLabelUp = document.getElementsByClassName("blackKeyLabelUp");

            for(let x = 0; x < whiteKeysLabelUp.length; x++){
                whiteKeysLabelUp[x].innerHTML = whiteKeysUp[x];
            }

            for(let x = 0; x < blackKeysLabelUp.length; x++){
                blackKeysLabelUp[x].innerHTML = blackKeysUp[x];
            }
            break;
        case 1:
            whiteKeysLabelDown = document.getElementsByClassName("whiteKeyLabelDown");
            for(let x = 0; x < whiteKeysLabelDown.length; x++){
                whiteKeysLabelDown[x].innerHTML = whiteKeysDown[x];
            }
            break;
        case 2:
            whiteKeysLabelUp = document.getElementsByClassName("whiteKeyLabelUp");
            blackKeysLabelUp = document.getElementsByClassName("blackKeyLabelUp");

            for(let x = 0; x < whiteKeysLabelUp.length; x++){
                whiteKeysLabelUp[x].innerHTML = "";
            }

            for(let x = 0; x < blackKeysLabelUp.length; x++){
                blackKeysLabelUp[x].innerHTML = "";
            }
            break;
        case 3:
            whiteKeysLabelDown = document.getElementsByClassName("whiteKeyLabelDown");
            for(let x = 0; x < whiteKeysLabelDown.length; x++){
                whiteKeysLabelDown[x].innerHTML = "";
            }
            break;
    }
}