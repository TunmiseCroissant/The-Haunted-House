const dialogues = JSON.parse(localStorage.getItem("dialogues")) || {};
const popUp = document.getElementById("popUp");


const LoadDialoguesFromStorage = () => {

}

class Dialogue {
    constructor (speakers) {
        this.speakers = speakers
    }

}

const addDialogue = () => {
    popUp.showModal()
    document.getElementById("cancelButton").addEventListener("click", () => {
        popUp.close();
    })
    document.getElementById("NewDialogue").addEventListener("submit", () => {
        event.preventDefault();

        let NewDialogue = new FormData(document.getElementById("NewDialogue"))
        let Speakers = NewDialogue.get("Speakers").split(",").map(item => item.trim()).filter(item => item);
        let filteredSpeakers = []
        Speakers.forEach(speaker => {
            if (!filteredSpeakers.includes(speaker)) {
                filteredSpeakers.push(speaker)
            }
        })
        dialogues[NewDialogue.get("DialogueName")] = new Dialogue(filteredSpeakers)
        console.log(filteredSpeakers)
        popUp.close()
        refreshSelector()
    })
}

const refreshSelector = () => {
    let DialogueOptions = ""
    Object.keys(dialogues).forEach((key) => {
        DialogueOptions += `<option>${key}</option>`
    })
    document.getElementById("SelectDialogue").innerHTML = DialogueOptions
}

Object.keys(dialogues).length === 0 ? addDialogue() : LoadDialoguesFromStorage()
