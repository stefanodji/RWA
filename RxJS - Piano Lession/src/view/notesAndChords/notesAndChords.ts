import { debounceTime, filter, fromEvent, map, Observable, repeat, Subscription, switchMap } from "rxjs";
import { getChordsObservablesByName, getNotesObservables, getNotesObservablesByName } from "../../apiMethods";
import { getChordsObservables } from "../../apiMethods";
import { Chord } from "../../models/chord";
import { Note } from "../../models/note";
import { createChordField } from "./chords";
import { createNoteField } from "./notes";



const displayNotesOrChordsContainer = document.getElementById("displayNotesOrChordsContainer");
let subsriptionOfNotesOrChords: Subscription;

let notesOrChordsFilter: string = "";

let noteArrayLength: number;

function createNotesView(){
    if (displayNotesOrChordsContainer.innerHTML !== ""){
        displayNotesOrChordsContainer.innerHTML = "";
        subsriptionOfNotesOrChords.unsubscribe();   
    }
    notesOrChordsFilter = "notes";
    let iterator = 0;
    subsriptionOfNotesOrChords = getNotesObservables()
    .pipe(
        map(noteObjectArray => {
            noteArrayLength = noteObjectArray.length;
            return noteObjectArray[iterator++]}),
        repeat(36)
    ).subscribe((noteObject: Note) => createNoteField(noteObject, displayNotesOrChordsContainer));
}

let chordArrayLength: number;

function createChordView(){
    if (displayNotesOrChordsContainer.innerHTML !== ""){
        displayNotesOrChordsContainer.innerHTML = "";
        subsriptionOfNotesOrChords.unsubscribe();   
    }
    notesOrChordsFilter = "chords";
    let iterator = 0;
    subsriptionOfNotesOrChords = getChordsObservables()
    .pipe(
        map(chordObjectArray => {
            chordArrayLength = chordObjectArray.length;
            return chordObjectArray[iterator++]}),
        repeat(14)
    ).subscribe((chordObject: Chord) => createChordField(chordObject, displayNotesOrChordsContainer));
}

export function noterOrChordsFilter(){
    const input = document.getElementById("filterInput");
    fromEvent(input, "input").pipe(
        debounceTime(100),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        switchMap((noteOrChordName: string) => {
            if (notesOrChordsFilter == "notes"){
                return getNotesObservablesByName(noteOrChordName);
            }else{
                return getChordsObservablesByName(noteOrChordName);
            }
        })
    ).subscribe((noteOrChordObervable) => {
        displayNotesOrChordsContainer.innerHTML = "";
        if (notesOrChordsFilter == "notes"){
            noteOrChordObervable.forEach(note => {
                createNoteField(<Note>note, displayNotesOrChordsContainer)
            })
        }else{
            noteOrChordObervable.forEach(chord => {
                createChordField(<Chord>chord, displayNotesOrChordsContainer)
            })
        }
    })
}


export function addEventListenersOnNoteAndChordButtons(){
    const noteChordButton = document.getElementsByClassName("noteChordButton")
    
    noteChordButton[0].addEventListener("click", () =>{
        createNotesView();
    });

    noteChordButton[1].addEventListener("click", () =>{
        createChordView();
    });
}