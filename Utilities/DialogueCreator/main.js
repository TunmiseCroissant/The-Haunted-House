const dialogues = JSON.parse(localStorage.getItem("dialogues")) || {};
const popUp = document.getElementById("popUp");
let currentDialogue;
currentIndex = 0;
currentLine = null
type = "line"
let CurrentreplyIndex = 0;

const LoadDialoguesFromStorage = () => {

}

class Dialogue {
    constructor (name, speakers) {
        this.name = name
        this.speakers = speakers
        this.lines = []
        this.replies = {}
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
        let NewName = NewDialogue.get("DialogueName").replaceAll(/\s+/g, "-")
        let Speakers = NewDialogue.get("Speakers").split(",").map(item => item.trim()).filter(item => item);
        let filteredSpeakers = []
        Speakers.forEach(speaker => {
            if (!filteredSpeakers.includes(speaker)) {
                filteredSpeakers.push(speaker)
            }
        })
        dialogues[NewName] = new Dialogue(NewName, filteredSpeakers)
        currentDialogue = dialogues[NewName]
        showEditor("empty")
        setTitle()
        popUp.close()
        refreshSelector()
    })
}

const setTitle = () => {
    document.getElementById("DialogueTitle").innerText = currentDialogue.name.replaceAll("-", " ")
}

const refreshSelector = () => {
    let DialogueOptions = ""
    Object.keys(dialogues).forEach((key) => {
        DialogueOptions += `<option value = "${key}">${key.replaceAll("-", " ")}</option>`
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
    let empty = document.getElementById("Empty")
    let replyEditor = document.getElementById("replyEditor")
    let LineEditor = document.getElementById("LineEditor")
    let lineType = document.getElementById("lineType")
    let lineTypeLabel = document.getElementById("lineTypeLabel")
    if (editor.toLowerCase() === "empty") {
        empty.style.display = "flex"
        replyEditor.style.display = "none"
        LineEditor.style.display = "none"
        lineType.style.display = "none"
        lineTypeLabel.style.display = "none"
    } else if (editor.toLowerCase() === "line" || editor.toLowerCase() == "replyLine") {
        empty.style.display = "none"
        replyEditor.style.display = "none"
        LineEditor.style.display = "flex"
        lineType.style.display = "inline"
        lineTypeLabel.style.display = "inline"
    } else if (editor.toLowerCase() === "reply") {
        empty.style.display = "none"
        replyEditor.style.display = "flex"
        LineEditor.style.display = "none"
        lineType.style.display = "inline"
        lineTypeLabel.style.display = "inline"
    }
 }

 const refreshDialogueLines = () => {
    document.getElementById("dialogue").innerHTML = ""

    currentDialogue.lines.forEach((dialogue) => {
        let Element = document.createElement("p")
        Element.innerText = `${dialogue[0]}: ${dialogue[1]}`
        Element.index = currentDialogue.lines.indexOf(dialogue)
        if (Element.index == currentIndex && type == "line") {
            if (currentLine) currentLine.classList.remove("selected")
            currentLine = Element
            Element.classList.add("selected")
        }
        Element.addEventListener("click", (e) => {
            currentIndex = e.target.index

            if (currentLine && currentLine != Element) {
                currentLine.classList.remove("selected")
            }

            currentLine = Element
            Element.classList.add("selected")

            type = "line"

            document.getElementById("replyLineOption").style.display = "none"

        })
        document.getElementById("dialogue").appendChild(Element)

        if (currentDialogue.replies.hasOwnProperty(Element.index)) {
            currentDialogue.replies[Element.index].forEach((reply) => {
                let ReplyDetail = document.createElement("details")
                let ReplySummary = document.createElement("summary")
                ReplySummary.innerText = reply.displayText
                ReplyDetail.index = currentDialogue.replies[Element.index].indexOf(reply)
                ReplyDetail.appendChild(ReplySummary)
                
                document.getElementById("dialogue").appendChild(ReplyDetail)

                if (CurrentreplyIndex == ReplyDetail.index && type == "reply") {
                    currentIndex = Element.index
                    currentLine.classList.remove("selected")
                    currentLine = ReplyDetail
                    ReplyDetail.classList.add("selected")
                    document.getElementById("replyLineOption").style.display = "inline"
                }

                ReplySummary.addEventListener("click", () => {
                    currentIndex = Element.index
                    currentLine.classList.remove("selected")
                    currentLine = ReplyDetail
                    ReplyDetail.classList.add("selected")
                    type = "reply"

                    CurrentreplyIndex = ReplyDetail.index

                   document.getElementById("replyLineOption").style.display = "inline"
                })
            })
        }
    })
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
    currentDialogue.lines.splice(currentIndex + 1, 0, [NewLine.get("speaker"), NewLine.get("line")])
    currentIndex++
    refreshDialogueLines()
 })

 document.getElementById("lineType").addEventListener("change", (event) => {
    showEditor(event.target.value)
 })

 document.getElementById("newReply").addEventListener("submit", (event) => {
    event.preventDefault()

    let ReplyName = document.getElementById("displayText").value

    if (!currentDialogue.replies.hasOwnProperty(currentIndex)) {
        currentDialogue.replies[currentIndex] = [{displayText: ReplyName, linesAfter: []}]
    } else {
        currentDialogue.replies[currentIndex].push({displayText: ReplyName, linesAfter: []})
    }

    refreshDialogueLines()

 })