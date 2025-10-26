// set up the document elements
let dialogueBox = document.getElementById("dialogue");
let replyBox = document.getElementById("replies");
let currentLine = document.getElementById("SpeakerDialogue");
let speaker = document.getElementById("speakerLine");


class Dialogue {
    constructor(dialogue) {
        this.lines = dialogue.lines,
        this.replies = generateDialogueReplies(dialogue.replies)
        this.index = 0
        this.ResponeLines = []
        this.ReponseIndex = 0
        this.usingResponseLines = false
        this.running = false
    }

    // starts the dialogue
    startDialogue() {
        this.index = 0
        speaker.innerText = this.lines[this.index][0]
        currentLine.innerText = this.lines[this.index][1]
        dialogueBox.style.display = "flex"
        this.usingResponseLines = false
        this.checkLinesToUse()
        this.running = true
        currentLine.addEventListener("click", () => {
            if (!this.usingResponseLines) {
                    if (this.index === this.lines.length - 1) {
                        dialogueBox.style.display = "none"
                    } else {
                        this.index++
                        speaker.innerText = this.lines[this.index][0]
                        currentLine.innerText = this.lines[this.index][1]
                    }
                    this.checkLinesToUse()

            } else if (this.usingResponseLines) {
                if (this.ReponseIndex === this.ResponeLines.length - 1) {
                        if (this.index === this.lines.length - 1) {
                            dialogueBox.style.display = "none"
                        } else {
                            this.usingResponseLines = false
                            this.index++
                            speaker.innerText = this.lines[this.index][0]
                            currentLine.innerText = this.lines[this.index][1]
                            this.checkLinesToUse()
                        }
                    } else if (this.running) {
                        this.ReponseIndex++
                        currentLine.innerText = this.ResponeLines[this.ReponseIndex][1]
                        speaker.innerText = this.ResponeLines[this.ReponseIndex][0]
                    }
            }
        })
    }

    //checks if using reply lines or normal lines
    checkLinesToUse() {
        this.StringIndex = this.index.toString()
        if (this.replies.has(this.StringIndex)) {
            this.usingResponseLines = true
            this.running = false
            replyBox.innerHTML = ""
            this.replies.get(this.StringIndex).forEach((reply) => {
                this.response = document.createElement("div")
                this.response.className = "reply"
                this.response.innerHTML = reply.displayText
                replyBox.appendChild(this.response)
                this.response.addEventListener("click", () => {
                    this.running = true
                    this.ResponeLines = reply.linesAfter
                    this.ReponseIndex = 0
                    currentLine.innerText = this.ResponeLines[this.ReponseIndex][1]
                    speaker.innerText = this.ResponeLines[this.ReponseIndex][0]
                    replyBox.innerHTML = ""
                })
            })
            replyBox.style.display = "flex"
        }
    }

}


// Generating reply object from an array of replies

let generateDialogueReplies = (replies) => {
    const Returnreplies = new Map()
    Object.keys(replies).forEach((reply) => {
        Returnreplies.set(reply, replies[reply])
    })

    return Returnreplies
}

let turnToObject = (array) => {
    let ReturnObject = [];
    array.forEach((item) => ReturnObject.push({displayText: item[0], linesAfter: item.slice(1)}))
    return ReturnObject
}

// End.

// test dialogue

const test1 = {
    lines: [["David", "hi"], ["David", "bye"]],
    replies: {
        1: [
            {displayText: "show me", linesAfter: [["Bob", "Hello"], ["Dad", "I know"]]},
            {displayText: "Also this", linesAfter: [["Mom", "No"], ["Mom", "why"]]}
        ]
    }
}

const D2 = new Dialogue(test1)

D2.startDialogue()


// end test dialogue