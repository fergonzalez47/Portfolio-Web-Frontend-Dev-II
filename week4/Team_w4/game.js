const Cuadros = document.getElementsByTagName('div');
const player = document.getElementsByClassName("player");
const table = document.getElementsByClassName("gaming");

let contador = 0;

function Contadora() {
    contador++;
    console.log(contador);
}




function Dibujar(event) {
    event.target.classList.add('marked');

    if (contador % 2 == 0 && event.target.innerHTML == "") {
        event.target.innerHTML = "X";
        
    } else if (contador % 2 != 0 && event.target.innerHTML == ""){
        event.target.innerHTML = "O";
    }
    console.log("Click");
    Contadora();
}


Cuadros[0].addEventListener("click", Dibujar);
Cuadros[1].addEventListener("click", Dibujar);
Cuadros[2].addEventListener("click", Dibujar);
Cuadros[3].addEventListener("click", Dibujar);
Cuadros[4].addEventListener("click", Dibujar);
Cuadros[5].addEventListener("click", Dibujar);
Cuadros[6].addEventListener("click", Dibujar);
Cuadros[7].addEventListener("click", Dibujar);
Cuadros[8].addEventListener("click", Dibujar);






function LimpiarCuadros() {
    for (const value of Cuadros) {
        if(value.innerHTML != ""){
            value.innerHTML = "";
        };
    }
    
}


const clean = document.getElementById("clean");
clean.addEventListener("click", LimpiarCuadros);