
export const modalContainer = document.getElementById("modal");
export const modal = document.querySelectorAll(".modal-child")[0];
export const goBack = document.getElementById("go-back");
export const saveTeam = document.getElementById("save-option");
export const editTeam = document.getElementById("edit-option");
export const deleteTeam = document.getElementById("delete-option");

goBack.addEventListener("click", hiddenModal);

export function hiddenModal() {
    modal.classList.remove("close");
    setTimeout(() => {
        modalContainer.style.opacity = "0";
        modalContainer.style.visibility = "hidden";

    }, 200);
}

export async function ToJSON(params) {
    try {
        const response = await fetch(params);
        if (!response.ok) {
            throw Error(response.statusText);
        } else{
            const fetchJson = await response.json();
            return fetchJson;
        }
    } catch (error) {
         console.log(error);
    }
}

export function getData(dataApi) {
    return ToJSON(dataApi);
}

export function writeInLocalStorage(name, data) {
    localStorage.setItem(name, JSON.stringify(data));
    
}

export function getFromLocalStorage(name) {
    //localStorage.getItem(name, JSON.parse(data));
    return JSON.parse(localStorage.getItem(name));
}

export function removeFromLocalStorage(data) {
    localStorage.removeItem(data);
}