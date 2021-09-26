import { fromEvent, map } from "rxjs";
import { Note } from "../../models/note";
import { makeKeyDivShine } from "../pianoAccessories/playAndStopButton";

export function createNoteField(noteObject: Note, displayNotesOrChordsContainer: HTMLElement){
    const noteDiv = document.createElement("div");
    noteDiv.className = "noteOrChordDislayDiv";
    noteDiv.innerHTML = `${noteObject.name}`

    const pathToMP3 = noteObject.pathToNote;

    fromEvent(noteDiv, "click")
    .pipe(
        map((clickEvent: PointerEvent) => (<HTMLDivElement>clickEvent.target).innerHTML)
    ).subscribe((noteName: string) => {
        console.log("Playing Note: " + noteName);
        playNote(pathToMP3);
        makeKeyDivShine(document.getElementById(`${noteObject.id}`));
    }) 
    displayNotesOrChordsContainer.appendChild(noteDiv);
}

export function playNote(pathToMP3File: string){
    new Audio(pathToMP3File).play();
}