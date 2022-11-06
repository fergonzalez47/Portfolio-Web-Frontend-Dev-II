//DEFINING CONSTANTS 
const output = document.getElementById("output");
const boton = document.getElementById("showButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const tableParent = document.getElementById("tableParent");


boton.addEventListener("click", (e) => {
    e.preventDefault();
    displayData();
}, false);


//THE GENERAL API URL.

const urlAll = {

    films: "https://swapi.dev/api/films/",
    people: "https://swapi.dev/api/people/",
    planets: "https://swapi.dev/api/planets/",
    species: "https://swapi.dev/api/species/",
    starships: "https://swapi.dev/api/starships/",
    vehicles: "https://swapi.dev/api/vehicles/"

}


// STARTING WITH THE CODE AND RECOVERY DATA

async function toJSON(params) {
    try {
        const response = await fetch(params);
        if (!response.ok) {
            throw Error(response.statusText);
        } else {
            const fetchJson = await response.json();
            return fetchJson;
        }
    } catch (error) {
        console.log(error);
    }
}

function getData(url) {
    return toJSON(url);
}


async function displayData(urlData = urlAll.people) {
    const data = await getData(urlData);
    console.log(data);
    tableParent.innerHTML = "Waiting response...";
    tableParent.innerHTML = "";
    tableParent.innerHTML = `
    <tr>
    <th>Name</th>
    <th>Eye color</th>
    <th>birth year</th>
    </tr>
  `;
    createElement(data.results);


    //

    if (data.next) {
        nextButton.addEventListener("click", (e) => {
            e.preventDefault();

            otherPage(data.next);
        }, false);
    }
    if (data.previous) {
        prevButton.addEventListener("click", (e) => {
            e.preventDefault();

            otherPage(data.previous);
        }, false);
    }

    const persons = document.getElementsByClassName("element");

    for (let i = 0; i < persons.length; i++) {
        const element = persons[i];
        element.addEventListener("click", () => {

            ShowOne(data.results[i]);
        });


    }



    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        
    }
}


function createElement(param) {
    param.forEach(element => {
        const li = document.createElement("tr");
        li.classList.add("element");
        li.innerHTML = `

          <tr>
        <td>${element.name}</td>
        <td>${element.eye_color}</td>
        <td>${element.birth_year}</td>
         </tr>`;
        tableParent.appendChild(li);
    });

}

function otherPage(data) {
    if (data) {
        displayData(data);
    }
}



function ShowOne(response) {
    tableParent.innerHTML = "";
    const div = document.createElement("div");
    div.innerHTML = `
        <p> Name : ${response.name}</p>
        <p> Birth year : ${response.birth_year}</p>
        <p> Hair color : ${response.hair_color}</p>
        <p> Gender ${response.gender}</p>
        <p> Height : ${response.height}</p>`;
    tableParent.appendChild(div);
}