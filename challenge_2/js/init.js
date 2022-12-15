import {
  getData
} from "./utilities.js";
import {Pokemon} from "./pokemon.js";
import {
  pageMenu
} from "./initMenu.js";
const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0s";
const btnGo = document.getElementById("btnGo");
const welcome = document.querySelector('.firstMenu');

/*****************************************************************/

const create = new Pokemon(getData);

async function displayData(dataApi) {
  const data = await getData(dataApi);
  create.renderListOptions(data.results);
}

function drawMenu() {
  const menu = pageMenu();
  document.querySelector('.main').appendChild(menu);
  displayData(url);
  //Here, I'm capturing the button and attaching an event.

  const save = document.getElementById("save");
  save.addEventListener("click", (e) => {
    e.preventDefault();
    create.saveTeam();
    console.log("GUARDADO");
  })
};

/*****************************************************************/
//EVENTS 
btnGo.addEventListener("click", () => {
  drawMenu();
  IntentoTres();
  welcome.classList.add('hidden');
  welcome.classList.remove('firstMenu');
});



// function eventListenerAddBtn() {
//   const addBtn = document.getElementById("add");
//   addBtn.addEventListener("click", (e) => {
//     e.preventDefault();
//     create.teamPreformation();
//   })
// }

/*****************************************************************/


function IntentoTres() {
  const name = document.getElementById("teamName");
  const addBtn = document.getElementById("add");
  const error = document.querySelector("#teamName + span.error");

  // As per the HTML Specification
  const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g;


  name.addEventListener("input", () => {
    if (name.value.length < 4) {
      name.className = "invalid";
      error.textContent = `The name must have at least 4 letters. You entered ${name.value.length}`;
      error.className = "error";

    } else {
      name.className = "valid";
      error.textContent = "";
      error.className = "error";
    }
  })


  addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const box = document.getElementById("output");
    if (name.value.length != 0 || regex.test(name.value) === true) {
      name.className = "valid";
      error.textContent = "";
      error.className = "error";
      create.teamPreformation();

    } else {
      name.className = "invalid";
      error.textContent = `Please, enter a name for the team. The name must only contain letters and/or spaces`;
      error.className = "error";
    }


    if (box.textContent == "") {
      box.innerHTML = "Please, choose a Pokemon";
    }


  })


};