const dialogues = JSON.parse(localStorage.getItem("dialogues")) || {};
const popUp = document.getElementById("popUp");
let currentDialogue;

const LoadDialoguesFromStorage = () => {

}

class Dialogue {
    constructor (name, speakers) {
        this.name = name
        this.speakers = speakers
        this.lines = []
    }

}

const addDialogue = () => {
    popUp.showModal()
    document.getElementById("cancelButton").addEventListener("click", () => {
        if (!Object.keys(dialogues).length === 0) popUp.close();
    })
    document.getElementById("NewDialogue").addEventListener("submit", (event) => {
        event.preventDefault();

        let NewDialogue = new FormData(document.getElementById("NewDialogue"))
        let Speakers = NewDialogue.get("Speakers").split(",").map(item => item.trim()).filter(item => item);
        let filteredSpeakers = []
        Speakers.forEach(speaker => {
            if (!filteredSpeakers.includes(speaker)) {
                filteredSpeakers.push(speaker)
            }
        })
        dialogues[NewDialogue.get("DialogueName")] = new Dialogue(NewDialogue.get("DialogueName"), filteredSpeakers)
        currentDialogue = dialogues[NewDialogue.get("DialogueName")]
        showEditor("empty")
        setTitle()
        popUp.close()
        refreshSelector()
    })
}

const setTitle = () => {
    document.getElementById("DialogueTitle").innerText = currentDialogue.name
}

const refreshSelector = () => {
    let DialogueOptions = ""
    Object.keys(dialogues).forEach((key) => {
        DialogueOptions += `<option value = "${key}">${key}</option>`
    })
    document.getElementById("SelectDialogue").innerHTML = DialogueOptions
    document.getElementById("SelectDialogue").value = currentDialogue.name

    let SpeakerOptions = ""
    currentDialogue.speakers.forEach(key => {
        SpeakerOptions += `<option value = "${key}">${key}</option>`
    })
    
    document.getElementById("lineEditorSpeaker").innerHTML = SpeakerOptions
    document.getElementById("EmptyFormSpeaker").innerHTML = SpeakerOptions
}

Object.keys(dialogues).length === 0 ? addDialogue() : LoadDialoguesFromStorage()

 document.getElementById("SelectDialogue").addEventListener("change", (e) => {
    console.log(e.target.value)
    setTitle()
 })

 const showEditor = (editor = "line") => {
    if (editor.toLowerCase() === "empty") {
        document.getElementById("Empty").style.display = "flex"
        document.getElementById("replyEditor").style.display = "none"
        document.getElementById("LineEditor").style.display = "none"
        document.getElementById("lineType").style.display = "none"
        document.getElementById("lineTypeLabel").style.display = "none"
    } else if (editor.toLowerCase() === "line") {
        document.getElementById("Empty").style.display = "none"
        document.getElementById("replyEditor").style.display = "none"
        document.getElementById("LineEditor").style.display = "flex"
        document.getElementById("lineType").style.display = "inline"
        document.getElementById("lineTypeLabel").style.display = "inline"
    } else if (editor.toLowerCase() === "reply") {
        document.getElementById("Empty").style.display = "none"
        document.getElementById("replyEditor").style.display = "flex"
        document.getElementById("LineEditor").style.display = "none"
        document.getElementById("lineType").style.display = "inline"
        document.getElementById("lineTypeLabel").style.display = "inline"
    }
 }

 const refreshDialogueLines = () => {
    let DialogueHTML = ""
    currentDialogue.lines.forEach(([speaker, line]) => {
        DialogueHTML += `<p>${speaker}: ${line}</p>`
    })
    document.getElementById("dialogue").innerHTML = DialogueHTML
 }

 document.getElementById("EmptyForm").addEventListener("submit", (event) => {
    event.preventDefault()

    let NewLine = new FormData(document.getElementById("EmptyForm"))
    currentDialogue.lines.push([NewLine.get("speaker"), NewLine.get("line")])
    refreshDialogueLines()
    showEditor()
 })

 document.getElementById("LineEditorForm").addEventListener("submit", (event) => {
    event.preventDefault()

    let NewLine = new FormData(document.getElementById("LineEditorForm"))
    currentDialogue.lines.push([NewLine.get("speaker"), NewLine.get("line")])
    refreshDialogueLines()
 })