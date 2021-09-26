import { fromEvent, map, Subscription, switchMap } from "rxjs";
import { getNoteObservableByKeyAssigned } from "../../apiMethods";
import { Note } from "../../models/note";
import { playNote } from "../notesAndChords/notes";

let playAndStopSubscription1: Subscription;
let playAndStopSubscription2: Subscription;

export function addEventListenerPlayAndStopButton() {
  const playAndStopButton = document.getElementById("playAndStopButton");

  playAndStopButton.addEventListener("click", () => {
    playAndStopButtonCliked(playAndStopButton);
  });
}

function playAndStopButtonCliked(playAndStopButton: HTMLElement) {
  if (playAndStopButton.innerHTML === "Play Now") {
    getKeyboardInputKeydown();
    getKeyboardInputKeyup();
    playAndStopButton.innerHTML = "Stop";
  } else {
    playAndStopSubscription1.unsubscribe();
    playAndStopSubscription2.unsubscribe();
    playAndStopButton.innerHTML = "Play Now";
  }
}

function getKeyboardInputKeydown() {
  playAndStopSubscription1 = fromEvent(document, "keydown")
    .pipe(
      map((ev: KeyboardEvent) => ev.key),
      switchMap((keyPressed) => getNoteObservableByKeyAssigned(keyPressed)),
      map((noteArray) => noteArray[0])
    )
    .subscribe((note: Note) => {
      playNote(note.pathToNote);
      makeKeyDivShineForInputKeys(document.getElementById(`${note.id}`));
    });
}

function getKeyboardInputKeyup() {
  playAndStopSubscription2 = fromEvent(document, "keyup")
    .pipe(
      map((ev: KeyboardEvent) => ev.key),
      switchMap((keyReleased) => getNoteObservableByKeyAssigned(keyReleased)),
      map((noteArray) => noteArray[0])
    )
    .subscribe((note: Note) => {
      unmakeKeyDivShine(document.getElementById(`${note.id}`));
    });
}

export function makeKeyDivShine(keyDiv: HTMLElement) {
  const shineDiv = document.createElement("div");
  shineDiv.className = "shineDiv";
  keyDiv.appendChild(shineDiv);
  setTimeout(() => {
    keyDiv.removeChild(shineDiv);
  }, 2300);
}

function makeKeyDivShineForInputKeys(keyDiv: HTMLElement) {
  const shineDiv = document.createElement("div");
  shineDiv.className = "shineDiv";
  keyDiv.appendChild(shineDiv);
}

const pianoContainer = document.getElementById("pianoContainer");

function unmakeKeyDivShine(keyDiv: HTMLElement) {
  let allRemovingNodes = pianoContainer.querySelectorAll(".shineDiv");
  for (let i = 0; i < allRemovingNodes.length; i++) {
    allRemovingNodes[i].remove();
  }
}
