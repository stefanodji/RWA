import { defer, fromEvent, interval, map, merge, Observable, Subject, Subscription, switchMap, takeUntil } from "rxjs";
import { playNote } from "../notesAndChords/notes";

const pathToMetronomeTone = "../../../notesMetronome/metronomeSound.wav";
let initialMetronomeIsSubscribed = false;

export function addEventListenerMetronome(){

    mergerObservablesSlowDownAndSpeedUp();

    const metronomeMain = document.getElementById("metronomeMain");

    metronomeMain.addEventListener("click", () => {
        metronomeMainDivCliked();
    })
}

let beepsPerMinute: number = 120;

let slowDownObervable: Observable<any>;

let speedUpObervable: Observable<any>;


function addObservableMetronomeSlowDown(){
    const metronomeSlowDown = document.getElementById("metronomeSlowDown");
    slowDownObervable = fromEvent(metronomeSlowDown, "click").pipe(
        map(() => {
            return newBeepsBerMinuteValue("-");
        })
    );
    return slowDownObervable;
}

function addObservableMetronomeSpeedUp(){
    const metronomeSpeedUp = document.getElementById("metronomeSpeedUp");
    speedUpObervable = fromEvent(metronomeSpeedUp, "click").pipe(
        map(() => {
            return newBeepsBerMinuteValue("+");
        })
    );
    return speedUpObervable;
}

function newBeepsBerMinuteValue(minusPlusDiv: string){
    const metronomeOnOffText = document.getElementById("metronomeOnOff").innerHTML;
    if(metronomeOnOffText == "Off"){
        return beepsPerMinute;
    }else{
        if (initialMetronomeIsSubscribed){
            initialMetronomeIsSubscribed = false;
            startingSubscriptionInterval.unsubscribe();
        }

        const bpmDiv = document.getElementById("beepPerMinuteDiv");

        if(minusPlusDiv == "-"){
            slowDonwBeeps();
            bpmDiv.innerHTML = `${beepsPerMinute} bpm`;
        }else{
            speedUpBeeps();
            bpmDiv.innerHTML = `${beepsPerMinute} bpm`;
        }
    }
    return beepsPerMinute;
}

function slowDonwBeeps(){
    if(beepsPerMinute > 20){
        beepsPerMinute -= 10;
    }
    else{
        alert("Can't slow down more buddy :(");
    }
}

function speedUpBeeps(){
    if(beepsPerMinute < 260){
        beepsPerMinute += 10;
    }
    else{
        alert("Can't speed up more buddy :(");
    }
}

let minusPlusObservable: Observable<any>;
let minusPlusSubscription: Subscription;

function mergerObservablesSlowDownAndSpeedUp(){
    minusPlusObservable = merge(
        addObservableMetronomeSlowDown(),
        addObservableMetronomeSpeedUp()
    ).pipe(
        switchMap((beepsValue) => intervalObservable(beepsValue))
    );
}

function intervalObservable(beepsValue: number){
    console.log("Metronome speed: " + beepsValue + "bpm");
    beepsValue = 60/beepsValue*1000;
    return interval(beepsValue).pipe(
        map(() => playNote(pathToMetronomeTone))
    );
}

const startingObservableInterval = interval(500).pipe(
    map(() => {
        playNote(pathToMetronomeTone);
    })
);
let startingSubscriptionInterval: Subscription;


function metronomeMainDivCliked(){
    const metronomeOnOff = document.getElementById("metronomeOnOff");

    const metronomeDiv = document.getElementById("metronomeDiv");
    const bpmDiv = document.createElement("div");
    bpmDiv.id = "beepPerMinuteDiv";
    bpmDiv.innerHTML = "120 bpm";

    if(metronomeOnOff.innerHTML == "Off"){
        metronomeOnOff.innerHTML = "On";
        initialMetronomeIsSubscribed = true;
        startingSubscriptionInterval = startingObservableInterval.subscribe();
        console.log("Metronome speed: 120bpm");
        minusPlusSubscription = minusPlusObservable.subscribe();
        metronomeDiv.appendChild(bpmDiv);
    }else{
        metronomeOnOff.innerHTML = "Off";
        minusPlusSubscription.unsubscribe();
        startingSubscriptionInterval.unsubscribe();
        initialMetronomeIsSubscribed = false;
        document.getElementById("beepPerMinuteDiv").remove();
    }

}