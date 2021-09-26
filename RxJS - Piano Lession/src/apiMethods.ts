import { from, Observable } from "rxjs";
import { API_URL } from "../env";
import { Chord } from "./models/chord";
import { Note } from "./models/note";

export function getNotesObservables(): Observable<Note[]>{
    return from(
        fetch(`${API_URL}/notes/`).then((response) => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error("Notes Not Found");
            }
        }).catch(err => console.log("Error: " + err))
    );
}

export function getNotesObservablesByName(noteName: string): Observable<Note[]>{
    return from(
        fetch(`${API_URL}/notes/?name_like=${noteName}`).then((response) => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error("Notes Not Found");
            }
        }).catch(err => console.log("Error: " + err))
    );
}

export function getNoteObservableByKeyAssigned(keyAssigned: string): Observable<Note[]>{
    return from(
        fetch(`${API_URL}/notes/?keyAssigned=${keyAssigned}`).then((response) => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error("Notes Not Found");
            }
        }).catch(err => console.log("Error: " + err))
    );
}

export function getChordsObservables(): Observable<Chord[]>{
    return from(
        fetch(`${API_URL}/chords/`).then((response) => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error("Chords Not Found");
            }
        }).catch(err => console.log("Error: " + err))
    );
}

export function getChordsObservablesByName(chordName: string): Observable<Chord[]>{
    return from(
        fetch(`${API_URL}/chords/?name_like=${chordName}`).then((response) => {
            if (response.ok){
                return response.json();
            }else{
                throw new Error("Chords Not Found");
            }
        }).catch(err => console.log("Error: " + err))
    );
}