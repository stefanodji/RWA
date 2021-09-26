
let indexNumberOfNotes = 1;

export function drawPiano(){
    const pianoContainer = document.getElementById("pianoResponsiveDiv");
    const numberOfOctaves = 3;

    for(let octaveNumber=0; octaveNumber < numberOfOctaves; octaveNumber++){
        drawOneOctave(pianoContainer);
    }

    const holePiano = document.createElement("img");
    holePiano.src = "../../imagesPiano/AllPiano.png";
    holePiano.className = "imagePiano";
    pianoContainer.append(holePiano);
}

function drawOneOctave(pianoContainer: HTMLElement){
    for(let noteNumberInOctave=0; noteNumberInOctave < 7; noteNumberInOctave++){
        drawOneWhiteKey(pianoContainer, noteNumberInOctave);
    }
}

function drawOneWhiteKey(pianoContainer: HTMLElement, noteNumberInOctave: number){
    const whiteKey = document.createElement("div");
    whiteKey.className = "whiteKey";
    whiteKey.id = indexNumberOfNotes.toString();
    indexNumberOfNotes++;
    pianoContainer.appendChild(whiteKey);

    const labelUp = document.createElement("div");
    labelUp.className = "whiteKeyLabelUp";
    labelUp.classList.add(`whiteKeyLabelUp${noteNumberInOctave}`);

    const labelDown = document.createElement("div");
    labelDown.className = "whiteKeyLabelDown";

    whiteKey.appendChild(labelUp);
    whiteKey.appendChild(labelDown);

    if (noteNumberInOctave == 2 || noteNumberInOctave == 6){
        return;
    }
    else{
        drawOneBlackKey(whiteKey, noteNumberInOctave);
    }
}


function drawOneBlackKey(whiteNoteKey: HTMLElement, noteNumberInOctave: number){
    const blackKey = document.createElement("div");
    blackKey.className = `blackKey blackKey${noteNumberInOctave}`;
    blackKey.id = indexNumberOfNotes.toString();
    indexNumberOfNotes++;

    const blackKeyLabelUp = document.createElement("div");
    blackKeyLabelUp.className = "blackKeyLabelUp";

    blackKey.appendChild(blackKeyLabelUp);
    const blackKeyImage = document.createElement("img");
    blackKeyImage.src = "../../imagesPiano/blackPianoKey.png";
    blackKeyImage.style.width = "100%";
    blackKeyImage.style.height = "100%";
    blackKey.append(blackKeyImage);

    whiteNoteKey.appendChild(blackKey);

}
