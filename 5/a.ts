import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

let formattedInput = input.split("\n")

const extractStacks = (formattedInput: string[]): [Map<number, string[]>, number] => {

    let stackMap = new Map()
    let positionOfMoves = 0

    for (let i = 0; i < formattedInput.length; i++) {
        if (formattedInput[i] === "" || formattedInput[i] === "\r") {
            break
        } else {
            formattedInput[i] = formattedInput[i].replaceAll("    ", "[_]")
            formattedInput[i] = formattedInput[i].replaceAll(" ", "")

            let indexCount = 1

            for (let j = 0; j < formattedInput[i].length; j++) {

                if (!stackMap.has(indexCount)) {
                    stackMap.set(indexCount, [])
                }

                if (formattedInput[i][j] === "[") {
                    if (formattedInput[i][j + 1] === "_") {
                        indexCount += 1
                        continue
                    }
                    if (stackMap.has(indexCount)) {
                        stackMap.get(indexCount).unshift(formattedInput[i][j + 1])
                    } else {
                        stackMap.set(indexCount, [formattedInput[i][j + 1]])
                    }
                    indexCount += 1
                }
            }
            positionOfMoves += 1
        }
    }

    stackMap.forEach((value, key, map) => {

        if (value.length === 0) {
            stackMap.delete(key);
        }
    });

    return [stackMap, positionOfMoves + 1]
}


const translateMove = (move: string) => {

    return move.replace("move", "").replace("from", "").replace("to", "").replace("\r", "").split(" ").filter((option) => { return option !== "" })
}

const solutionA = (formattedInput: string[]) => {
    const [stackMap, positionOfMoves] = extractStacks(formattedInput)

    let moves = formattedInput.splice(positionOfMoves)

    console.log(stackMap)
    for (let i = 0; i < moves.length; i++) {

        let [numberOfMoves, initialPlace, finalPlace] = translateMove(moves[i])

        console.log("move", numberOfMoves, "from", initialPlace, "to", finalPlace)

        for (let j = 0; j < +numberOfMoves; j++) {
            const itemToMove = stackMap.get(+initialPlace).pop()
            stackMap.get(+finalPlace).push(itemToMove)
        }
    }

    let answer = []

    console.log(stackMap)

    stackMap.forEach((column) => {
        let lastItem = column.pop()
        answer.push(lastItem)
    })

    console.log(answer.join(""))

}

solutionA(formattedInput);