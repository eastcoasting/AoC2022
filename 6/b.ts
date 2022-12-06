import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

const unique = (input: string[]) => {
    return input.length === new Set(input).size
}

const solutionB = (input: string) => {
    let movingRange = []
    for (let idx = 0; idx < input.length; idx++) {
        if (unique(movingRange) && idx >= 14) {
            console.log(idx)
            break
        } else {
            if (idx >= 14) {
                movingRange.shift()
            }
            movingRange.push(input[idx])
        }
    }
}

solutionB(input);