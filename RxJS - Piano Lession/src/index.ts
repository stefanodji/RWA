import { intervalForHomePageText } from "./view/homePage";
import * as notesAndChords from "./view/notesAndChords/notesAndChords";
import { drawPiano } from "./view/piano";
import { addEventListenerPlayAndStopButton } from "./view/pianoAccessories/playAndStopButton";
import { addEventListenerLabeling } from "./view/pianoAccessories/labeling";
import { addEventListenerMetronome } from "./view/pianoAccessories/metronome";
import { createChordField } from "./view/notesAndChords/chords";


intervalForHomePageText();
notesAndChords.addEventListenersOnNoteAndChordButtons();
addEventListenerPlayAndStopButton();
addEventListenerLabeling();
addEventListenerMetronome();
notesAndChords.noterOrChordsFilter();
drawPiano();

