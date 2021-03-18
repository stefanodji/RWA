export class Automobil {

    id: number;
    marka: string;
    kubikaza: number;
    vrsta: string;
    kilometraza: number;
    container: HTMLElement;

    constructor(id: number, marka: string, kubikaza: number, vrsta: string, kilometraza: number){
        
        this.id = id;
        this.marka = marka;
        this.vrsta = vrsta;
        this.kubikaza = kubikaza;
        this.kilometraza = kilometraza;
    }


    showInfo(garazaDIv: HTMLElement){
        this.container = document.createElement("div");
        this.container.className = "kockica";

        var divce1 = document.createElement("div");
        divce1.innerHTML = `Id: ${this.id}`;

        var divce2 = document.createElement("div");
        divce2.innerHTML = `Marka: ${this.marka}`;

        var divce3 = document.createElement("div");
        divce3.innerHTML = `Kubikaza: ${this.kubikaza} cc`;

        var divce4 = document.createElement("div");
        divce4.innerHTML = `Vrsta: ${this.vrsta}`;

        var divce5 = document.createElement("div");
        divce5.innerHTML = `Kilometraza: ${this.kilometraza} km`;

        var dugmeKupi = document.createElement("button");
        dugmeKupi.innerHTML = "Kupi";
        dugmeKupi.className = "dugme";
        dugmeKupi.addEventListener("click", () => {
            confirm(`Kupili ste ${this.marka}!!!! Trci kod mehanicara odmah`);
        })

        this.container.appendChild(divce1);
        this.container.appendChild(divce2);
        this.container.appendChild(divce3);
        this.container.appendChild(divce4);
        this.container.appendChild(divce5);
        this.container.appendChild(dugmeKupi);

        garazaDIv.appendChild(this.container);

    }
}