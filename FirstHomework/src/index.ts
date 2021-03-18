import {Automobil} from "./automobil"

const naslov = document.createElement("h1");
naslov.innerHTML = "Ko voli nek izvoli!";
naslov.className = "naslov";

document.body.appendChild(naslov);

const garazaDiv = document.createElement("div");
garazaDiv.className = "garaza";


document.body.appendChild(garazaDiv);

const garaza = [];

garaza.push(new Automobil(1, "Volvo", 2000, "Benzinac", 140));
garaza.push(new Automobil(2, "Jaguar", 2300, "Benzinac", 80));
garaza.push(new Automobil(3, "BMW", 2000, "Dizel", 220));
garaza.push(new Automobil(4, "Citroen", 2000, "Dizel", 270));
garaza.push(new Automobil(5, "FIat", 1400, "Benzinac", 180));

garaza.forEach( vozilo => {
    vozilo.showInfo(garazaDiv);
} )
