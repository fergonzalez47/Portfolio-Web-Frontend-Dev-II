export function pageMenu() {
    const menu = document.createElement("section");
    menu.classList.add("section-form");
    menu.innerHTML = `
    <form class="form">
        <div class="div-name">
          <div>
             <label for="teamName">Name for the Team: </label>
          </div>
          <div>
            <input type="text" required id="teamName" placeholder="Enter the team name" minlength="4" maxlength="16">
            <span class="error" aria-live="polite"></span>
          </div>
        </div>

        <div class="div-select">
            <div><label for="pokemon-name">Choose Your pokemon</label></div>
            <div>
              <select name='pokemon-name' id='pokemon-list'>
                <option value='' selected>Choose a Pokemon</option>
              </select>
            </div>
        </div>
        <section class="section-show">
        <div id="output"></div>
      </section>
        <div class="control-adding">
          <button id="add">Add</button>
          <button id="save">Save Team</button>
        </div>

    </form>
    <section id="previa">
    </section>
    `;

    return menu;
}

export function verifyInput() {
  const inputName = document.getElementById("teamName");
  events(inputName);
}


function events(input) {
  input.addEventListener("keyup", () => {

  })
}