const dialogues = JSON.parse(localStorage.getItem("dialogues")) || [];
const popUp = document.getElementById("popUp");


const LoadDialoguesFromStorage = () => {

}

const addDialogue = () => {
    popUp.showModal()
    document.getElementById("cancelButton").addEventListener("click", () => {
        popUp.close();
    })
}

dialogues.length === 0 ? addDialogue() : LoadDialoguesFromStorage()
