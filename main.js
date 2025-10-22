class Dialogue {
    constructor(lines, replies) {
        lines,
        replies
    }

    startDialogue() {

    }
}


let generateDialogueReplies = (replies) => {
    const Returnreplies = new Map()
    replies.forEach((reply) => {
        Returnreplies.set(reply[0], {
            displayText: reply[1],
            linesAfter: reply.slice(2)
        })
    })

    return Returnreplies
}

const D1 = new Dialogue(["your mom", "your dad"], generateDialogueReplies[[1, "display this!", "this is line 1", "this is line 2"]])