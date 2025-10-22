let dialogueBox = document.getElementById("dialogue");
let replyBox = document.getElementById("replies");
let currentLine = document.getElementById("currentLine");

class Dialogue {
    constructor(lines, replies) {
        this.lines = lines,
        this.replies = replies
        this.index = 1
    }

    checkForReplies() {
        if (this.replies.has(this.index.toString())) {
            replyBox.innerHTML = ""
            this.replies.get(this.index.toString()).forEach((reply) => {
                let response = document.createElement("div")
                response.className = "reply"
                response.innerHTML = reply.displayText
                replyBox.appendChild(response)
            })
        }
    }

    startDialogue() {
        this.index = 0
        currentLine.innerText = lines[0]
        dialogueBox.style.display = "flex"
    }
}


const test2 = {
    1: [["display this", "line after 1", "line after 2"], ["display this 2nd", "after you display 2", "after 2"]]
}


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

console.log(generateDialogueReplies(test2))

const D1 = new Dialogue(["your mom", "your dad"], generateDialogueReplies(test2))

D1.checkForReplies()