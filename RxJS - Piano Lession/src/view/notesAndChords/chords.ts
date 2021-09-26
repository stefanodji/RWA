import { fromEvent, map, repeat, Subscription } from "rxjs";
import { getChordsObservables } from "../../apiMethods";
import { Chord } from "../../models/chord";
import { makeKeyDivShine } from "../pianoAccessories/playAndStopButton";


export function createChordField(chordObject: Chord, displayNotesOrChordsContainer: HTMLElement){
    const chordDiv = document.createElement("div");
    chordDiv.className = "noteOrChordDislayDiv";
    const p1 = document.createElement("p");
    p1.innerHTML = chordObject.name.split("-")[0];
    chordDiv.appendChild(p1);
    const p2 = document.createElement("p");
    p2.innerHTML = chordObject.name.split("-")[1];
    chordDiv.appendChild(p2);
    //chordDiv.innerHTML = `${chordObject.name}`;

    fromEvent(chordDiv, "click")
    .pipe(
        map((clickEvent: PointerEvent) => (<HTMLDivElement>clickEvent.target).innerHTML)
    ).subscribe((chordName: string) => {
        console.log("Playing Chord: " + chordName);
        let pathToMP3;
        for(let x = 0; x < chordObject.notesAssigned.length; x++){
            pathToMP3 = chordObject.notesAssigned[x].pathToNote;
            playNote(pathToMP3);
            makeKeyDivShine(document.getElementById(`${chordObject.notesAssigned[x].id}`));
        }
    });

    displayNotesOrChordsContainer.appendChild(chordDiv);
}

function playNote(pathToMP3File: string){
    new Audio(pathToMP3File).play();
}