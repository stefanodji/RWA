import { Note } from "./note";

export interface Chord{
    id: number;
    name: string;
    notesAssigned: Array<Note>
}