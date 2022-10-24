
let number = Math.floor((Math.random() * 100 ) + 1);

console.log(number);

let guesses = 0;
let inputNumber = 0;

function cliked () {

let inputNumber = document.querySelector("input").value;
guesses++;


    if (inputNumber == number) {
        
        document.getElementById("numberOfGuesses").innerText = `Ai ghicit din ${guesses} incercari!`;
            
            if (guesses == 1) {
                document.getElementById("numberOfGuesses").innerText = `Ai ghicit din ${guesses} incercare!`;
            };

    } else if (inputNumber == "" || inputNumber == null){
        let text = document.createElement("p");
        document.querySelector("#messages").appendChild(text).innerText = "Va rog sa introduceti un numar!";
    
    } else if (inputNumber > number) {

        let text = document.createElement("p");
        document.querySelector("#messages").appendChild(text).innerText = "Numarul introdus este prea mare!";
        // document.getElementById("message").innerText = "Numarul introdus este prea mare!";

    } else if (inputNumber < number) {

        let text = document.createElement("p");
        document.querySelector("#messages").appendChild(text).innerText = "Numarul introdus este prea mic!";
        //document.getElementById("message").innerText = "Numarul introdus este prea mic!";

    } 

};

function indiciu () {

    numberInterval = number.toString();
    numberInterval = numberInterval.padStart(2, '0');
    
    numberInterval = numberInterval.slice(0, 1); 
    numberInterval = parseInt(numberInterval);

    switch (numberInterval) {
        case 0 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 0 si 10.";
        break;
        case 1 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 10 si 20.";
        break;
        case 2 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 20 si 30.";
        break;
        case 3 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 30 si 40.";
        break;
        case 4 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 40 si 50.";
        break;
        case 5 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 50 si 60.";
        break;
        case 6 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 60 si 70.";
        break;
        case 7 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 70 si 80.";
        break;
        case 8 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 80 si 90.";
        break;
        case 9 : 
        document.getElementById("indiciu").innerText = "Numarul este cuprins intre 90 si 100.";
        break;
    }
     
};

function reset () {
    window.location.reload();
};

function inapoi() {
    location.href="index.html"
}