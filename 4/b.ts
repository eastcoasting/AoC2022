import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n").map((line) => { return line.replace("\r", "") })

const range = (range: string) => {
    let [start, end] = range.split("-")
    return [parseInt(start, 10), parseInt(end, 10)]
}

const solutionB = (formattedInput: string[]) => {

    let containedCount = 0

    formattedInput.map((line) => {

        const [a, b] = line.split(",")

        const [aStart, aEnd] = range(a)
        const [bStart, bEnd] = range(b)

        if ((aEnd < bStart || bEnd < aStart) && (aEnd !== bStart || bEnd !== aStart)) {
        }
        else {
            console.log(line)
            containedCount += 1
        }
    })
    console.log(containedCount)
}

solutionB(formattedInput);