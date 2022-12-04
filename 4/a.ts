import * as fs from "fs";

let example = fs.readFileSync("input.txt", "utf8");

let formattedInput = example.split("\n").map((line) => { return line.replace("\r", "") })

const range = (range: string) => {
    let [start, end] = range.split("-")
    return [parseInt(start, 10), parseInt(end, 10)]
}

const solutionA = (formattedInput: string[]) => {

    let containedCount = 0

    formattedInput.map((line) => {
        const [a, b] = line.split(",")

        const [aStart, aEnd] = range(a)
        const [bStart, bEnd] = range(b)

        if ((aEnd - aStart >= bEnd - bStart) && (aEnd >= bEnd && bStart >= aStart)) {
            containedCount += 1
        }

        if (bEnd >= aEnd && aStart >= bStart) {
            containedCount += 1
        }
    })

    console.log(containedCount)
}

solutionA(formattedInput);