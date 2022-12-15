import Errors from "./errors.js";
import {
    writeInLocalStorage,
    getFromLocalStorage,
    modalContainer,
    modal,
    saveTeam,
    hiddenModal
} from "./utilities.js";


export class Pokemon {
    constructor(callback) {
        this.name = "";
        this.error = new Errors();
        this.callback = callback;
        this.singlePokemon = null;
        this.previusTeam = [];
        this.Teams = [];
        this.save = saveTeam;
        this.deleteBtn = document.getElementById("delete-option");

        this.indexTeamToRemove = "";

    }

    renderListOptions(data) {
        // Creating a fragment to avoid a reflow with every call or Foor-loop
        const fragment = document.createDocumentFragment();
        const pokemonSelector = document.getElementById("pokemon-list");

        data.forEach(param => {
            try {
                const option = document.createElement("option");
                option.value = param.name;
                option.text = param.name.toUpperCase();
                fragment.appendChild(option);
                this.eventListener(option, param);

            } catch (error) {
                this.error.handleError(error);
            }
        });

        pokemonSelector.appendChild(fragment);
        this.deleteBtn.addEventListener("click", () => {
            this.removeTeam();
            this.renderTeams();
        });
    }

    eventListener(element, pokemon) {
        element.addEventListener("click", () => {
            if (pokemon) {
                this.renderFullPokemon(pokemon);
            }
        });

    }
    //OJO con el async; Por ultimo usa .then()
    async renderFullPokemon(pokemon) {

        const output = document.getElementById("output");
        const pokemonDetails = await this.callback(pokemon.url);
        //console.log(pokemonDetails);

        const pokemonObj = {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            hp: pokemonDetails.stats[0].base_stat,
            attack: pokemonDetails.stats[1].base_stat,
            defense: pokemonDetails.stats[2].base_stat,
            picture: pokemonDetails.sprites.other.dream_world.front_default ||
                pokemonDetails.sprites.other.home.front_default ||
                pokemonDetails.sprites.other['official-artwork'].front_default
        }
        this.createTarget(pokemonObj, output);
        this.singlePokemon = pokemonObj;
    }

    createTarget(obj, parent) {

        const div = document.createElement("div");
        div.classList.add("pokemon-Target");
        div.innerHTML = `
        <div class="pokemon-img">
          <img class="Pokemon-class" src="${obj.picture}">
        </div>
        <div>
            <h4>${obj.name}</h4>
        </div>
        <div class="token">
            <div class="header">
                <span>Hp</span>
                <span>${obj.hp}</span>
            </div>
            <div class="header">
                <span>Attack</span>
                <span>${obj.attack}</span>
            </div>
            <div class="header">
                <span>Defense</span>
                <span>${obj.defense}</span>
            </div>
        </div>
        `;

        if (parent) {
            parent.innerHTML = "";
            parent.innerHTML = "Waiting for a response...";
            parent.innerHTML = "";
            parent.appendChild(div);
        } else {
            return div;
        }
    }

    teamPreformation() {

        this.previusTeam.push(this.singlePokemon);
        const previa = document.getElementById("previa");
        writeInLocalStorage("team", this.previusTeam);
        const recovery = getFromLocalStorage("team");
        previa.innerHTML = "";
        document.getElementById("output").innerHTML = "";
        recovery.forEach(element => {
            previa.appendChild(this.createTarget(element));
        });


    }

    saveTeam() {
        try {

            const info = {
                TeamName: document.getElementById("teamName").value
            }


            this.previusTeam.unshift(info);

            //verify if "teams" exists in localStorage.
            if (getFromLocalStorage("teams")) {

                const recovery = getFromLocalStorage("teams");
                recovery.unshift(this.previusTeam);
                writeInLocalStorage("teams", recovery);
                this.renderTeams();

            } else {
                const recovery = [];
                recovery.unshift(this.previusTeam);
                writeInLocalStorage("teams", recovery);
                this.renderTeams();
            }

            document.getElementById("teamName").value = "";

        } catch (error) {
            console.log(error);
        }

        //Removing past items from the Previus Team 
        this.previusTeam = [];
    }


    renderTeams() {
        // I get the section where the teams will be displayed
        const showTeams = document.getElementById("show-teams");
        showTeams.innerHTML = "";

        //I access the data from local storage to work with it
        const recovery = getFromLocalStorage("teams");
        previa.innerHTML = "";

        recovery.forEach(team => {

            const divTeam = document.createElement("div");
            divTeam.classList.add("group-team");
            //Here I am giving a index for reaching in the local Storage array by its index or position
            divTeam.positionIndex = `${recovery.indexOf(team)}`;
            const groupTitle = document.createElement("h3");
            groupTitle.innerHTML = `TEAM ${team[0].TeamName}`;
            divTeam.appendChild(groupTitle);

            // The lopp starts at index 1 because index 0 is the object containing the team Name
            for (let i = 1; i < team.length; i++) {
                const element = team[i];
                divTeam.appendChild(this.createTarget(element));

            }
            showTeams.appendChild(divTeam);

            this.teamOptionsEvent(divTeam, team);
        });
    }

    teamOptionsEvent(div, param) {

        div.addEventListener("click", () => {
            setTimeout(() => {
                div.classList.toggle("prueba");
            }, 100);
            div.classList.toggle("prueba");
            this.editTeam(param, div.positionIndex);
            console.log(div);
            this.indexTeamToRemove = div.positionIndex;
            console.log(this.indexTeamToRemove );
        });

    }

    editTeam(team, positionInParent) {

        this.save.disabled = true;

        modalContainer.style.visibility = "visible";
        modalContainer.style.opacity = "1";
        modal.classList.add("close");
        const titleTeam = document.getElementById("title-team");
        const optionsTeams = document.getElementById("options-team");
        optionsTeams.innerHTML = "";

        const fragment = document.createDocumentFragment();

        titleTeam.innerHTML = "";
        titleTeam.innerHTML = `Team: ${team[0].TeamName}`;


        for (let i = 1; i < team.length; i++) {
            const element = team[i];
            fragment.appendChild(this.createTarget(element));
        }
        optionsTeams.appendChild(fragment);

        for (let i = 0; i < optionsTeams.children.length; i++) {
            const element = optionsTeams.children[i];

            const btn = document.createElement("button");
            btn.classList.add("single-delete-boton");
            btn.textContent = "X";
      
            element.insertBefore(btn, element.getElementsByTagName("div")[0]); 
            
            btn.addEventListener("click", () => {
                this.save.disabled = false;
                element.classList.toggle("prueba");
                element.ElementPositionF = i;
                console.log(element.accessKey);
                this.removeOnlyOnePokemon(i, optionsTeams, positionInParent);
            });
        }


        

    }

    removeTeam() {
        try {
            if (getFromLocalStorage("teams")) {
                const get = getFromLocalStorage("teams");
                get.splice(this.indexTeamToRemove, 1);
                writeInLocalStorage("teams", get);
                hiddenModal();
                console.log(this.indexTeamToRemove);

            } 
        } catch (error) {
            console.log(error);
        }
    }

    removeOnlyOnePokemon(index, parent, indexParent){
        
        for (let i = 0; i < parent.children.length; i++) {
            const element = parent.children[i];
            if (element.ElementPositionF == index) {
                parent.removeChild(element);
            }
        }

        
        this.save.onclick = () => {
            const pokeRemoved = getFromLocalStorage("teams");
            pokeRemoved[indexParent].splice(index + 1 , 1);
            writeInLocalStorage("teams", pokeRemoved);
            this.renderTeams();
            hiddenModal();
        }
    }
}


