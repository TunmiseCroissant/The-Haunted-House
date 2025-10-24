// set up the document elements
let dialogueBox = document.getElementById("dialogue");
let replyBox = document.getElementById("replies");
let currentLine = document.getElementById("currentLine");

class Dialogue {
    constructor(lines, replies) {
        this.lines = lines,
        this.replies = replies
        this.index = 0
        this.ResponeLines = []
        this.ReponseIndex = 0
        this.usingResponseLines = false
        this.running = false
    }

    // starts the dialogue
    startDialogue() {
        this.index = 0
        currentLine.innerText = this.lines[this.index]
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
                        currentLine.innerText = this.lines[this.index]
                    }
                    this.checkLinesToUse()

            } else if (this.usingResponseLines) {
                if (this.ReponseIndex === this.ResponeLines.length - 1) {
                        if (this.index === this.lines.length - 1) {
                            dialogueBox.style.display = "none"
                        } else {
                            this.usingResponseLines = false
                            this.index++
                            currentLine.innerText = this.lines[this.index]
                            this.checkLinesToUse()
                        }
                    } else if (this.running) {
                        this.ReponseIndex++
                        currentLine.innerText = this.ResponeLines[this.ReponseIndex]
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
                    currentLine.innerText = this.ResponeLines[0]
                    replyBox.innerHTML = ""
                })
            })
        }
    }

}


// Generating reply object from an array of replies

let generateDialogueReplies = (replies) => {
    const Returnreplies = new Map()
    Object.keys(replies).forEach((reply) => {
        Returnreplies.set(reply, turnToObject(replies[reply]))
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

const D1 = new Dialogue(["your mom", "your dad", "your cat"], generateDialogueReplies(test2))

const test2 = {
    1: [["display this", "line after 1", "line after 2"], ["display this 2nd", "after you display 2", "after 2"]] 
    // the format for replies is the line number mapped to the array, the first item being the display text and everything after that is lines after that
}

D1.startDialogue()

// end test dialogue