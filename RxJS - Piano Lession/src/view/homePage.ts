import { interval, take } from "rxjs";

export function intervalForHomePageText(){
    interval(1000).pipe(
        take(5)
    ).subscribe(seconds => {
        //console.log("Sekunde:" + seconds);
        if (seconds == 4){
            changeHomePageText();
        }
    })
}

function changeHomePageText(){
    const homePageText = document.getElementById("homePageText");
    homePageText.innerHTML="Let's get started immediately!";
    homePageText.style.animation = "fadeIn 2s";
    homePageText.style.opacity = "1";
}