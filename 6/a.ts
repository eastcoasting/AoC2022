import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

const unique = (input: string[]) => {
    return input.length === new Set(input).size
}

const solutionA = (input: string) => {
    let movingRange = []
    for (let idx = 0; idx < input.length; idx++) {
        if (unique(movingRange) && idx > 3) {
            console.log(idx)
            break
        } else {
            if (idx > 3) {
                movingRange.shift()
            }
            movingRange.push(input[idx])
        }
    }
}

solutionA(input);